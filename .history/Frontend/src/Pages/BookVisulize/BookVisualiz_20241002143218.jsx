import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";
import "./ViewBookVisualize.css";

const COLORS = [
  "#8884d8", "#8dd1e1", "#82ca9d", "#d0ed57", "#ffc658",
  "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
  "#FF69B4", "#00FF7F", "#6495ED", "#FFD700", "#FF4500"
];

const ViewBookVisualize = () => {
  const [data, setData] = useState([]);

  // Fetch data from API when component mounts
  useEffect(() => {
    axios.get("http://localhost:5001/api/borrow/visualize")
      .then((response) => {
        // Assuming the response data structure is correct
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container">
      <h1 className="chart-title">Borrowed Books by Category</h1>
      <div className="chart-container">
        <div className="pie-chart">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              outerRadius={150}
              fill="#8884d8"
              dataKey="borrowedCount"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="legend">
          <ul className="legend-list">
            {data.map((entry, index) => (
              <li key={`legend-${index}`} style={{ color: COLORS[index % COLORS.length] }}>
                {entry.Cat_Name}: {entry.borrowedCount}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewBookVisualize;
