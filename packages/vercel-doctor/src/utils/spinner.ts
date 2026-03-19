import ora from "ora";

let sharedInstance: ReturnType<typeof ora> | null = null;
let activeCount = 0;
const pendingTexts = new Set<string>();

const finalize = (
  method: "succeed" | "fail",
  originalText: string,
  displayText: string,
) => {
  pendingTexts.delete(originalText);
  activeCount -= 1;

  if (activeCount <= 0 || sharedInstance === null) {
    sharedInstance?.[method](displayText);
    sharedInstance = null;
    activeCount = 0;
    return;
  }

  sharedInstance.stop();
  ora(displayText).start()[method](displayText);

  const [remainingText] = pendingTexts;
  if (remainingText) {
    sharedInstance.text = remainingText;
  }
  sharedInstance.start();
};

export const spinner = (text: string) => ({
  start() {
    activeCount += 1;
    pendingTexts.add(text);

    if (sharedInstance === null) {
      sharedInstance = ora({ text }).start();
    } else {
      sharedInstance.text = text;
    }

    return {
      fail: (displayText: string) => finalize("fail", text, displayText),
      succeed: (displayText: string) => finalize("succeed", text, displayText),
    };
  },
});
