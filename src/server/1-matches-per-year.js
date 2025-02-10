const fs = require('fs');
let data = require("../data/matches.json");

const matchesPlayedPerYear = (data) => {
    if(!data || !Array.isArray(data))
        return "invalid input";

    return data.reduce((acc, curr) => {
        acc[curr.season] = (acc[curr.season] || 0) + 1;
        return acc;
    }, {});
}

 let result = matchesPlayedPerYear(data);
 let jsonResult = JSON.stringify(result, null, 2);
  
 const outputFile = "/home/ajay/js-ipl-data-project/src/public/output/1-matches-per-year.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
 
