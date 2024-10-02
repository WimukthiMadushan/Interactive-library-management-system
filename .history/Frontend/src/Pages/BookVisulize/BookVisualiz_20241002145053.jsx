import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";
import "./ViewBookVisualize.css";

const COLORS = [
  "#8884d8", "#8dd1e1", "#82ca9d", "#d0ed57", "#ffc658",
  "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", 
  "#FF69B4", "#00FF7F", "#6495ED", "#FFD700", "#FF4500"
];

const ViewBookVisualize = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/api/borrow/visualize")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="outer-container">
      <div className="chart-container">
        <h1 className="chart-title">Borrowed Books by Category</h1>
        <div className="chart-wrapper">
          <div className="chart">
            <PieChart width={600} height={600}> {/* Increased width and height */}
              <Pie
                data={data}
                cx={300}
                cy={300}
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

          <div className="legend-wrapper">
            <ul className="legend-list">
              {data.map((entry, index) => (
                <li key={`legend-${index}`} className="legend-item">
                  <div
                    className="legend-color-box"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {entry.Cat_Name}: {entry.borrowedCount}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookVisualize;
