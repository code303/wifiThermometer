const fs = require('fs');
const CSV_PATH = __dirname + '/data/';

const readSamplesOfLatestDay = () => {
    const files = readAllCsvFiles(CSV_PATH);
    files.sort();
    const latestFile = files[files.length - 1];
    return files.length > 0 ? readFromFile(latestFile) : [];
};

const readAllSamples = () => {
    const files = readAllCsvFiles(CSV_PATH);
    const samples = [];
    files.forEach(file => {
        samples.push(...readFromFile(file));
    });
    return samples;
};

const readAllCsvFiles = (path) => {
    return fs.readdirSync(path)
        .filter(filename => filename.startsWith('data_'))
        .filter(file => file.endsWith('.csv'));
}

const readFromFile = (file) => {
    const content = fs.readFileSync(CSV_PATH + file, 'utf8');
    const lines = content.split('\n');
    const samples = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.length > 0) {
            const values = line.split(';');
            const sample = {
                id: values[0],
                timestamp: values[1],
                temperature: parseFloat(values[2]),
                humidity: parseFloat(values[3])
            };
            samples.push(sample);
        }
    }
    return samples;
}

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

module.exports = { readSamplesOfLatestDay, readAllSamples, readSample, writeSample };
