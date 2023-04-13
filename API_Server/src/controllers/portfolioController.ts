import { Request, Response } from "express";
import { PortfolioOptimizationRequest } from "../models/PortfolioOptimizationRequest";
import { getStockData } from "../services/alphaVantageService";
import { getCachedData, setCachedData } from "../services/cacheService";
import { optimizePortfolio as optimizeHpcPortfolio } from "../services/hpcService";

export async function optimizePortfolio(req: Request, res: Response) {
  try {
    const requestData: PortfolioOptimizationRequest = req.body;
    const stockSymbols = Object.keys(requestData.csv_data);

    // Get and cache data from Alpha Vantage
    for (const symbol of stockSymbols) {
      const cachedData = await getCachedData(symbol);
      if (!cachedData) {
        const data = await getStockData(symbol);
        await setCachedData(symbol, data);
        requestData.csv_data[symbol] = data;
      } else {
        requestData.csv_data[symbol] = cachedData;
      }
    }

    // Call HPC server for optimization
    const optimizedPortfolio = await optimizeHpcPortfolio(requestData);

    res.json(optimizedPortfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
