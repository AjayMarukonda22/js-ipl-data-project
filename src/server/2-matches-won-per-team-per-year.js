const fs = require('fs');
let data = require("../data/matches.json");

const matchesWonPerTeamPerYear = (data) => {
       if(!data || !Array.isArray(data))
        throw new Error("invalid input");

       return data.reduce((acc, curr) => {
        if(!curr.winner)
            return acc;

        let year = curr.season;
        let team = curr.winner;

        if(!acc[year]) {
            acc[year] = {};
        }
        acc[year][team] = (acc[year][team] || 0) + 1;
        return acc;
       }
    , {});
}        


try {
let result = matchesWonPerTeamPerYear(data);

let jsonResult = JSON.stringify(result, null, 2);

 const outputFile = "./src/public/output/2-matches-won-per-team-per-year.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}