import axios from "axios";
import { PortfolioOptimizationRequest } from "../models/PortfolioOptimizationRequest";

const HPC_SERVER_URL = process.env.HPC_SERVER_URL;

export async function optimizePortfolio(requestData: PortfolioOptimizationRequest): Promise<any> {
  const url = `${HPC_SERVER_URL}/optimize_portfolio`;

  try {
    const response = await axios.post(url, requestData);
    return response.data;
  } catch (error) {
    console.error(`Error sending request to HPC server: ${error}`);
    throw error;
  }
}
