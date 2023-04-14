export interface PortfolioOptimizationRequest {
  list_of_stocks: string[];
  start_date: string;
  end_date: string;
  pop_size?: number;
  num_generations?: number;
  risk_free_rate?: number;
}