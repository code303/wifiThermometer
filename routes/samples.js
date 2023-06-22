const express = require('express');
const router = express.Router();
const database = require('../database/database');

router.get('/', (req, res) => {
    console.log('GET');
    res.json(database.readSamples());
});

router.get('/:id', (req, res) => {
    const sample = database.readSample(req.params.id);
    res.json(sample);
});

router.post('/body', (req, res) => {
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
    res.json(sample);
});

router.post('/bodyjson', (req, res) => {
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
    res.json(sample);
});


router.post('/query', (req, res) => {
    console.log('POST');
    const linuxTimestamp = Date.now();
    const isoDateString = new Date(linuxTimestamp).toISOString();
    const sample = {
        id: linuxTimestamp,
        timestamp: isoDateString,
        temperature: req.query.temperature,
        humidity: req.query.humidity
    };
        
    database.writeSample(sample);
    res.statusCode = 201;
    res.json(sample);
});

router.put('/', (req, res) => {
    res.json({sampleId: req.params.id});
});

module.exports = router;
