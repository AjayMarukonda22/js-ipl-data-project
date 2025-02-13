const fs = require('fs');
let matches = require('../data/matches.json');
let deliveries = require('../data/deliver.json');

const matchesPlayedInYear = (matches, year) => {
    if(!matches || !Array.isArray(matches) || !year || isNaN(year))
        return "invalid input";

    return matches.reduce((acc, curr) => {
        if(curr.season == year)
            acc.add(curr.id);
         return acc;
 }, new Set());

}


const topTenEconomicalBowlersInYear = (deliveries, matchesPlayedSet) => {
    if(!deliveries || !Array.isArray(deliveries) || !matchesPlayedSet)
        return "invalid input";

    let bowlerEconomy = deliveries.filter((delivery) => matchesPlayedSet.has(delivery.match_id))
                                  .reduce((acc, currDelivery) => {

                                    let bowler = currDelivery.bowler;
                                    let countlessRuns = (parseInt(currDelivery.bye_runs) + parseInt(currDelivery.legbye_runs) + parseInt(currDelivery.penalty_runs))
                                    let totalRuns = parseInt(currDelivery.total_runs) - countlessRuns;
                                     
                                    if(!acc[bowler]) {
                                       acc[bowler] = {balls : 0, runs : 0};
                                    }
                            
                                    if(currDelivery.wide_runs === "0" && currDelivery.noball_runs === "0")
                                        acc[bowler].balls += 1;
                            
                                    acc[bowler].runs += totalRuns;

                                    return acc;
                                  }, {});

    let sortedBowlers = Object.entries(bowlerEconomy)
                        .map(([bowler, stats]) => ({
                            bowler,
                            balls: stats.balls, 
                            runs: stats.runs, 
                            economy: Math.round( ((stats.runs/stats.balls) * 6) * 100)/ 100 }))
                        .sort((a, b) => a.economy - b.economy)
                        .slice(0, 10);

        return sortedBowlers;

}

let matchesPlayedSet = matchesPlayedInYear(matches, 2015);
let result = topTenEconomicalBowlersInYear(deliveries, matchesPlayedSet);
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/4-top-10-economical-bowlers-in-2015.json";
fs.writeFileSync(outputFile, jsonResult, 'utf8');