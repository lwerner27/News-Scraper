const express = require("express")
const cheerio = require("cheerio")
const request = require("request")
const db = require("../models")

const router = express.Router()

// =======================================================================
// Routes
// =======================================================================
router.get("/scrape", (req, res) => {
    scrapeNews()
    res.send("Articles have been scraped")
})







// =======================================================================
// Functions
// =======================================================================
function scrapeNews() {

    request("https://www.surrenderat20.net/search/label/Releases/", function(error, response, html) {

        var $ = cheerio.load(html);

        $("h1.news-title").each(function(i, element) {
    
            var title = $(element).children().text();
        
            var link = $(element).children().attr("href");
        
            let result = {
                title: title,
                link: link
            }

            db.Article.findOneAndUpdate(result, result, {upsert: true})
            .then(dbArticle => {
                console.log(dbArticle)
            })

        });

    });
  
}

// =======================================================================
// Exports
// =======================================================================
module.exports = router