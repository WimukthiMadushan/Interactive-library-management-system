import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from "axios";

const COLORS = [
  "#8884d8", "#8dd1e1", "#82ca9d", "#d0ed57", "#ffc658",
  "#ff8042", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"
];

const ViewBookVisualize = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API when the component loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/borrow/visualize");
        // Transform the data to match the format for recharts
        const chartData = response.data.map((item) => ({
          name: item.Cat_Name, // Category name
          value: item.borrowedCount, // Borrowed count
        }));
        setData(chartData);
        setLoading(false); // Stop loading when data is fetched
      } catch (error) {
        console.error("Error fetching the data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading chart data...</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Borrowed Books by Category</h2>
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
    </div>
  );
};

export default ViewBookVisualize;
