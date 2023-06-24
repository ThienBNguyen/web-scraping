const cors = require('cors')
const cheerio = require('cheerio')
// const getUrls = require('get-urls')
const fs = require('fs/promises')
const puppeteer = require('puppeteer')
const url = 'https://www.ooshirts.com/designapp/'
const ooshirts = async () => {
    
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(url, { timeout: 60000 })
    //  await page.waitForTimeout(2000)
    // await page.screenshot({ path: 'screenshot.png' });
  const imageUrl = await page.$eval('img', (img) => img.src);
  console.log(imageUrl);
  const imageBuffer = await page.goto(imageUrl);
  console.log(imageBuffer);
    fs.writeFile('image.jpg', imageBuffer);
       await browser.close()
}
// ooshirts()
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let counter = 0;
  page.on('response', async (response) => {
    const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
    // console.log(matches, 'matches');
    if (matches && (matches.length === 2)) {
             const extension = matches[1];
      const buffer = await response.buffer();
    //   fs.writeFile(`images/image-${counter}.${extension}`, buffer, 'base64');
      fs.writeFile(`images/${matches.input.split('/')[matches.input.split('/').length - 1]}`, buffer, 'base64');

      counter += 1;
    //   console.log(counter);
    }
  });

  await page.goto(url);

  await browser.close();
});
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

const selector = '#canvas'; // Replace with the actual CSS selector for the element
const url = 'https://www.ooshirts.com/designapp/'
 await page.goto(url);
   
  await page.waitForSelector(selector);
//   await page.timeout(2000)
    const backgroundImageUrl = await page.evaluate(() => {
  const element = document.querySelector(selector); // Replace with the actual CSS selector for the element
        console.log(getComputedStyle(element));
  return getComputedStyle(element).backgroundImage.slice(4, -1).replace(/['"]/g, '');
// return null
});
// backgroundImageUrl()
await page.goto(backgroundImageUrl);

const imageBuffer = await page.screenshot();
// console.log(imageBuffer);
console.log();
  await browser.close();
});
async function writeFileFromBackgroundImageUrl() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.ooshirts.com/designapp/'; // Replace with the actual URL
  const selector = '#canvas'; // Replace with the actual CSS selector for the element

  await page.goto(url, { timeout: 60000 })
  await page.waitForSelector(selector);
//   const bodyHandle = await page.$(selector);
//   const html = await page.evaluate(body => body.innerHTML, bodyHandle);
// await bodyHandle.dispose();
  const backgroundImageUrl = await page.evaluate(() => {
    const sectionElement = document.querySelector('section#canvas');
    const style = getComputedStyle(sectionElement);
    const backgroundImage = style.backgroundImage;
    const url = backgroundImage.slice(5, -2);
    return url;
  });
console.log(backgroundImageUrl);
//   const backgroundImageUrl = await page.evaluate((selector) => {
//     const element = document.querySelector(selector);
//     return getComputedStyle(element).backgroundImage.slice(4, -1).replace(/['"]/g, '');
//   }, );

//   await page.goto(backgroundImageUrl);

//   const imageBuffer = await page.screenshot();

  // Write the image buffer to a file using fs.writeFileSync()
  // ...

  await browser.close();
}

writeFileFromBackgroundImageUrl();