import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";
import './VisualizeByReserveCat.css'; // Make sure to create this CSS file for styling

const COLORS = [
  "#8884d8", "#8dd1e1", "#82ca9d", "#d0ed57", "#ffc658",
  "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF69B4",
  "#20B2AA", "#FF1493", "#ADFF2F", "#87CEEB", "#FFA07A"
];

const BookVisualizeByReserveCat = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/reserve/bookVisualizeByCat"); // Adjust the API endpoint if necessary
        const chartData = response.data.map((item, index) => ({
          name: item.Cat_Name, // Assuming your API returns an object with Cat_Name
          value: item.reservedCount, // Assuming your API returns the count of reserved books
          color: COLORS[index % COLORS.length], // Assign color to each category
        }));
        setData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading chart data...</div>;
  }

  return (
    <div className="outer-container">
      <h2 className="chart-title">Reserved Books by Category</h2>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <div className="legend-wrapper">
        <ul className="legend-list">
          {data.map((entry, index) => (
            <li key={`legend-${index}`} className="legend-item">
              <span
                className="legend-color-box"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.name}: {entry.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookVisualizeByReserveCat;
