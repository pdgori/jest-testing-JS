const puppeteer = require("puppeteer");
const { generateText, checkAndGenerate } = require("./util");

test("should output name and age", () => {
  const text = generateText("Phillipe", 31);
  expect(text).toBe("Phillipe (31 years old)");
});

test("should generate a valid text output", () => {
  const text = checkAndGenerate("Phillipe", 31);
  expect(text).toBe("Phillipe (31 years old)");
});

test("should create an element with text and correct class", async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("D:\\desenvolvimento\\GitHub\\mochatest\\index.html");
  await page.click("input#name");
  await page.type("input#name", "Anna");
  await page.click("input#age");
  await page.type("input#age", "20");
  await page.click("#btnAddUser");
  const finalText = await page.$eval(".user-item", (el) => el.textContent);
  expect(finalText).toBe("Anna (20 years old)");
}, 10000);
