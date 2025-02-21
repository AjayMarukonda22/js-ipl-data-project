const fs = require('fs');
let matches = require("../data/matches.json");

const matchesPlayedPerYear = (matches) => {
    if(!matches || !Array.isArray(matches))
        throw new Error("Invalid input");

      let output = {};
         for(let match of matches) {
            let season = match.season;
        output[season] = (output[season] || 0) + 1;
         }

        return output;
}

try {
 let result = matchesPlayedPerYear(matches);
 let jsonResult = JSON.stringify(result, null, 2);
  
 const outputFile = "./src/public/output/1-matches-per-year.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}

