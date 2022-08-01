// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// const chromium = require("chrome-aws-lambda");
// const playwright = require("playwright-core");

const puppeteer = require("puppeteer");

function karlTatler(req, res) {
    const scrapeListings = async (url) => {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.goto(url);
        //await page.screenshot({path:"tester.png"})

        const grabItem = await page.evaluate(() => {
            const pgTag = document.querySelectorAll("h1, h2");
            const listings = [];

            pgTag.forEach((tag) => {
                listings.push(tag.innerText);
            });
            return listings;
        });

        if (grabItem) {
            const formattedResults = [];

            for (let i = 0; i < grabItem.length; i += 2) {
                const formattedStr = `${grabItem[i]} % ${grabItem[i + 1]}  `;

                formattedResults.push(formattedStr);
            }

            const filtered = formattedResults.filter((item) => {
                return (
                    !item.includes("Sold") &&
                    !item.includes("flat") &&
                    !item.includes("Flat")
                );
            });

            res.status(200).json({ listings: filtered });
        }
        await browser.close();
    };

    scrapeListings(
        "https://www.karltatler.com/merseyside/wirral/sales/tag-house/from-0-bed/from-20000/up-to-130000/most-recent-first"
    );
}

module.exports = karlTatler;
