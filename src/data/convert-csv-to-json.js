const fs = require('fs');

function csvToJson(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');

    const result = lines.slice(1).map(line => {
        const values = line.split(',');
        let obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index] ? values[index].trim() : null;
        });
        return obj;
    });

    return JSON.stringify(result, null, 2);
}

const data = fs.readFileSync('deliveries.csv', 'utf-8');
const jsonData = csvToJson(data);

fs.writeFile('deliver.json', jsonData, 'utf-8', (err) => {
    if (err) {
        console.error('Error writing deliver.json:', err);
    } else {
        console.log('deliver.json has been saved successfully.');
    }
});

const data1 = fs.readFileSync('matches.csv', 'utf-8');
const jsonData1 = csvToJson(data1);

fs.writeFile('matches.json', jsonData1, 'utf-8', (err) => {
    if (err) {
        console.error('Error writing matches.json:', err);
    } else {
        console.log('matches.json has been saved successfully.');
    }
});