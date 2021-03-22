let request = require("request");
let cheerio = require("cheerio");
let AllMatchRef = require("./allMatch.js");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
console.log("Request send");

request(url, cb);

function cb(error, response, html) {
    if(error) {
        console.log(error);
    }
    else {
        extractTopics(html);
    }
}

function extractTopics(html){
    let ch = cheerio.load(html);
    let anchors = ch(".widget-items.cta-link .label.blue-text.blue-on-hover");
    let link = anchors.attr("href");
    //console.log(link);
    let completesLink ="https://www.espncricinfo.com" + link;
    //console.log(completeLink);
    AllMatchRef.processAllMatch(completesLink);
    
}
