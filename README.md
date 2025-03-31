# Edge Impulse Backend Service

A Node.js backend service that integrates with Edge Impulse for running machine learning inference. This service provides REST API endpoints for:

- Running classifications on raw feature data
- Retrieving model information and properties

## API Endpoints

### POST /api/inference/classify

Run inference with raw features. Accepts features as either:

- Comma-separated string of numbers
- Array of numbers

### GET /api/inference/model-info

Get information about the loaded Edge Impulse model and its properties.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

The server will automatically initialize the Edge Impulse classifier on startup.
