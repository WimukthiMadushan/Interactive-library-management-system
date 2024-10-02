import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import axios from "axios";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const VisualizeByState = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/borrow/visualizeByStates");

        // Reformat the data for use in a pie chart
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
    return <div>Loading...</div>;
  }

  return (
    <div className="outer-container">
      <div className="chart-container">
        <h2 className="chart-title">Borrow and Reserve States</h2>
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
        </PieChart>
        <ul className="legend-list">
          {data.map((entry, index) => (
            <li key={index}>
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  backgroundColor: COLORS[index % COLORS.length],
                  marginRight: "10px",
                }}
              ></span>
              {entry.name}: {entry.value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VisualizeByState;
