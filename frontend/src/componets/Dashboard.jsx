// frontend/src/components/Dashboard.js

import  { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2'; // Only import Pie for chart rendering
import { getSpendingData } from '../api/paymentApi'; // API call function

const Dashboard = () => {
  const [spendingData, setSpendingData] = useState([]);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch spending data from the backend
    getSpendingData()
      .then(data => {
        const aggregatedData = aggregateData(data);
        setSpendingData(aggregatedData);
        setChartData(formatChartData(aggregatedData));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const aggregateData = (data) => {
    const categoryTotals = {};

    data.forEach(item => {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.amount;
    });

    return Object.entries(categoryTotals).map(([category, total]) => ({ category, total }));
  };

  const formatChartData = (data) => ({
    labels: data.map(item => item.category),
    datasets: [{
      data: data.map(item => item.total),
      backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FF33B5'],
    }],
  });

  return (
    <div>
      <h1>Budget Tracker Dashboard</h1>
      {chartData ? <Pie data={chartData} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default Dashboard;
