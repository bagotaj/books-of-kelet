import puppeteer from '../node_modules/puppeteer/lib/types';

export async function autoSearchBookTitle(bookTitle) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1288, height: 800 });

  await page.goto('https://google.com');

  await page.$eval(
    'input.gLFyf.gsfi',
    (elem, bookTitle) => (elem.value = bookTitle),
    bookTitle
  );

  await page.evaluate(() => document.querySelector('input.gNO89b').click());
}
