# Portfolio Optimizer HPC Project - API Server

This API Server is part of the Portfolio Optimizer HPC Project. The server is responsible for handling requests from the frontend and the backend Python HPC Server. It retrieves stock data from the Alpha Vantage API, caches it using Redis, and sends the data to the HPC server for portfolio optimization.

## Prerequisites

- Node.js >= 14
- Redis server

## Installation

1. Clone the repository:

   `@TODO: Add in git clone link`

   ```
   git clone https://github.com/ZonaZebra/Portfolio-Optimizer-HPC-Project/tree/master/API_Server
   cd API_Server
   ```

2. Install the dependencies:
   ```
   npm install
   ```
3. Copy the .env.example file to .env and update the required variables:
   ```
   cp .env.example .env
   ```
4. Start the Redis server.

   `@TODO: Add in notes on starting redis instance`

# Running the Server

1. Start the development server with nodemon:
   ```
   npm start
   ```
2. Build the TypeScript files for production:
   ```
   npm run build
   ```
3. Run the production server:
   ```
   npm run serve
   ```

# Testing

1. To run the tests:

   ```
   npm test
   ```

# API Endpoints

POST /api/optimize_portfolio: Optimizes the portfolio based on the provided data and parameters.
