// const puppeteer = require('puppeteer');
// const fs = require('fs');
// const axios = require('axios');
// async function downloadImage(backgroundImageUrl, fileName) {
//   const response = await axios.get(backgroundImageUrl, { responseType: 'arraybuffer' });

//   fs.writeFileSync(fileName, Buffer.from(response.data, 'binary'));
// }

// async function writeFileFromBackgroundImageUrl() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const url = 'https://www.ooshirts.com/designapp/'; // Replace with the actual URL
//   const selector = '#canvas'; // Replace with the actual CSS selector for the element

//   await page.goto(url, { timeout: 60000 });
//   await page.waitForSelector(selector);

//   const backgroundImageUrl = await page.evaluate(() => {
//     const sectionElement = document.querySelector('section#canvas');
//     const style = getComputedStyle(sectionElement);
//     const backgroundImage = style.backgroundImage;
//     const url = backgroundImage.slice(5, -2);
//     return url;
//   });

//   await browser.close();

//   await downloadImage(backgroundImageUrl, 'test.jpg');
// }






// async function writeFileFromBackgroundImageUrl() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const url = 'https://www.ooshirts.com/designapp/'; // Replace with the actual URL
//   const selector = '#canvas'; // Replace with the actual CSS selector for the element

//   try {
//     await page.goto(url, { timeout: 60000 });
//     await page.waitForSelector(selector);

//     const backgroundImageUrl = await page.evaluate(() => {
//       const sectionElement = document.querySelector('section#canvas');
//       const style = getComputedStyle(sectionElement);
//       const backgroundImage = style.backgroundImage;
//       const url = backgroundImage.slice(5, -2);
//       return url;
//     });

//     await page.goto(backgroundImageUrl, { timeout: 80000 });
//     const imageBuffer = await page.screenshot();

//     fs.writeFile('test.jpg', imageBuffer, (error) => {
//       if (error) {
//         console.error('Error writing image:', error);
//       } else {
//         console.log('Image downloaded successfully!');
//       }
//     });
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     await browser.close();
//   }
// }

// writeFileFromBackgroundImageUrl();
const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

async function downloadImagesFromWebsite(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
const selector = '#canvas';
await page.goto(url, { timeout: 60000 });
    await page.waitForSelector(selector);

//get the list of url in the array that using img tag
  const imageUrls = await page.evaluate(() => {
    // const imgElements = document.querySelectorAll('img');
    // const urls = Array.from(imgElements).map((img) => img.src);
    // return urls;
          const sectionElement = document.querySelector('section#canvas');
          console.log(sectionElement, 'sectionElement');
      const style = getComputedStyle(sectionElement);
      const backgroundImage = style.backgroundImage;
      const url = backgroundImage.slice(5, -2);
    //   console.log(url);
      return url;
  });
  
// loop over the array urls and download the file 
//   for (let i = 0; i < imageUrls.length; i++) {
//     const imageUrl = imageUrls[i];
//     const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
//     // console.log(response);
//     const fileName = `image${i}.jpg`; // You can modify the file naming as needed
//     // fs.writeFileSync(fileName, Buffer.from(response.data, 'binary'));
//     console.log(`Image ${i + 1} downloaded: ${fileName}`);
//   }
// const response = await axios.get(imageUrls, { responseType: 'arraybuffer' });
  const fileName = 'image.jpg'; // You can modify the file name as needed
//   fs.writeFileSync(fileName, Buffer.from(response.data, 'binary'));
  console.log(`Image downloaded: ${fileName}`);
  await browser.close();
}

const websiteUrl = 'https://www.ooshirts.com/designapp/'; // Replace with the website URL you want to download images from
downloadImagesFromWebsite(websiteUrl);

async function downloadImageFromUrl(imageUrl, fileName) {
  const response = await fetch(imageUrl);
  const buffer = await response.buffer();
  fs.writeFileSync(fileName, buffer);
  console.log(`Image downloaded: ${fileName}`);
}

async function downloadBackgroundImage(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const selector = '#canvas';

  await page.goto(url, { timeout: 60000 });
  await page.waitForSelector(selector);

  const backgroundImageUrl = await page.evaluate(() => {
    const sectionElement = document.querySelector('section#canvas');
    const style = getComputedStyle(sectionElement);
    const backgroundImage = style.backgroundImage;
    const url = backgroundImage.slice(5, -2);
    return url;
  });

  await browser.close();

  const fileName = 'background.jpg'; // Replace with the desired file name
  await downloadImageFromUrl(backgroundImageUrl, fileName);
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(websiteUrl, { timeout: 60000 });

  const imageUrls = await page.evaluate(() => {
    const sectionElement = document.querySelector('section#canvas');
    const style = getComputedStyle(sectionElement);
    const backgroundImage = style.backgroundImage;
    const url = backgroundImage.slice(5, -2);
    return [url];
  });

  await browser.close();

  const fileName = 'background.jpg'; // Replace with the desired file name
  await downloadImageFromUrl(imageUrls[0], fileName);
})();