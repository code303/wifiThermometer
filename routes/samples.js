const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({samples: []});
});

router.get('/:id', (req, res) => {
    res.json({sampleId: req.params.id});
});

router.post('/', (req, res) => {
    res.json({sampleId: 123});
});

router.put('/', (req, res) => {
    res.json({sampleId: req.params.id});
});

module.exports = router;
