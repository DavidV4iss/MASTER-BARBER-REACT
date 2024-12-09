import React from 'react';
import { Doughnut, Line, Bar, Bubble , Radar, PolarArea, Pie, Scatter} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function Graficas({ tipo, data, options }) {

  if (tipo === 'doughnut') {
    return <PolarArea data={data} options={options} height={80} />;
  } else if (tipo === 'radar') {
    return <PolarArea data={data} options={options} height={40} />;
  } else if (tipo === 'doughnut') {
  }
  return null;
}