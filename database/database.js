const fs = require('fs');
const CSV_PATH = __dirname + '/data/';

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
      sample.id + ';' +
      sample.timestamp + ';' +
      sample.temperature + ';' +
      sample.humidity;

    writeToFile(entry);
};



const writeToFile = (content) => {
    const csvFile = generateCsvFilename(CSV_PATH, Date.now());
    if (!fs.existsSync(csvFile)) {
        writeCSVHeader(csvFile, ['id', 'timestamp', 'temperature', 'humidity']);
    }
    appendToFile(csvFile, content);
};

const writeCSVHeader = (filename, header) => {
  const headerRow = header.join(';');
  fs.writeFile(filename, headerRow, (err) => {
    if (err) {
      console.error('An error occurred while writing the file:', err);
    }
  });
}

const appendToFile = (file, content) => {
    fs.appendFile(file, '\r\n' + content, err => {
        if (err) {
            console.error(err);
        }
    });
};

const generateCsvFilename = (path, date) => {
  const isoDate = new Date(date).toISOString().split('T')[0];
  return path + `data_${isoDate}.csv`;
}

module.exports = { readSamples, readSample, writeSample };
