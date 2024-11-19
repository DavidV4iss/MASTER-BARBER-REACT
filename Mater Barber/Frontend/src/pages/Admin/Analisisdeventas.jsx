import React from 'react'
import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'
import Graficas from '../../Components/Graficas';

export default function Analisisdeventas() {
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [
            {
                label: 'Ventas',
                data: [65, 59, 580, 81, 56, 55, 67, 100, 36, 10, 30, 60]
            },
            {
                label: 'Gastos',
                data: [28, 48, 40, 19, 86, 27, 72, 30, 0, 30, 39, 70]
            },

        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        }
    };
    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='contenido'  id='Analisisdeventas'>
                <p className='text-center text-white mt-5 display-6 bebas col-sm-12 col'>HOLA,  <span className='text-danger'>ADMINISTRADOR</span>| ESTE ES EL ANALISIS DE VENTAS</p>
                <div className='container pt-5 col-sm12 col justify-content-center'>
                    <div className="row g-5">
                        <div className="col col-sm-12">
                            <Graficas data={data} tipo='line' options={options} />
                        </div>
                        <div className="col-12 col-sm border border-2 mx-0 mx-sm-5 border-secondary  text-center">
                            <h3 className='pt-4  text-warning'>Prductos vendidos</h3>
                            <h4 className='pt-2 text-white'>1234 unidades</h4>
                            <h4 className='pb-4 text-success'>+ 8% este mes</h4>
                        </div>
                        <div className="col-12 col-sm border mx-0 mx-sm-5 border-2 border-secondary text-center">
                            <h3 className='pt-4 text-warning'>Total ganancias</h3>
                            <h4 className='pt-2 text-white'>COP 10.000.000</h4>
                            <h4 className='pb-4 text-danger'>-5 % este mes</h4>
                        </div>
                    </div>
                    <div className="container border border-2 border-secondary my-5 p-4 row g-0">
                        <div className="row justify-content-between col col-sm-12">
                            <h4 className="col-12 col-sm-10 text-white mt-2">Productos más vendidos</h4>

                            <select name="" id="" className="form-select col-12 col-sm bg-secondary text-white">
                                <option value="">Enero</option>
                                <option value="">Febrero</option>
                                <option value="">Marzo</option>
                                <option value="">Abril</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
