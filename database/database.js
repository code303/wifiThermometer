const fs = require('fs');
const FILE = __dirname + '/data/db.csv';

const database = {
    
};

const readSamples = () => {
    return [];
};

const readSample = (id) => {
    return {
        id: id,
        timestamp:  new Date().toISOString(),
        temperature: 12.3,
        humidity: 59.6
    };
};

const writeSample = (sample) => {
    console.log(JSON.stringify(sample));
    const entry =
      sample.timestamp + ';' +
      sample.temperature + ';' +
      sample.humidity;

    writeToFile(entry);
};



const writeToFile = (content) => {
    fs.appendFile(FILE, '\r\n' + content, err => {
        if (err) {
            console.error(err);
        }
        console.log('file written successfully');
    });
};


module.exports = { readSamples, readSample, writeSample };
