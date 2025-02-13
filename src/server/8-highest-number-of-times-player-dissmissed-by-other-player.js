const fs = require('fs');
let deliveries = require("../data/deliver.json");

const mostDismissalsOfOnePlayerByTheOther = (deliveries) => {
            if(!deliveries || !Array.isArray(deliveries))
              return "invalid input";
          
    let output = deliveries.reduce((acc, curr) => {
             let batsman = curr.batsman;
             let bowler = curr.bowler;
             let playerDismissed = curr.player_dismissed;
             let dismissalType = curr.dismissal_kind;

             if(dismissalType === "run out" || !playerDismissed)
                return acc;

             let key = batsman + "-" + bowler;
            if(!acc.has(key)) {

                let dismissalObject = {
                    batsman: batsman,
                    bowler: bowler,
                    dismissalCount: 1
                }
                acc.set(key, dismissalObject);
            }
            else {
                let dismissalObject = acc.get(key);
                dismissalObject.dismissalCount += 1;
            }
            return acc;

    }, new Map());

return [...output]
       .sort(([ , objectA], [ , objectB]) => objectB.dismissalCount - objectA.dismissalCount)
       .slice(0, 1)
       .map((player) => player[1]);

}

let result = mostDismissalsOfOnePlayerByTheOther(deliveries);
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "../public/output/8-highest-number-of-times-player-dismissed-by-other-player.json";
 fs.writeFileSync(outputFile, jsonResult, 'utf8');

