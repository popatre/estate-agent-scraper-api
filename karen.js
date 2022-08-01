// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const chromium = require("chrome-aws-lambda");
const playwright = require("playwright-core");

function karen(req, res) {
    const scrapeListings = async (url) => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();

        await page.goto(url);
        //await page.screenshot({path:"tester.png"})

        const grabItem = await page.evaluate(() => {
            const pgTag = document.querySelectorAll(
                ".col.fl-fourWide.lg-fourWide.md-sixWide.sm-twelveWide.propertyBox h2, h3"
            );
            const listings = [];

            pgTag.forEach((tag) => {
                listings.push(tag.innerText);
            });

            return listings;
        });

        if (grabItem) {
            res.status(200).json({ listings: grabItem });
        }
        await browser.close();
    };

    scrapeListings(
        "https://www.karenpotter.co.uk/Search?listingType=5&category=1&statusids=1%2C3%2C4%2C9%2C10%2C16&obc=Price&obd=Descending&areainformation=4&radius=1609&minprice=&maxprice=150000&bedrooms=&dbsids=&perpage=21&page=1"
    );
}

module.exports = karen;
