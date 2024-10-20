import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// Sample data representing the percentage distribution of books by genre
const data = [
  { name: "Fiction", value: 30 },
  { name: "Non-Fiction", value: 20 },
  { name: "Sci-Fi", value: 15 },
  { name: "Romance", value: 25 },
  { name: "Mystery", value: 10 },
];

// Define colors for each genre slice
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF"];

const ViewBookVisulize = () => {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default ViewBookVisulize;
