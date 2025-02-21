const fs = require('fs');
let matches = require("../data/matches.json");

const mostPlayerOfMatchAwardsPerSeason = (matches) => {
    if(!matches || !Array.isArray(matches))
        throw new Error("Invalid input");
    
    let playerOfMatchAwards = {};
           for(let match of matches) {
           let season = match.season;
           let playerName = match.player_of_match;
          
           if(!playerOfMatchAwards[season])
              playerOfMatchAwards[season] = new Map();

           let playerMap = playerOfMatchAwards[season];

           if(playerMap.has(playerName))
            playerMap.set(playerName, playerMap.get(playerName) + 1);
            else
            playerMap.set(playerName, 1);

    }
    
    let output = {};
    for(let key in playerOfMatchAwards) {
        let seasonMap = playerOfMatchAwards[key];

        let sortedPlayers = [...seasonMap].sort((a, b) => b[1] - a[1]);
        let highestCount = sortedPlayers[0][1];
          
        let topPlayersArray = [];
        for(let topPlayer of sortedPlayers) {
               if(topPlayer[1] === highestCount) {
                topPlayersArray.push({playerName : topPlayer[0], playerOfTheMatchCount : topPlayer[1]});
               }
            
        }
        output[key] = topPlayersArray;
    }
    return output;    
}


try {
let result = mostPlayerOfMatchAwardsPerSeason(matches);
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/6-most-player-of-match-awards-per-season.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}
