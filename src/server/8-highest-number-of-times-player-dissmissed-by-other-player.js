const fs = require('fs');
let deliveries = require("../data/deliver.json");

const mostDismissalsOfOnePlayerByTheOther = (deliveries) => {
            if(!deliveries || !Array.isArray(deliveries))
               throw new Error("Invalid input");
          
    let output = new Map();
         for(let delivery of deliveries) {

             let batsman = delivery.batsman;
             let bowler = delivery.bowler;
             let playerDismissed = delivery.player_dismissed;
             let dismissalType = delivery.dismissal_kind;

             if(dismissalType === "run out" || !playerDismissed)
                continue;

             let key = batsman + "-" + bowler;
            if(!output.has(key)) {

                let dismissalObject = {
                    batsman: batsman,
                    bowler: bowler,
                    dismissalCount: 1
                }
                output.set(key, dismissalObject);
            }
            else {
                let dismissalObject = output.get(key);
                dismissalObject.dismissalCount += 1;
            }

    }

let result =  [...output]
       .sort(([ , objectA], [ , objectB]) => objectB.dismissalCount - objectA.dismissalCount)
       .slice(0, 1);

    const [[ , dissmissal]]  = result;
    return dissmissal;

}

try {
let result = mostDismissalsOfOnePlayerByTheOther(deliveries);
let jsonResult = JSON.stringify(result, null, 2);

const outputFile = "./src/public/output/8-highest-number-of-times-player-dismissed-by-other-player.json";
fs.writeFileSync(outputFile, jsonResult, 'utf8');
}
catch(err) {
    console.error(err);
}

