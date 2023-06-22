const cors = require('cors')
const cheerio = require('cheerio')
// const getUrls = require('get-urls')
const fs = require('fs/promises')
const puppeteer = require('puppeteer')
const ooshirts = async () => {
    const url = 'https://www.ooshirts.com/designapp/'
    const browser = await puppeteer.launch({headless: true})
    const page = await browser.newPage()
    await page.goto(url)
     const names = await page.evaluate(() =>{
       return document.querySelectorAll(".t-shirt-type").values

    }) 
    console.log(names);
       await browser.close()
}
ooshirts()