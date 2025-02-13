const fs = require('fs');
let matches = require("../data/matches.json");
let deliveries = require("../data/deliver.json");

const matchesPlayedInYear = (matches, year) => {
    if(!matches || !Array.isArray(matches) || !year || isNaN(year))
        return "invalid input";

    return matches.reduce((acc, curr) => {
           if(curr.season == year)
               acc.add(curr.id);
            return acc;
    }, new Set());
}

const extraRunsConcededPerTeamInYear = (deliveries, matchesPlayedSet) => {
    if(!deliveries || !Array.isArray(deliveries) || !matchesPlayedSet)
        return "invalid input";

        return deliveries.filter((delivery) => matchesPlayedSet.has(delivery.match_id))
                        .reduce((acc, currDelivery) => {
                            let team = currDelivery.bowling_team;
                            let extraRuns = parseInt((currDelivery.extra_runs));
                              
                            if(extraRuns != 0)
                           acc[team] = (acc[team] || 0) + extraRuns; 
                        return acc;
                        }, {});
        
}

let matchesPlayedSet = matchesPlayedInYear(matches, 2016);
let result = extraRunsConcededPerTeamInYear(deliveries, matchesPlayedSet);

let jsonResult = JSON.stringify(result, null, 2);

 const outputFile = "../public/output/3-extra-runs-conceded-per-team.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');


