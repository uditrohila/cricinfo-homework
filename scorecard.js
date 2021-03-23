// player entry -> teamName
// ,player Name,
// a. Runs, balls, sixes, fours, sr for that match
// b. date, venue, result and apponent name for that match

// npm -> playstore
let request = require("request");
let cherrio = require("cheerio");
let fs = require("fs");
let path = require("path");
//let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
function processSingleMatch(url) {
    request(url, cb);
}


function cb(error, response, html) {
    if(error) {
        console.log(error);
    }
    else {
        extractPlayerDetails(html);
    }
}

// date venue, result
// opponent team Name -> player -> team
// Runs, balls, sixes, fours, sr

function extractPlayerDetails(html) {
    let selTool = cherrio.load(html);
    let detailsElem = selTool(".event .match-info.match-info-MATCH .description");
    let detailText = detailsElem.text();
    //console.log(detailText);
     let detailsArr = detailText.split(",");
    // console.log(detailsArr);
     let venue = detailsArr[1].trim();
     let date = detailsArr[2].trim();
     //console.log(venue);
     //console.log(date);

     let resultElem = selTool(".event .match-info.match-info-MATCH .status-text");
     let result = resultElem.text();
     console.log(result);

     let NameoFTeams = selTool(".Collapsible h5");
     let BatsmanTableoFTeams = selTool(".Collapsible .table.batsman");
     for(let i =0; i < NameoFTeams.length; i++) {
         let cteamName = selTool(NameoFTeams[i]);
         let allRowsOfCurrentTeam = selTool(BatsmanTableoFTeams[i]).find("tbody tr");
         for(let j =0; j < allRowsOfCurrentTeam.length; j++) {
             let allcols = selTool(allRowsOfCurrentTeam[j]).find("td");
             if(allcols.length == 8) {
                 // valid row
                 // opponent team Name -> player -> team.team
                 // Runs, balls, sixes, fours , sr
                 // date, venue , result
                 // teamName
                 let myTeamName = selTool(NameoFTeams[i]).text().split("INNINGS")[0];
                 console.log(myTeamName);
                 myTeamName = myTeamName.trim();
                 let opponentTeamName = i == 0 ? selTool(NameoFTeams[1]).text() : selTool(NameoFTeams[0]).text();
                 opponentTeamName = opponentTeamName.split("INNINGS")[0].trim();
                 let name = selTool(allcols[0]).text();
                 let runs = selTool(allcols[2]).text();
                 let balls = selTool(allcols[3]).text();
                 let fours = selTool(allcols[5]).text();
                 let sixex = selTool(allcols[6]).text();
                 let sr =  selTool(allcols[7]).text();


                 console.log(`teamName ${myTeamName} playerName ${name} venue ${venue} Date ${date}
                 opponent ${opponentTeamName} result ${result} runs ${runs} balls ${balls}  fours ${fours} sixes ${sixex} sr ${sr}`);
                 console.log("```````````````````````````````````");
                 processPlayer(myTeamName, name, venue, date, opponentTeamName, result, runs, balls, fours, sixex, sr);                 
             }
         }
     }

}

function processPlayer(myTeamName, name, venue, date, opponentTeamName, result, runs, balls, fours, sixex, sr) {
    //team folder -> exist
    // does not exist
    let folderPath = path.join(__dirname, "ipl", myTeamName);
    dirCreater(folderPath);
    //file -> read data update -> write
    // create write
    let content = [];
    let matchobj = {
        myTeamName, name, venue, date, opponentTeamName,
         result, runs, balls, fours, sixex, sr
    }
    let filePath = path.join(folderPath, name + ".json");
    if(fs.existsSync(filePath)) {
        let buffer = fs.readFileSync(filePath);
        content = JSON.parse(buffer);

    }

    content.push(matchobj);
    fs.writeFileSync(filePath, JSON.stringify(content));
    
}

function dirCreater(folderPath) {
 if(fs.existsSync(folderPath) == false) {
     fs.mkdirSync(folderPath);
 }   
}

module.exports ={
    processSingleMatch
}