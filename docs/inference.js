/**
 * @swagger
 * tags:
 *   name: Inference
 *   description: Edge Impulse model inference endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InferenceRequest:
 *       type: object
 *       required:
 *         - features
 *       properties:
 *         features:
 *           type: string
 *           default: ""
 *           description: String of feature values for classification
 *     ModelInfo:
 *       type: object
 *       properties:
 *         project:
 *           type: object
 *           properties:
 *             owner:
 *               type: string
 *             name:
 *               type: string
 *             deploy_version:
 *               type: string
 *         properties:
 *           type: object
 *           description: Model properties
 */

/**
 * @swagger
 * /api/inference/classify:
 *   post:
 *     summary: Run model inference
 *     description: Perform classification using Edge Impulse model
 *     tags: [Inference]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InferenceRequest'
 *     responses:
 *       200:
 *         description: Successful classification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *       400:
 *         description: Invalid input features
 *       500:
 *         description: Server error during inference
 */

/**
 * @swagger
 * /api/inference/model-info:
 *   get:
 *     summary: Get model information
 *     description: Retrieve information about the loaded Edge Impulse model
 *     tags: [Inference]
 *     responses:
 *       200:
 *         description: Model information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/ModelInfo'
 *       500:
 *         description: Server error while getting model info
 */
