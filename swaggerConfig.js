const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const ProdURL = process.env.ProdURL;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Edge Impulse Backend Service',
      version: '1.0.0',
      description: 'A Node.js backend service that integrates with Edge Impulse for running machine learning inference.',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: 'Development server',
      },
      {
        url: `${ProdURL}`,
        description: 'Production server',
      },
    ],
  },
  apis: ['./docs/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;