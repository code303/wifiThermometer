const express = require('express');
const router = express.Router();
const database = require('../database/database');

router.get('/', (req, res) => {
    console.log('GET /samples');
    res.json(database.readAllSamples());
});

router.get('/latest', (req, res) => {
    console.log('-> GET /samples/latest');
    const samples = database.readSamplesOfLatestDay();
    const latestSample = samples[samples.length - 1];
    console.log('<- ' + latestSample.temperature + ' ' + latestSample.timestamp);
    res.send(latestSample.temperature.toString());
});

router.get('/:id', (req, res) => {
    const sample = database.readSample(req.params.id);
    res.json(sample);
});

router.post('/', (req, res) => {
    console.log('POST');
    const linuxTimestamp = Date.now();
    const isoDateString = new Date(linuxTimestamp).toISOString();
    const sample = {
        id: linuxTimestamp,
        timestamp: isoDateString,
        temperature: req.body.temperature,
        humidity: req.body.humidity
    };
        
    database.writeSample(sample);
    res.statusCode = 201;
    res.set('Content-Type', 'application/json');
    res.json(sample);
});

router.put('/', (req, res) => {
    res.json({sampleId: req.params.id});
});

module.exports = router;
