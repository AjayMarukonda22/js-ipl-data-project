const fs = require('fs');
let data = require("../data/matches.json");

const matchesWonPerTeamPerYear = (matches) => {
       if(!matches || !Array.isArray(matches))
        throw new Error("Invalid input");

       let output = {};
      for(let match of matches) {
        let winner = match.winner;
           if(!winner)
            continue;

        let year = match.season;

        if(!output[year]) {
            output[year] = {};
        }

        output[year][winner] = (output[year][winner] || 0) + 1;
       }
      
       return output;
}        


try{
let result = matchesWonPerTeamPerYear(data);

let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/2-matches-won-per-team-per-year.json";
fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}