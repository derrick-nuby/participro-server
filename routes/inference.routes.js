const express = require('express');
const { runInference, getModelInfo } = require('../controllers/inference.controller');

const router = express.Router();

// GET model information
router.get('/model-info', getModelInfo);

// POST raw features for inference
router.post('/classify', runInference);

module.exports = router;