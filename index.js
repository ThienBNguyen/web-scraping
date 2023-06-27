// const puppeteer = require('puppeteer');

// async function clickIndividualLinks() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
  
//   const url = 'https://www.ooshirts.com/designapp/'; // Replace with the URL of the page containing the HTML code
  
//   await page.goto(url);
  
//   // Wait for the fieldset element to appear
//   await page.waitForSelector('fieldset');
  
//   // Get the list of links inside the fieldset
// //   const linkHandles = await page.$$('fieldset li');
  
// //   // Click on each link
// //   for (const linkHandle of linkHandles) {
// //     await linkHandle.click();
    
// //     // Wait for a while (e.g., 1 second) to allow the page to load after clicking
// //     await page.waitForTimeout(1000);
// //   }
//   // Wait for the element to appear
//   await page.waitForSelector("#t-shirts-settings-form > fieldset:nth-child(4) > ul > li:nth-child(2) > a");
  
//   // Click on the link
//   await page.evaluate(() => {
//     const link = document.querySelector("#t-shirts-settings-form > fieldset:nth-child(4) > ul > li:nth-child(2) > a");
//     console.log(link);
//     link.click();
//   });
//   //check if the element is visible 
//  const isVisible = await page.evaluate(() => {
//     console.log('tes');
//     const section = document.querySelector("#canvas[style*='background-image']");
// const style = getComputedStyle(section);
// const backgroundImage = style.backgroundImage;
// const url = backgroundImage.slice(5, -2);
// console.log(url);
//     return section && section.offsetParent !== null;
//   });
//     if (isVisible) {
//     console.log("The link was clicked successfully.");
//   } else {
//     console.log("The link click did not have the expected effect.");
//   }
  
//   // Wait for a while (e.g., 1 second) to allow the page to load after clicking
//   await page.waitForTimeout(1000);
//   await browser.close();
// }

// clickIndividualLinks();

const puppeteer = require('puppeteer');

async function clickIndividualLink() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const url = 'https://www.ooshirts.com/designapp/'; // Replace with the URL of the page containing the HTML code
  
 await page.goto('https://www.ooshirts.com/designapp/', { waitUntil: 'networkidle0', timeout: 60000 })
  
  // Wait for the element to appear
  await page.waitForSelector("#t-shirts-settings-form > fieldset:nth-child(4) > ul > li > a");
    const links = await page.$$('#t-shirts-settings-form > fieldset:nth-child(4) > ul > li > a');
 for (const linkHandle of links) {
    await linkHandle.click();

    // Wait for a while (e.g., 1 second) to allow the page to load after clicking
    await page.waitForTimeout(1000);

    const backgroundImageUrl = await page.evaluate(() => {
      const section = document.querySelector("#canvas[style*='background-image']");
      const style = getComputedStyle(section);
      const backgroundImage = style.backgroundImage;
      const url = backgroundImage.slice(5, -2);
      return url;
    });

    console.log(backgroundImageUrl);

    await page.goBack(); // Go back to the previous page
  }
  await page.evaluate(() => {
    const link = document.querySelector("#t-shirts-settings-form > fieldset:nth-child(4) > ul > li > a");
    console.log(link);
    // link.click();
  });
  
  // Wait for the section element to appear or change after the click
  await page.waitForSelector("#canvas[style*='background-image']");
  
  // Get the background image URL
//   const backgroundImageUrl = await page.evaluate(() => {
//     const section = document.querySelector("#canvas[style*='background-image']");
//     const style = getComputedStyle(section);
//     const backgroundImage = style.backgroundImage;
//     const url = backgroundImage.slice(5, -2);
//     return url;
//   });
  
//   if (backgroundImageUrl) {
//     console.log("The link was clicked successfully.");
//     console.log("Background Image URL:", backgroundImageUrl);
//   } else {
//     console.log("The link click did not have the expected effect.");
//   }
  
  await browser.close();
}

clickIndividualLink();
