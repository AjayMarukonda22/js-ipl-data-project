const fs = require('fs');
let deliveries = require("../data/deliver.json");

const bestEconomicalBowlerInSuperOvers = (deliveries) => {
    if(!deliveries || !Array.isArray(deliveries))
        return "invalid input";

    let bowlerEconomy = deliveries.reduce((acc, delivery) => {
       let isSuperOver = delivery.is_super_over;
        if(isSuperOver === "0")
            return acc;

        let bowler = delivery.bowler;
        let countlessRuns = (parseInt(delivery.bye_runs) + parseInt(delivery.legbye_runs) + parseInt(delivery.penalty_runs))
        let totalRuns = parseInt(delivery.total_runs) - countlessRuns;
         
        if(!acc[bowler]) {
           acc[bowler] = {balls : 0, runs : 0};
        }

        if(delivery.wide_runs === "0" && delivery.noball_runs === "0")
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
                        .slice(0, 1);

        return sortedBowlers;
}
let result = bestEconomicalBowlerInSuperOvers(deliveries);
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "../public/output/9-best-economical-player-in-super-overs.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');          