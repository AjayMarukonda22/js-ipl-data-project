const fs = require('fs');
let deliveries = require("../data/deliver.json");

const bestEconomicalBowlerInSuperOvers = (deliveries) => {
    if(!deliveries || !Array.isArray(deliveries))
        return "invalid input";

    let bowlerEconomy = {};
    for(let delivery of deliveries) {
        let isSuperOver = delivery.is_super_over;
        if(isSuperOver === "0")
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
                       .slice(0, 1);

}
let result = bestEconomicalBowlerInSuperOvers(deliveries);
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/9-best-economical-player-in-super-overs.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8'); 