import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

import {
  GIT_LS_FILES_MAX_BUFFER_BYTES,
  SOURCE_FILE_PATTERN,
} from "../constants.js";
import type {
  DependencyInfo,
  Framework,
  PackageJson,
  ProjectInfo,
  WorkspacePackage,
} from "../types.js";
import { getSemverMajorVersion } from "./get-semver-major-version.js";
import { readPackageJson } from "./read-package-json.js";

const FRAMEWORK_PACKAGES: Record<string, Framework> = {
  "@remix-run/react": "remix",
  gatsby: "gatsby",
  next: "nextjs",
  "react-scripts": "cra",
  vite: "vite",
};

const FRAMEWORK_DISPLAY_NAMES: Record<Framework, string> = {
  cra: "Create React App",
  gatsby: "Gatsby",
  nextjs: "Next.js",
  remix: "Remix",
  unknown: "React",
  vite: "Vite",
};

export const formatFrameworkName = (framework: Framework): string =>
  FRAMEWORK_DISPLAY_NAMES[framework];

const countSourceFiles = (rootDirectory: string): number => {
  const result = spawnSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    {
      cwd: rootDirectory,
      encoding: "utf8",
      maxBuffer: GIT_LS_FILES_MAX_BUFFER_BYTES,
    },
  );

  if (result.error || result.status !== 0) {
    return 0;
  }

  return result.stdout
    .split("\n")
    .filter(
      (filePath) => filePath.length > 0 && SOURCE_FILE_PATTERN.test(filePath),
    ).length;
};

const collectAllDependencies = (
  packageJson: PackageJson,
): Record<string, string> => ({
  ...packageJson.peerDependencies,
  ...packageJson.dependencies,
  ...packageJson.devDependencies,
});

const detectFramework = (dependencies: Record<string, string>): Framework => {
  for (const [packageName, frameworkName] of Object.entries(
    FRAMEWORK_PACKAGES,
  )) {
    if (dependencies[packageName]) {
      return frameworkName;
    }
  }
  return "unknown";
};

const extractDependencyInfo = (packageJson: PackageJson): DependencyInfo => {
  const allDependencies = collectAllDependencies(packageJson);
  const nextVersion = allDependencies.next ?? null;
  return {
    framework: detectFramework(allDependencies),
    nextMajorVersion: getSemverMajorVersion(nextVersion),
    nextVersion,
    reactVersion: allDependencies.react ?? null,
  };
};

