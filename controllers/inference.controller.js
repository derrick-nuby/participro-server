const EdgeImpulseClassifier = require('../services/edge-impulse.service');
const classifier = new EdgeImpulseClassifier();

// Initialize the classifier when the server starts
(async () => {
  try {
    await classifier.init();
    const project = classifier.getProjectInfo();
    console.log('Edge Impulse model initialized successfully');
    console.log('Project:', project.owner + ' / ' + project.name + ' (version ' + project.deploy_version + ')');
  } catch (error) {
    console.error('Failed to initialize Edge Impulse model:', error);
  }
})();

/**
 * @desc    Run inference with raw features
 * @route   POST /api/inference/classify
 * @access  Public
 */
const runInference = async (req, res) => {
  try {
    const { features } = req.body;

    if (!features) {
      return res.status(400).json({
        success: false,
        message: 'Please provide features data'
      });
    }

    // Make sure the classifier is initialized
    if (!classifier.isInitialized()) {
      await classifier.init();
    }

    // Parse features - handle both string and array formats
    let featuresArray;
    if (typeof features === 'string') {
      featuresArray = features.trim().split(',').map(n => {
        const trimmed = n.trim();
        return trimmed.startsWith('0x') ? parseInt(trimmed, 16) : Number(trimmed);
      });
    } else if (Array.isArray(features)) {
      featuresArray = features.map(n => Number(n));
    } else {
      return res.status(400).json({
        success: false,
        message: 'Features must be a comma-separated string or an array of numbers'
      });
    }

    // Run classification
    const result = classifier.classify(featuresArray);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Inference error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred during inference'
    });
  }
};

/**
 * @desc    Get model information
 * @route   GET /api/inference/model-info
 * @access  Public
 */
const getModelInfo = async (req, res) => {
  try {
    // Make sure the classifier is initialized
    if (!classifier.isInitialized()) {
      await classifier.init();
    }

    const projectInfo = classifier.getProjectInfo();
    const properties = classifier.getProperties();

    res.status(200).json({
      success: true,
      data: {
        project: projectInfo,
        properties: properties
      }
    });
  } catch (error) {
    console.error('Error getting model info:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while getting model info'
    });
  }
};

module.exports = {
  runInference,
  getModelInfo
};