// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const chromium = require("chrome-aws-lambda");
const playwright = require("playwright-core");

function karlTatler(req, res) {
    const scrapeListings = async (url) => {
        const browser = await playwright.chromium.launch({
            args: [...chromium.args, "--font-render-hinting=none"], // This way fix rendering issues with specific fonts
            executablePath:
                process.env.NODE_ENV === "production"
                    ? await chromium.executablePath
                    : "/usr/local/bin/chromium",
            headless:
                process.env.NODE_ENV === "production"
                    ? chromium.headless
                    : true,
        });
        const context = await browser.newContext();
        const page = await context.newPage();
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

        console.log(grabItem, "*****");

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
