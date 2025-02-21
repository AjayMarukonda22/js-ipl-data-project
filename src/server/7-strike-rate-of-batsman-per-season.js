const fs = require('fs');

let matches = require("../data/matches.json");
let deliveries = require("../data/deliver.json");

const matchesPerseason = (matches) => {
    if(!matches || !Array.isArray(matches))
        throw new Error("Invalid input");

     return matches.reduce((acc, curr) => {
            let season = curr.season;
            let matchId = curr.id;

            if(!acc[season]) {
                acc[season] = new Set();
            }
            
         acc[season].add(matchId);
           
            return acc;
     }, {})
}

const seasonOfTheMatch = (matchId, matchIdsPerSeason) => {
    if(!matchId || !matchIdsPerSeason)
      throw new Error("Invalid input");

    for(let season in matchIdsPerSeason) {
        let seasonSet = matchIdsPerSeason[season];

        if(seasonSet.has(matchId))
            return season;
    }
}

const strikeRateOfBatsmanPerSeason = (deliveries, matchIdsPerSeasonSet, seasonOfTheMatch, playerName) => {
     if(!deliveries || !Array.isArray(deliveries) || !matchIdsPerSeasonSet || !seasonOfTheMatch)
        throw new Error("Invalid input");
        
     let output = deliveries.reduce((acc, delivery) => {

            let matchId = delivery.match_id;
            let batsman = delivery.batsman;
            if((batsman).toLowerCase() !== (playerName).toLowerCase()) {
                return acc;
            }

            let batsmanRuns = parseInt(delivery.batsman_runs);
            let extraRuns = parseInt(delivery.extra_runs);

            let season = seasonOfTheMatch(matchId, matchIdsPerSeasonSet);
            if(!acc[season]) 
                acc[season] = {};

            let playerObject = acc[season];
              if(!playerObject[batsman]) {
                playerObject[batsman] = {
                    balls: 0,
                    runs: 0
                };
            }

            let statsObject = playerObject[batsman];
           if(extraRuns === 0)
            statsObject.balls += 1;
            statsObject.runs += batsmanRuns;

            return acc;
     }, {});
        

        for(let year in output) {
            let iplSeason = output[year];

            for(let player in iplSeason) {
                 let stats = iplSeason[player];
                 stats.strikeRate = Math.round(((stats.runs/stats.balls) * 100)*100)/100;
            }
        }
        return output;       
}


try {
let seasonSetResult = matchesPerseason(matches);
let result = (strikeRateOfBatsmanPerSeason(deliveries, seasonSetResult, seasonOfTheMatch, "PA patel"));
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/7-strike-rate-of-batsman-per-season.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}

