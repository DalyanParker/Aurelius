import puppeteer from "puppeteer";

export const scrape = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://developer.chrome.com/");

  // Set screen size
  await page.setViewport({ width: 1080, height: 1024 });

  // Type into search box
  await page.type(".search-box__input", "automate beyond recorder");

  // Wait and click on first result
  const searchResultSelector = ".search-box__link";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  // Locate the full title with a unique string
  const textSelector = await page.waitForSelector(
    "text/Customize and automate"
  );

  if (textSelector) {
    const fullTitle = await textSelector.evaluate((el) => el.textContent);
    const response: string = `The title of this blog post is ${fullTitle}.`;
    return response;
  }

  await browser.close();
};
