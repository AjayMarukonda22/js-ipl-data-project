const fs = require('fs');
let data = require("../data/matches.json");

const matchesPlayedPerYear = (matches) => {
    if(!data || !Array.isArray(data))
        return "invalid input";

      let output = {};
         for(let match of matches) {
            let season = match.season;
        output[season] = (output[season] || 0) + 1;
         }

        return output;
}

 let result = matchesPlayedPerYear(data);
 let jsonResult = JSON.stringify(result, null, 2);
  
 const outputFile = "./src/public/output/1-matches-per-year.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
 
