import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function GraficaVentas({ ventas }) {
    if (!Array.isArray(ventas) || ventas.length === 0) {
        return <p className='text-danger text-center mt-5 pt-5 my-5'>No hay datos para mostrar</p>;
    }
    if (!ventas.every(venta => venta.nombre && venta.cantidad >= 0)) {
        return <p className='text-danger text-center mt-5 pt-5 my-5'>Datos inválidos para mostrar la gráfica</p>;
    }
    const agruparVentasPorProducto = (ventas) => {
        return ventas.reduce((acc, venta) => {
            acc[venta.nombre] = (acc[venta.nombre] || 0) + venta.cantidad;
            return acc;
        }, {});
    };

    // Función para preparar los datos de la gráfica
    const prepararDatosGrafica = (productos) => {
        return {
            labels: Object.keys(productos),
            datasets: [
                {
                    label: 'Cantidad Vendida',
                    data: Object.values(productos),
                    borderColor: 'yellow',
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderWidth: 2,
                    pointBackgroundColor: 'yellow',
                    pointBorderColor: 'white',
                    tension: 0.9,
                },
            ],
        };
    };

    // Función para configurar las opciones de la gráfica
    const configurarOpcionesGrafica = () => {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Ventas Por Producto',
                    font: {
                        size: 50,
                        weight: 'bold',
                        family: 'antonparabanckend',
                    },
                    color: 'yellow',
                    padding: {
                        top: 10,
                        bottom: 50,
                    },
                },
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                    },
                },
                y: {
                    grid: {
                        color: 'rgba(200, 200, 200, 0.5)',
                    },
                },
            },
        };
    };

    // Agrupar las ventas y preparar los datos
    const productos = agruparVentasPorProducto(ventas);
    const data = prepararDatosGrafica(productos);
    const options = configurarOpcionesGrafica();

    // Renderizar la gráfica
    return (
        <Line data={data} options={options} />
    );
}