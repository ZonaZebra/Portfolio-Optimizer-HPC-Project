# Portfolio Optimizer HPC Project

This project aims to provide an efficient and user-friendly tool for optimizing investment portfolios. The system consists of a frontend, an API server, and a backend Python HPC server. The frontend collects user input, the API server fetches stock data from the Alpha Vantage API and manages caching using Redis, and the backend Python HPC server runs the optimization algorithm.

## Prerequisites

- Node.js >= 14
- Python >= 3.8
- Redis server

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ZonaZebra/Portfolio-Optimizer-HPC-Project.git
cd Portfolio-Optimizer-HPC-Project
```

2. Set up and run the API Server:

- Follow the instructions in the API_Server directory.

3. Set up and run the Python HPC Server:

- Follow the instructions in the HPC_Server directory.

4. Set up and run the Frontend:

- Follow the instructions in the Frontend directory.

# Usage

1. Open the frontend application in your web browser.

2. Enter the required information, such as stock symbols, date range, and optimization parameters.

3. Click the "Optimize" button to start the optimization process.

4. The optimized portfolio will be displayed once the optimization is complete.
