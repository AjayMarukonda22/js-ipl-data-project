const fs = require('fs');

let matches = require("../data/matches.json");
let deliveries = require("../data/deliver.json");

const matchesPerseason = (matches) => {
    if(!matches || !Array.isArray(matches))
        return "invalid input";
     let seasonSet = {};
      for(let match of matches) {
            let season = match.season;
            let matchId = match.id;

            if(!seasonSet[season]) {
                seasonSet[season] = new Set();
            }
            
         seasonSet[season].add(matchId);
     }
     return seasonSet;
}

const seasonOfTheMatch = (matchId, matchIdsPerSeason) => {
    if(!matchId || !matchIdsPerSeason)
        return "invalid input";

    for(let season in matchIdsPerSeason) {
        let seasonSet = matchIdsPerSeason[season];

        if(seasonSet.has(matchId))
            return season;
    }
}

const strikeRateOfBatsmanPerSeason = (deliveries, matchIdsPerSeasonSet, seasonOfTheMatch, playerName) => {
     if(!deliveries || !Array.isArray(deliveries) || !matchIdsPerSeasonSet || !seasonOfTheMatch)
        return "invalid input";
        
     let output = {};
        for(let delivery of deliveries) {
            let matchId = delivery.match_id;
            let batsman = delivery.batsman;
            if((batsman).toLowerCase() !== (playerName).toLowerCase()) {
                continue;
            }

            let batsmanRuns = parseInt(delivery.batsman_runs);
            let extraRuns = parseInt(delivery.extra_runs);

            let season = seasonOfTheMatch(matchId, matchIdsPerSeasonSet);
            if(!output[season]) 
                output[season] = {};

            let seasonObject = output[season];
              if(!seasonObject[batsman]) {
                seasonObject[batsman] = {
                    balls: 0,
                    runs: 0
                };
            }

            let playerObject = seasonObject[batsman];
           if(extraRuns === 0)
            playerObject.balls += 1;
            playerObject.runs += batsmanRuns;
        }

        for(let year in output) {
            let iplSeason = output[year];

            for(let player in iplSeason) {
                 let stats = iplSeason[player];
                 stats.strikeRate = Math.round(((stats.runs/stats.balls) * 100)*100)/100;
            }
        }
        return output;       
}

let seasonSetResult = matchesPerseason(matches);
let result = (strikeRateOfBatsmanPerSeason(deliveries, seasonSetResult, seasonOfTheMatch, "PA patel"));
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/7-strike-rate-of-batsman-per-season.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');