const parsePnpmWorkspacePatterns = (rootDirectory: string): string[] => {
  const workspacePath = path.join(rootDirectory, "pnpm-workspace.yaml");
  if (!fs.existsSync(workspacePath)) {
    return [];
  }

  const content = fs.readFileSync(workspacePath, "utf8");
  const patterns: string[] = [];
  let isInsidePackagesBlock = false;

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (trimmed === "packages:") {
      isInsidePackagesBlock = true;
      continue;
    }
    if (isInsidePackagesBlock && trimmed.startsWith("-")) {
      patterns.push(trimmed.replace(/^-\s*/, "").replaceAll(/["']/g, ""));
    } else if (
      isInsidePackagesBlock &&
      trimmed.length > 0 &&
      !trimmed.startsWith("#")
    ) {
      isInsidePackagesBlock = false;
    }
  }

  return patterns;
};

const getWorkspacePatterns = (
  rootDirectory: string,
  packageJson: PackageJson,
): string[] => {
  const pnpmPatterns = parsePnpmWorkspacePatterns(rootDirectory);
  if (pnpmPatterns.length > 0) {
    return pnpmPatterns;
  }

  if (Array.isArray(packageJson.workspaces)) {
    return packageJson.workspaces;
  }

  if (packageJson.workspaces?.packages) {
    return packageJson.workspaces.packages;
  }

  return [];
};

const resolveWorkspaceDirectories = (
  rootDirectory: string,
  pattern: string,
): string[] => {
  const cleanPattern = pattern.replaceAll(/["']/g, "").replace(/\/\*\*$/, "/*");

  if (!cleanPattern.includes("*")) {
    const directoryPath = path.join(rootDirectory, cleanPattern);
    if (
      fs.existsSync(directoryPath) &&
      fs.existsSync(path.join(directoryPath, "package.json"))
    ) {
      return [directoryPath];
    }
    return [];
  }

  const baseDirectory = path.join(
    rootDirectory,
    cleanPattern.slice(0, cleanPattern.indexOf("*")),
  );

  if (
    !fs.existsSync(baseDirectory) ||
    !fs.statSync(baseDirectory).isDirectory()
  ) {
    return [];
  }

  return fs
    .readdirSync(baseDirectory)
    .map((entry) => path.join(baseDirectory, entry))
    .filter(
      (entryPath) =>
        fs.statSync(entryPath).isDirectory() &&
        fs.existsSync(path.join(entryPath, "package.json")),
    );
};

const isMonorepoRoot = (directory: string): boolean => {
  if (fs.existsSync(path.join(directory, "pnpm-workspace.yaml"))) {
    return true;
  }
  const packageJsonPath = path.join(directory, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return false;
  }
  const packageJson = readPackageJson(packageJsonPath);
  return (
    Array.isArray(packageJson.workspaces) ||
    Boolean(packageJson.workspaces?.packages)
  );
};

const findMonorepoRoot = (startDirectory: string): string | null => {
  let currentDirectory = path.dirname(startDirectory);

  while (currentDirectory !== path.dirname(currentDirectory)) {
    if (isMonorepoRoot(currentDirectory)) {
      return currentDirectory;
    }
    currentDirectory = path.dirname(currentDirectory);
  }

  return null;
};

const findDependencyInfoFromMonorepoRoot = (
  directory: string,
): DependencyInfo => {
  const monorepoRoot = findMonorepoRoot(directory);
  if (!monorepoRoot) {
    return {
      framework: "unknown",
      nextMajorVersion: null,
      nextVersion: null,
      reactVersion: null,
    };
  }

  const rootPackageJson = readPackageJson(
    path.join(monorepoRoot, "package.json"),
  );
  const rootInfo = extractDependencyInfo(rootPackageJson);
  const workspaceInfo = findReactInWorkspaces(monorepoRoot, rootPackageJson);

  return {
    framework:
      rootInfo.framework === "unknown"
        ? workspaceInfo.framework
        : rootInfo.framework,
    nextMajorVersion:
      rootInfo.nextMajorVersion ?? workspaceInfo.nextMajorVersion,
    nextVersion: rootInfo.nextVersion ?? workspaceInfo.nextVersion,
    reactVersion: rootInfo.reactVersion ?? workspaceInfo.reactVersion,
  };
};

const findReactInWorkspaces = (
  rootDirectory: string,
  packageJson: PackageJson,
): DependencyInfo => {
  const patterns = getWorkspacePatterns(rootDirectory, packageJson);
  const result: DependencyInfo = {
    framework: "unknown",
    nextMajorVersion: null,
    nextVersion: null,
    reactVersion: null,
  };

  for (const pattern of patterns) {
    const directories = resolveWorkspaceDirectories(rootDirectory, pattern);

    for (const workspaceDirectory of directories) {
      const workspacePackageJson = readPackageJson(
        path.join(workspaceDirectory, "package.json"),
      );
      const info = extractDependencyInfo(workspacePackageJson);

      if (info.reactVersion && !result.reactVersion) {
        result.reactVersion = info.reactVersion;
      }
      if (info.framework !== "unknown" && result.framework === "unknown") {
        result.framework = info.framework;
      }
      if (info.nextVersion && !result.nextVersion) {
        result.nextVersion = info.nextVersion;
      }
      if (info.nextMajorVersion !== null && result.nextMajorVersion === null) {
        result.nextMajorVersion = info.nextMajorVersion;
      }

      if (
        result.reactVersion &&
        result.framework !== "unknown" &&
        result.nextVersion &&
        result.nextMajorVersion !== null
      ) {
        return result;
      }
    }
  }

  return result;
};

const hasReactDependency = (packageJson: PackageJson): boolean => {
  const allDependencies = collectAllDependencies(packageJson);
  return Object.keys(allDependencies).some(
    (packageName) => packageName === "next" || packageName.includes("react"),
  );
};

export const discoverReactSubprojects = (
  rootDirectory: string,
): WorkspacePackage[] => {
  if (
    !fs.existsSync(rootDirectory) ||
    !fs.statSync(rootDirectory).isDirectory()
  ) {
    return [];
  }

  const entries = fs.readdirSync(rootDirectory, { withFileTypes: true });
  const packages: WorkspacePackage[] = [];

  for (const entry of entries) {
    if (
      !entry.isDirectory() ||
      entry.name.startsWith(".") ||
      entry.name === "node_modules"
    ) {
      continue;
    }

    const subdirectory = path.join(rootDirectory, entry.name);
    const packageJsonPath = path.join(subdirectory, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      continue;
    }

    const packageJson = readPackageJson(packageJsonPath);
    if (!hasReactDependency(packageJson)) {
      continue;
    }

    const name = packageJson.name ?? entry.name;
    packages.push({ directory: subdirectory, name });
  }

  return packages;
};

export const listWorkspacePackages = (
  rootDirectory: string,
): WorkspacePackage[] => {
  const packageJsonPath = path.join(rootDirectory, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    return [];
  }

  const packageJson = readPackageJson(packageJsonPath);
  const patterns = getWorkspacePatterns(rootDirectory, packageJson);
  if (patterns.length === 0) {
    return [];
  }

  const packages: WorkspacePackage[] = [];

  for (const pattern of patterns) {
    const directories = resolveWorkspaceDirectories(rootDirectory, pattern);
    for (const workspaceDirectory of directories) {
      const workspacePackageJson = readPackageJson(
        path.join(workspaceDirectory, "package.json"),
      );

      if (!hasReactDependency(workspacePackageJson)) {
        continue;
      }

      const name =
        workspacePackageJson.name ?? path.basename(workspaceDirectory);
      packages.push({ directory: workspaceDirectory, name });
    }
  }

  return packages;
};

const mergeDependencyInfo = (
  current: DependencyInfo,
  source: DependencyInfo,
): DependencyInfo => ({
  framework:
    current.framework === "unknown" ? source.framework : current.framework,
  nextMajorVersion: current.nextMajorVersion ?? source.nextMajorVersion ?? null,
  nextVersion: current.nextVersion ?? source.nextVersion ?? null,
  reactVersion: current.reactVersion ?? source.reactVersion ?? null,
});

const isDependencyInfoComplete = (info: DependencyInfo): boolean =>
  Boolean(
    info.reactVersion &&
    info.framework !== "unknown" &&
    info.nextVersion &&
    info.nextMajorVersion !== null,
  );

export const discoverProject = (directory: string): ProjectInfo => {
  const packageJsonPath = path.join(directory, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error(`No package.json found in ${directory}`);
  }

  const packageJson = readPackageJson(packageJsonPath);
  let dependencyInfo = extractDependencyInfo(packageJson);

  if (!isDependencyInfoComplete(dependencyInfo)) {
    dependencyInfo = mergeDependencyInfo(
      dependencyInfo,
      findReactInWorkspaces(directory, packageJson),
    );
  }

  if (!isDependencyInfoComplete(dependencyInfo) && !isMonorepoRoot(directory)) {
    dependencyInfo = mergeDependencyInfo(
      dependencyInfo,
      findDependencyInfoFromMonorepoRoot(directory),
    );
  }

  const { framework, nextMajorVersion, nextVersion, reactVersion } =
    dependencyInfo;
  const projectName = packageJson.name ?? path.basename(directory);
  const hasTypeScript = fs.existsSync(path.join(directory, "tsconfig.json"));
  const sourceFileCount = countSourceFiles(directory);

  return {
    framework,
    hasTypeScript,
    nextMajorVersion,
    nextVersion,
    projectName,
    reactVersion,
    rootDirectory: directory,
    sourceFileCount,
  };
};
