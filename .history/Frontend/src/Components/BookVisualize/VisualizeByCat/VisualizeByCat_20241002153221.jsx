import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";
import './VisualizeByState.css'; // Create a CSS file for styling

const COLORS = [
  "#8884d8", "#8dd1e1", "#82ca9d", "#d0ed57", "#ffc658",
  // Add more colors if needed
];

const BookVisualizeByState = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/borrow/visualizeByState"); // Adjust API endpoint
        const chartData = response.data.map((item, index) => ({
          name: item.state,
          value: item.count,
          color: COLORS[index % COLORS.length],
        }));
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="outer-container">
      <h2 className="chart-title">Books by State</h2>
      <PieChart width={300} height={300}>
        <Pie data={data} dataKey="value" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default BookVisualizeByState;
