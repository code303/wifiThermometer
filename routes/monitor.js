const express = require('express');
const router = express.Router();
const database = require('../database/database');

router.get('/', (req, res) => {
    console.log('-> GET /monitor');
    const currentSample = getLatestSample();
    console.log('<- ', currentSample.temperature + ' ' + currentSample.timestamp);

    res.render('monitor', {
        temperature: currentSample.temperature,
        timestamp: currentSample.timestamp
    });
});

const getLatestSample = () => {
    const allSamplesOfLastDay = database.readSamplesOfLatestDay();
    const latestSample = allSamplesOfLastDay[allSamplesOfLastDay.length - 1];
    return latestSample;
};

module.exports = router;
