import { Request, Response } from "express";
import { PortfolioOptimizationRequest } from "../models/PortfolioOptimizationRequest";
import { PortfolioBackendRequest } from "../models/PortfolioBackendRequest";
import { getStockData } from "../services/alphaVantageService";
import { getCachedData, setCachedData } from "../services/cacheService";
import { optimizePortfolio as optimizeHpcPortfolio } from "../services/hpcService";

export async function optimizePortfolio(req: Request, res: Response) {
  try {
    console.log("Optimizing portfolio");
    console.log(req.body);

    const backendRequestData: PortfolioBackendRequest = {
      csv_data: {},
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      pop_size: req.body.pop_size,
      num_generations: req.body.num_generations,
      risk_free_rate: req.body.risk_free_rate,
      };

    const requestData: PortfolioOptimizationRequest = req.body;
    const stockSymbols = requestData.list_of_stocks;
    console.log(`Stock symbols: ${stockSymbols}`);
    for (const symbol of stockSymbols) {
      const cachedData = await getCachedData(symbol);
      if (!cachedData) {
        console.log(`Fetching data from Alpha Vantage for symbol: ${symbol}`);
        const data = await getStockData(symbol);
        Object.assign(backendRequestData.csv_data, { [symbol]: data });
        await setCachedData(symbol, data);
      }
      else {
        console.log(`Using cached data for symbol: ${symbol}`);
        Object.assign(backendRequestData.csv_data, { [symbol]: cachedData });
      }
    }

    // Call HPC server for optimization
    const optimizedPortfolio = await optimizeHpcPortfolio(backendRequestData);

    // res.json({backendRequestData});
    res.json({ message: "Optimization complete", optimizedPortfolio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
