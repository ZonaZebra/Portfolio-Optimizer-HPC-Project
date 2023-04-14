import axios from "axios";
import { PortfolioBackendRequest } from "../models/PortfolioBackendRequest";

const HPC_SERVER_URL = process.env.HPC_SERVER_URL || `http://127.0.0.1:8000`;

export async function optimizePortfolio(requestData: PortfolioBackendRequest): Promise<any> {
  const url = `${HPC_SERVER_URL}/optimize_portfolio`;

  try {
    console.log(`Sending request to HPC server: ${url}`);
    const response = await axios.post(url, requestData);
    return response.data;
  } catch (error) {
    console.error(`Error sending request to HPC server: \n\n${error}`);
    throw error;
  }
}

// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     at new NodeError (node:internal/errors:399:5)
//     at ServerResponse.setHeader (node:_http_outgoing:663:11)
//     at ServerResponse.header (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/node_modules/express/lib/response.js:794:10)
//     at ServerResponse.send (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/node_modules/express/lib/response.js:174:12)
//     at ServerResponse.json (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/node_modules/express/lib/response.js:278:15)
//     at /Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/src/controllers/portfolioController.ts:46:9
//     at Generator.next (<anonymous>)
//     at fulfilled (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/src/controllers/portfolioController.ts:5:58)
//     at processTicksAndRejections (node:internal/process/task_queues:95:5) {
//   code: 'ERR_HTTP_HEADERS_SENT'
// }
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//     at new NodeError (node:internal/errors:399:5)
//     at ServerResponse.setHeader (node:_http_outgoing:663:11)
//     at ServerResponse.header (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/node_modules/express/lib/response.js:794:10)
//     at ServerResponse.send (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/node_modules/express/lib/response.js:174:12)
//     at ServerResponse.json (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/node_modules/express/lib/response.js:278:15)
//     at /Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/src/controllers/portfolioController.ts:49:21
//     at Generator.next (<anonymous>)
//     at fulfilled (/Users/gabemojica/Projects/Portfolio Optimizer HPC Project/API_Server/src/controllers/portfolioController.ts:5:58)
//     at processTicksAndRejections (node:internal/process/task_queues:95:5) {
//   code: 'ERR_HTTP_HEADERS_SENT'
// }