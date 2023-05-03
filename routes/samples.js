const express = require('express');
const router = express.Router();
const database = require('../database/database');

router.get('/', (req, res) => {
    res.json({samples: []});
});

router.get('/:id', (req, res) => {
    const sample = database.getSample(req.params.id);
    res.json(sample);
});

router.post('/', (req, res) => {
    res.json({sampleId: 123});
});

router.put('/', (req, res) => {
    res.json({sampleId: req.params.id});
});

module.exports = router;
