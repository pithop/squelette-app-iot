import React, { useEffect, useState, useRef } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from './firebase'; // Assurez-vous que vous importez correctement la base de données initialisée
import { Chart, registerables } from 'chart.js';
import { Button } from 'react-bootstrap';

Chart.register(...registerables);

const GlobalCharts = () => {
  const globalChartRef = useRef(null);
  const [chartType, setChartType] = useState('poids');
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, 'hackathon');
    onValue(dataRef, (snapshot) => {
      const rawData = snapshot.val();
      if (rawData) {
        const formattedData = Object.keys(rawData).map((key) => ({
          id: key,
          ...rawData[key]
        }));
        setData(formattedData);
      }
    });
  }, []);

  const createGlobalChart = () => {
    const ctx = globalChartRef.current.getContext('2d');
    const labels = data.map((item, index) => `Data ${index + 1}`);
    const chartData = data.map(item => item[chartType]);

    if (globalChartRef.current.chartInstance) {
      globalChartRef.current.chartInstance.destroy();
    }

    globalChartRef.current.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: chartType,
          data: chartData,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
          fill: false,
          tension: 0.1,
          pointRadius: 5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: chartType
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    if (data.length > 0) {
      createGlobalChart();
    }
  }, [data, chartType]);

  return (
    <div>
      <Button onClick={() => setChartType('poids')}>Afficher Poids</Button>
      <Button onClick={() => setChartType('capacitance1')}>Afficher Capacitance 1</Button>
      <Button onClick={() => setChartType('capacitance2')}>Afficher Capacitance 2</Button>
      <canvas ref={globalChartRef}></canvas>
    </div>
  );
};

export default GlobalCharts;
