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
// run()
const users = [
    {id: 1,
    name:'jack',
isActive: true},

   {id: 2,
    name:'thien',
isActive: true},
{id: 3,
    name:'thai',
isActive: false},
{id: 4,
    name:'binh',
isActive: false},
{id: 5,
    name:'hieu',
isActive: false},
]
let userNames = []
users.map(user => {userNames.push(user.name)})
// console.log(userNames);
const names = []
for (let i = 0; i < users.length; i++ ){
    if( users[i].isActive === false){
        names.push(users[i].name)
    }
}
// console.log(names.sort((user1, user2) => (user1)));
// using filter, sort, and map method
const nameList = users.filter((user) => user.isActive  === false).map((user) => user.name).sort((user1, user2) => (user1.age < user2.age ? 1: -1))
// console.log(nameList);
// let var1;
// console.log(var1);
// console.log(typeof var1);
// let var2 = null;
// console.log(var2);
// console.log(typeof var2);
//hoisting
//closure
const privateCounter = () => {
    let count = 0
    return {
        increment: (val = 1) =>{
            count += val
        },
        getValue: () => {
            return count;
        }
    }
}
// const counter = privateCounter()
// console.log(counter.getValue());
// counter.increment()
// console.log(counter.getValue());
function add(x){
    return function(y){
        return x + y
    }
}
const addFive = add(5)
// console.log(addFive(3));
const append = (arr, el) => {
    // arr.push(el)
    return [...arr, el];
}
// console.log(append([1,2],5));

const concatenate = (arr1,arr2) =>{
    return [...arr1, ...arr2]
}
const result = concatenate([1], [2])
// console.log(result);
// const isNameExists = (name, arr) => arr.some((el) => el.name === name);
const isNameExists = (name, arr) => {
    const el = arr.find((el) => el.anem ===name)
    return Boolean(el)
}
const uniqueArr = (arr) => {
    const result = []
    arr.forEach(item => {
        if(!result.includes(item)){
            result.push(item)
        }
    })
    return result
}
console.log(uniqueArr([1,1,2,4,5]));