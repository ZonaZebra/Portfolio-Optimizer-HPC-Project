from pydantic import BaseModel
import pandas as pd
from typing import Dict, List
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.logger import logger as fastapi_logger
from app.ga_solver import ga_solver
from io import StringIO

import logging

# Loggin Config Setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Use FastAPI's logger for Uvicorn logs
uvicorn_logger = logging.getLogger("uvicorn")
fastapi_logger.handlers = uvicorn_logger.handlers
fastapi_logger.setLevel(uvicorn_logger.level)

app = FastAPI()


@app.get("/")
def welcome():
    logger.info("Welcome to the Portfolio Optimizer API")
    return FileResponse("favicon.ico")


class PortfolioOptimizationRequest(BaseModel):
    csv_data: Dict[str, str]
    start_date: str
    end_date: str
    pop_size: int = 100
    num_generations: int = 100
    risk_free_rate: float = 0.02


@app.post("/optimize_portfolio")
async def optimize_portfolio(req: PortfolioOptimizationRequest):
    stock_data = {}

    # Convert `start_date` and `end_date` to datetime objects
    start_date = pd.to_datetime(req.start_date)
    end_date = pd.to_datetime(req.end_date)

    # Create a DatetimeIndex that covers the desired date range
    date_range = pd.date_range(start=start_date, end=end_date, freq="D")

    for symbol, csv_string in req.csv_data.items():
        df = pd.read_csv(StringIO(csv_string), index_col=0, parse_dates=True)

        # Use `reindex()` to select the rows from `df` that match the closest dates in the index
        df = df.reindex(date_range, method="nearest")

        # Select only the 'adjusted_close' column and rename it to the stock symbol
        adjusted_close_data = df["adjusted_close"].rename(symbol)
        stock_data[symbol] = adjusted_close_data

    # Combine the data into a single DataFrame
    combined_data = pd.concat(
        [stock_data[symbol] for symbol in stock_data.keys()], axis=1)
    returns = combined_data.pct_change().dropna()

    # GA solver for portfolio optimization
    best_allocation, best_fitness = ga_solver(
        returns, req.pop_size, req.num_generations, req.risk_free_rate)

    # Format the results for the response
    result = {
        "allocation": {symbol: weight for symbol, weight in zip(stock_data.keys(), best_allocation)},
        "fitness": best_fitness
    }

    return result
