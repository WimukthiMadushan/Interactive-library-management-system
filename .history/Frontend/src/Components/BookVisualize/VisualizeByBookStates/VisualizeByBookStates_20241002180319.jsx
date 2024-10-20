import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";
import './VisualizeByBookState.css'; // Ensure you create a separate CSS file for this component

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const BookVisualizeByState = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/borrow/bookVisualizeByStates");
        const chartData = response.data.map((item) => ({
          name: `${item.table_name} - ${item.isComplete === 1 ? "Complete" : "Incomplete"}`,
          value: item.count,
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

  if (data.length === 0) {
    return <div className="loading-message">No data available</div>;
  }

  return (
    <div className="full-container">
      <h2 className="chart-title">Borrow and Reserve States</h2>
      <div className="chart-legend-container">
        <div className="pie-chart-container">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
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
                <span
                  className="legend-color-box"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                {entry.name}: {entry.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookVisualizeByState;
