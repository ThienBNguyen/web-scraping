const cors = require('cors')
const cheerio = require('cheerio')
// const getUrls = require('get-urls')
const fs = require('fs/promises')
const puppeteer = require('puppeteer')
const scrapeMetatags = (text) => {
    const urls = Array.from(getUrls(text))

    const requests = urls.map(async url => {
        const res = await fetch(url);
        const html = await res.text();
        const $ = cheerio.load(html)

        return {
            url,
            title: $('title').first().text(),
            favicon: $('link')
        }
    });

    return Promise.all(requests)
}
//using puppeteer to scrape the web
async function start() {
    const browser = await puppeteer.launch({
			// headless: false,
		
		}) //open brower
    const page = await browser.newPage() //go to new page in browser
    await page.goto("https://learnwebcode.github.io/practice-requests/") //go to desire website url
    // await page.screenshot({path:"amazin.png"}) take screen short
    // const names = ['1asd', 2, 3]
    

    const names = await page.evaluate(() =>{
       return Array.from(document.querySelectorAll(".info strong")).map(x => x.textContent)

    })
    await fs.writeFile("names.txt", names.join("\r\n"))
    const photos = await page.$$eval('img', (imgs) => {
        return imgs.map(x => x.src) //extract images source urls
    })
    await page.click('#clickme')
    const clickedData = await page.$eval('#data', el => el.textContent)
   await page.type('#ourfield', 'blue')
   await Promise.all([
    page.click('#ourform button'), 
    page.waitForNavigation()
])
const info = await page.$eval('#message', el => el.textContent)
console.log(info);
    for (const photo of photos){
        const imagepage = await page.goto(photo)
        console.log(photo);
        // await fs.writeFile(photo.split('/').pop(), await imagepage.buffer())

    }
    await browser.close()
}
const main = async () => {
    const url = 'https://books.toscrape.com/'
    const browser = await puppeteer.launch({headless:true})
    const page = await browser.newPage()
    await page.goto(url)
    const bookData = await page.evaluate((url) => {
        const convertPrice = (price) =>{
            return parseFloat(price.replace(''))
        }
        const bookpods = Array.from(document.querySelectorAll('.product_pod'))
        const data = bookpods.map((book) =>({
            tittle: book.querySelector('h3 a').getAttribute('title'),
            price: book.querySelector('.price_color').innerText,
            imgSrc: url + book.querySelector('img').getAttribute('src'),
            ratting: book.querySelector('.star-rating').classList[1]

        }))
        return data
    }, url)
    // console.log(bookData);


fs.writeFile('data.json', JSON.stringify(bookData), (err) => {
    if(err) throw err 
})
    await browser.close()
}
const run = async () => {
    await Promise.all([main(), start()])
}
run()