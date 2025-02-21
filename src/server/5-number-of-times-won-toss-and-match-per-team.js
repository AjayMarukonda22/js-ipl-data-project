const fs = require('fs');
let matches = require("../data/matches.json");

const numberOfTimesWonTossAndMatch = (matches) => {
         if(!matches || !Array.isArray(matches))
            throw new Error("Invalid input");

         return matches.reduce((acc, curr) => {
            if(curr.toss_winner === curr.winner) {
                acc[curr.winner] = (acc[curr.winner] || 0) + 1;
            }
            return acc;
         }, {});
}


try {
let result = numberOfTimesWonTossAndMatch(matches);
let jsonResult = JSON.stringify(result, null, 2);

 const outputFile = "./src/public/output/5-number-of-times-won-toss-and-match-per-team.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
   console.error(err);
}