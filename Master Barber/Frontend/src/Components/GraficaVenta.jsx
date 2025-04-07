import React from 'react';
import { Bar} from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function GraficaVentas({ ventas }) {
    // Función para agrupar las ventas por producto
    const agruparVentasPorProducto = (ventas) => {
        return ventas.reduce((acc, venta) => {
            acc[venta.nombre] = (acc[venta.nombre] || 0) + venta.cantidad;
            return acc;
        }, {});
    };

    // Función para preparar los datos de la gráfica
    const prepararDatosGrafica = (productos) => {
        return {
            labels: Object.keys(productos), // Nombres de los productos
            datasets: [
                {
                    label: 'Cantidad Vendida',
                    data: Object.values(productos), // Cantidades vendidas
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
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
                    text: 'Ventas por Producto',
                },
            },
        };
    };

    // Agrupar las ventas y preparar los datos
    const productos = agruparVentasPorProducto(ventas);
    const data = prepararDatosGrafica(productos);
    const options = configurarOpcionesGrafica();

    // Renderizar la gráfica
    return <Bar data={data} options={options} />;
}