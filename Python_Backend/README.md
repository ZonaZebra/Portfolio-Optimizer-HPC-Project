# Portfolio Optimizer

Portfolio Optimizer is an API that allows users to optimize their stock portfolio using a genetic algorithm. The API takes in historical stock data in CSV format, along with user-specified parameters, and returns the optimal portfolio allocation.

File Structure

```
portfolio_optimizer/
│
├── app/
│   ├── __init__.py
│   ├── config.py
│   ├── main.py
│   ├── ga_solver.py
│   ├── portfolio.py
│   └── app.log
│
├── tests/
│   ├── __init__.py
│   ├── test_ga_solver.py
│   └── test_portfolio.py
│
├── requirements.txt
└── README.md
```

## Clone the repository and navigate to the project directory.

```
cd Python_Backend
```

## Create a virtual environment and activate it:

```
python3 -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
```

## Dependencies

To install the required dependencies, run:

```
pip install -r requirements.txt
```

## Set up the environment variables:

Replace your_alpha_vantage_api_key:

```
export ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
```

## Running the API

To run the API locally, navigate to the portfolio_optimizer directory and execute the following command:

```
uvicorn app.main:app --reload
```

## Usage

Endpoint: `/optimize_portfolio`
Method: `POST`
Request body: JSON object containing the following fields:

- **csv_data**: Dictionary of stock symbols mapped to their corresponding historical price data in CSV format
- **start_date**: Start date of the desired date range (string, format: "YYYY-MM-DD")
- **end_date**: End date of the desired date range (string, format: "YYYY-MM-DD")
- **pop_size**: Population size for the genetic algorithm (integer, optional, default: 100)
- **num_generations**: Number of generations for the genetic algorithm (integer, optional, default: 100)
- **risk_free_rate**: Risk-free rate used for calculating the Sharpe ratio (float, optional, default: 0.02)

## Response

JSON object containing the following fields:

- **allocation**: Dictionary of stock symbols mapped to their corresponding portfolio weights
- **fitness**: Best Sharpe ratio obtained by the genetic algorithm

## Example

```
curl -X POST "http://localhost:8000/optimize_portfolio" -H "Content-Type: application/json" -d '{"csv_data": {"AAPL": "Date,adjusted_close\n2021-01-01,128.50\n2021-01-02,129.75\n2021-01-03,131.00", "MSFT": "Date,adjusted_close\n2021-01-01,219.75\n2021-01-02,220.50\n2021-01-03,221.25"}, "start_date": "2021-01-01", "end_date": "2021-01-03"}'
```

## Testing

To run the tests, navigate to the portfolio_optimizer directory and execute the following command:

```
pytest tests/
```
