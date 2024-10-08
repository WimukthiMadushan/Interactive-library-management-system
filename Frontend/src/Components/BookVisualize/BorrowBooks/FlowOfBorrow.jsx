import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import './FlowOfBorrow.css';

const FlowOfBorrow = () => {
    const [data, setData] = useState([]);
    const [range, setRange] = useState('last7days'); // Default range

    const tooltipStyle = {
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '10px',
        fontSize: '14px', // Adjust font size
        width: 'fit-content'
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/visualize/borrowedbooks/${range}`);
                const chartData = response.data.map((item, index) => {
                    let name;
                    if (range === 'last7days' || range === 'lastMonth') {
                        name = format(parseISO(item.date), 'dd MMM'); // Format as day and month
                    } else if (range === 'lastYear') {
                        name = format(parseISO(item.date), 'MMM yyyy'); // Format as month and year
                    }
                    return {
                        name: name,
                        value: item.borrowedCount,
                    };
                });
                setData(chartData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [range]);

    return (
        <div className="full-container">
            <h2 className="chart-title">Number of Borrwed Books</h2>
            <div className="inline-container-borrow">
                <label htmlFor="range-select">Select Range: </label>
                <select id="range-select" value={range} onChange={(e) => setRange(e.target.value)}>
                    <option value="last7days">Last 7 Days</option>
                    <option value="lastMonth">Last Month</option>
                    <option value="lastYear">Last Year</option>
                </select>
            </div>
            <div className="pie-chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" interval={0} textAnchor="end" tick={{ fontSize: 12 }}/>
                        <YAxis tickFormatter={(tick) => Number.isInteger(tick) ? tick : ''} />
                        <Tooltip contentStyle={tooltipStyle} />
                        
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                    
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default FlowOfBorrow;