let request = require("request");
let cheerio = require("cheerio");
let MatchRef = require("./match.js");


function processAllMatch(url) {
    request(url, cb);
}

function cb(error,response,html) {
    if(error) {
        console.log(error);
    }

    else {
        extracthtml(html);
    }
}


function extracthtml(html) {
    let ch = cheerio.load(html);
    let cards = ch(".col-md-8.col-16");
    console.log(cards.length)
    for(let i = 0; i < cards.length; i++) {
        let anchorTagArray = ch(cards[i]).find(".match-cta-container a");
        let links = ch(anchorTagArray[2]).attr("href");
        //console.log(links);
        let completeLink = "https://www.espncricinfo.com" + links;
        //console.log(completeLink);
        MatchRef.processMatch(completeLink);

    }

    
   
}





module.exports = {
    processAllMatch: processAllMatch
}