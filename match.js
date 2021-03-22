let request =  require("request");
let fs = require("fs");
let cheerio = require("cheerio");
const { parseHTML } = require("cheerio");

function processMatch(url) {
    console.log("Request send");
    request(url,cb);
}

function cb(error,response,html){
    if(error) {
        console.log(error);
    }
    else {
        parsehtml(html);
    }
}

function parsehtml(html) {
    let ch = cheerio.load(html);
}


















module.exports ={
    processMatch: processMatch
}