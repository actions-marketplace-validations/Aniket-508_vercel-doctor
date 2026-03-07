import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { NextResponse, type NextFetchEvent, type NextRequest } from "next/server";
import { HTTP_STATUS_GONE_CODE } from "@/constants/http";
import { i18n } from "@/lib/i18n";

const i18nMiddleware = createI18nMiddleware(i18n);

const isStaticAssetRequest = (pathname: string): boolean => pathname.startsWith("/_next/static/");

const shouldReturnGoneForStaticAssetRequest = (request: NextRequest): boolean => {
  const requestedDeploymentId = request.nextUrl.searchParams.get("dpl");
  const currentDeploymentId = process.env.VERCEL_DEPLOYMENT_ID;

  if (!requestedDeploymentId || !currentDeploymentId) {
    return false;
  }

  return requestedDeploymentId !== currentDeploymentId;
};

const middleware = (request: NextRequest, event: NextFetchEvent) => {
  if (
    isStaticAssetRequest(request.nextUrl.pathname) &&
    shouldReturnGoneForStaticAssetRequest(request)
  ) {
    return new Response(null, { status: HTTP_STATUS_GONE_CODE });
  }

  if (isStaticAssetRequest(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return i18nMiddleware(request, event);
};

export default middleware;

export const config = {
  matcher: [
    "/_next/static/:path*",
    "/((?!api|_next/image|og|share|llms|install-skill|sitemap|.*\\..*).*)",
  ],
};
