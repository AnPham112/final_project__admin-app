import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ users, orders, delivered }) => {
  return (
    <Bar
      style={{ width: '55%', marginTop: '0.5rem' }}
      data={{
        labels: ['Users', 'Orders', 'Products delivered',],
        datasets: [
          {
            label: '# number of',
            data: [users, orders, delivered],
            backgroundColor: [
              'rgba(20, 45, 52, 0.9)'
            ],
            borderColor: [
              'rgba(54,162,235,1)'
            ],
            borderWidth: 1
          }
        ]
      }}
      height={400}
      width={600}
      options={{
        responsive: false, maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              }
            }
          ]
        }
      }}
    />
  );
}

export default BarChart;