import React from 'react'
import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'

export default function Gestiondeinventario() {


    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='mt-5 container'>
                <p className='text-center text-white mt-5 display-6 bebas mx-3 '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| ESTE ES EL INVENTARIO DE LOS PRODUCTOS QUE SALEN DE LA BARBERIA</p>

                <div class="row row-cols-1 row-cols-md-2 g-4 mt-5 ">
                    <div class="col">
                        <div class="row row-cols-2 row-cols-md-4 g-4">
                            <div class="card bg-dark">
                                <img src="..." class="card-img-top" alt="..." />
                                <div class="card-body">
                                    <h5 class="card-title text-danger">Card title</h5>
                                </div>
                            </div>
                          </div>
                        </div>

                        <div class="col">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            )
}