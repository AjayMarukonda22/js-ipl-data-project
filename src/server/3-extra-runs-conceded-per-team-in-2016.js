const fs = require('fs');
let matches = require("../data/matches.json");
let deliveries = require("../data/deliver.json");

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

const extraRunsConcededPerTeamInYear = (deliveries, matchesPlayedSet) => {
    if(!deliveries || !Array.isArray(deliveries) || !matchesPlayedSet)
        throw new Error("Invalid input");

    let extraRunsPerTeam = {};

        for(let delivery of deliveries) {

            let matchId = delivery.match_id;
            if(matchesPlayedSet.has(matchId)) {

                let team = delivery.bowling_team;
                let extraRuns = parseInt((delivery.extra_runs));
                  
                if(extraRuns != 0)
               extraRunsPerTeam[team] = (extraRunsPerTeam[team] || 0) + extraRuns;
            }
        }

    return extraRunsPerTeam;        
}

try {
let matchesPlayedSet = matchesPlayedInYear(matches, 2016);
let result = extraRunsConcededPerTeamInYear(deliveries, matchesPlayedSet);

let jsonResult = JSON.stringify(result, null, 2);

 const outputFile = "./src/public/output/3-extra-runs-conceded-per-team.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}

