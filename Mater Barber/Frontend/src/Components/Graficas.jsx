import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function Graficas({ tipo, data, options }) {

  if (tipo === 'doughnut') {
    return <Doughnut data={data} options={options} height={80} />;
  } else if (tipo === 'line') {
    return <Line data={data} options={options} height={40} />;
  } else if (tipo === 'bar') {
  }
  return null;
}