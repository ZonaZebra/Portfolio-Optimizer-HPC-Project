import axios from "axios";

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export async function getStockData(symbol: string): Promise<string> {
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}&outputsize=full&datatype=csv`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from Alpha Vantage for symbol: ${symbol}`);
    throw error;
  }
}
