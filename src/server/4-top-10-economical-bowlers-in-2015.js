const fs = require('fs');
let matches = require('../data/matches.json');
let deliveries = require('../data/deliver.json');

const matchesPlayedInYear = (matches, year) => {
    if(!matches || !Array.isArray(matches) || !year || isNaN(year))
        throw new Error("Invalid input");

    let set = new Set();
     for(let match of matches) {
        if(match.season == year)
            set.add(match.id);
     }
     return set;
}


const topTenEconomicalBowlersInYear = (deliveries, matchesPlayedSet) => {
    if(!deliveries || !Array.isArray(deliveries) || !matchesPlayedSet)
        throw new Error("Invalid input");

    let bowlerEconomy = {};
    for(let delivery of deliveries) {
        if(!matchesPlayedSet.has(delivery.match_id))
            continue;

        let bowler = delivery.bowler;
        let countlessRuns = (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs) + parseInt(delivery.penalty_runs))
        let totalRuns = parseInt(delivery.total_runs) - countlessRuns;
         
        if(!bowlerEconomy[bowler]) {
           bowlerEconomy[bowler] = {balls : 0, runs : 0};
        }

        if(delivery.wide_runs === "0" && delivery.noball_runs === "0")
            bowlerEconomy[bowler].balls += 1;

        bowlerEconomy[bowler].runs += totalRuns;
    }

     let bowlersArray = [];

     for(let bowler in bowlerEconomy) {
        let stats = bowlerEconomy[bowler];
        let economy = Math.round(((stats.runs/stats.balls) * 6) * 100) / 100;
        bowlersArray.push({bowler, balls : stats.balls, runs : stats.runs, economy : economy});
     }
     
     return bowlersArray
                        .sort((a, b) => a.economy - b.economy)
                        .slice(0, 10);

}

try {
let matchesPlayedSet = matchesPlayedInYear(matches, 2015);
let result = topTenEconomicalBowlersInYear(deliveries, matchesPlayedSet);
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/4-top-10-economical-bowlers-in-2015.json";
fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}