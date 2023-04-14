import React, { useState } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import InputFields from "./components/InputFields";
import Result from "./components/Result";

const App = () => {
  const [stocks] = useState(["AAPL", "GOOG", "TSLA", "MSFT", "AMZN", "FB"]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [parameters, setParameters] = useState({
    start_date: "",
    end_date: "",
    pop_size: 100,
    num_generations: 100,
    risk_free_rate: 0.02,
  });
  const [optimizedPortfolio, setOptimizedPortfolio] = useState(null);
  const [fitness, setFitness] = useState(null);

  const handleStocksChange = (selectedStocks) => {
    setSelectedStocks(selectedStocks);
  };
  

  const handleValueChange = (field, value) => {
    setParameters({ ...parameters, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting request with parameters:", {
        list_of_stocks: selectedStocks,
        ...parameters,
      });
      const response = await axios.post("http://localhost:3000/api/optimize_portfolio", {
        list_of_stocks: selectedStocks,
        ...parameters,
      });

      console.log("Received response:", response.data);
  
      setOptimizedPortfolio(response.data);
      setFitness(response.data.fitness);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ margin: "2rem" }}>
      <SearchBar stocks={stocks} handleStocksChange={handleStocksChange} />      
    <div style={{ marginTop: "1rem" }}>
        <InputFields
          field="start_date"
          label="Start Date"
          value={parameters.start_date}
          handleValueChange={handleValueChange}
        />
        <InputFields
          field="end_date"
          label="End Date"
          value={parameters.end_date}
          handleValueChange={handleValueChange}
        />
        <InputFields
          field="pop_size"
          label="Population Size"
          value={parameters.pop_size}
          handleValueChange={handleValueChange}
        />
        <InputFields
          field="num_generations"
          label="Number of Generations"
          value={parameters.num_generations}
          handleValueChange={handleValueChange}
        />
        <InputFields
          field="risk_free_rate"
          label="Risk-Free Rate"
          value={parameters.risk_free_rate}
          handleValueChange={handleValueChange}
        />
      </div>
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Optimize Portfolio
      </button>
      {optimizedPortfolio && (
        <Result
          optimizedPortfolio={optimizedPortfolio}
          fitness={fitness}
        />
      )}
    </div>
  );
};

export default App;
