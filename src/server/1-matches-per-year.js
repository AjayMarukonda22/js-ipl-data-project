const fs = require('fs');
let data = require("../data/matches.json");

const matchesPlayedPerYear = (data) => {
    if(!data || !Array.isArray(data))
        throw new Error("invalid input");

    return data.reduce((acc, curr) => {
        acc[curr.season] = (acc[curr.season] || 0) + 1;
        return acc;
    }, {});
}


try {
 let result = matchesPlayedPerYear(data);
 let jsonResult = JSON.stringify(result, null, 2);
  
 const outputFile = "./src/public/output/1-matches-per-year.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}
 
