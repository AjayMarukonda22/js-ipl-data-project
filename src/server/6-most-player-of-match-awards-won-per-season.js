const fs = require('fs');
let matches = require("../data/matches.json");

const mostPlayerOfMatchAwardsPerSeason = (matches) => {
    if(!matches || !Array.isArray(matches))
        throw new Error("Invalid input");

    let playerOfMatchAwards = matches.reduce((acc, curr) => {
           let season = curr.season;
           let playerName = curr.player_of_match;
          
           if(!acc[season])
            acc[season] = new Map();

           let playerMap = acc[season];

           if(playerMap.has(playerName))
            playerMap.set(playerName, playerMap.get(playerName) + 1);
            else
            playerMap.set(playerName, 1);

        return acc;
    }, {});
    
    let output = {};
    for(let key in playerOfMatchAwards) {
        let seasonMap = playerOfMatchAwards[key];

        let sortedPlayers = [...seasonMap].sort((a, b) => b[1] - a[1]);
        let highestCount = sortedPlayers[0][1];

        let topPlayers = sortedPlayers
                        .filter(([ ,count]) => count === highestCount)
                        .map(([playerName, count]) => ({
                         playerName: playerName,
                         PlayerofTheMatchCount: count
                          }));
                         
             output[key] = topPlayers;             
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
