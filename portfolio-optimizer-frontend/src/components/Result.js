import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Result = ({ optimizedPortfolio, fitness }) => {
  const data = Object.entries(optimizedPortfolio).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <p>Fitness: {fitness}</p>
    </div>
  );
};

export default Result;
