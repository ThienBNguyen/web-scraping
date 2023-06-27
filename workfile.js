const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { url } = require('inspector');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let counter = 0;

//   page.on('response', async (response) => {
//     const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
//     if (matches && (matches.length === 2)) {
//       const buffer = await response.buffer();
      
//       fs.writeFileSync(`images/${matches.input.split('/')[matches.input.split('/').length - 1]}`, buffer, 'base64');
//       counter += 1;
//     }
//   });
  const selector = '#canvas';
  await page.goto('https://www.ooshirts.com/designapp/', { waitUntil: 'networkidle0', timeout: 60000 })
  await page.waitForSelector(selector);
//   const imgSrcs = await page.$$eval('section#canvas', imgs => imgs.map(img => img.src));
  const imgSrcs = await page.evaluate(() => {
    const sectionElement = document.querySelector('section#canvas');
    const style = getComputedStyle(sectionElement);
    const backgroundImage = style.backgroundImage;
    const url = backgroundImage.slice(5, -2);
    return [url];
  });

 for(let imgSrc of imgSrcs){
  console.log(imgSrc);
  try {
    new URL(imgSrc)
  } catch (_) {
    console.error('invalid url', imgSrc)
    continue
  }

  // use an HTTP(S) request to get the image data
  const response = await fetch(imgSrc);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filename = path.join('image', path.basename(imgSrc));

  fs.writeFileSync(filename, buffer);
  counter++;
  console.log(counter);
}
  
  await browser.close();
})();
