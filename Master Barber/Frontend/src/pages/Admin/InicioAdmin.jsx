import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../Components/SidebarAdmin'
import NavbarAdmin from '../../Components/NavbarAdmin'
import axios from 'axios'
import 'animate.css';

export default function InicioAdmin() {

    const [barberos, setBarberos] = useState([]);

    useEffect(() => {
        const fetchBarberos = async () => {
            try {
                const res = await axios.get("http://localhost:8080/GetBarberos");
                setBarberos(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        }
        fetchBarberos()
    }, [])

    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='contenido p-5 mt-5'>
                <p className='text-center text-white display-3 bebas mx-3'>MASTER <span className='text-danger'>BARBER</span>| INICIO </p>
                <div className="row">
                    <div className="container col border border mt-5 row col contenidol">
                        <h1 className='bebas text-center text-white mt-2 border-bottom fs-1 animate__slideOutDown'>MENUUUUUU</h1>
                        <div className='row'>
                            <div className="col container mx-2">
                                <p className='mx-4  text-white antonparabackend mt-2 col'>links ayudas</p>
                                <p><a href="GestionarBarberos" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">GESTION BARBEROS</a></p>
                                <p><a href="HrsBarberos" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">HORAS BARBEROS</a></p>
                                <p><a href="Inventario" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">INVENTARIO</a></p>
                                <p><a href="Gestiondeinventario" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">GESTION INVENTARIO</a></p>
                                <p><a href="Analisisdeventas" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">ANALISISVENTAS</a></p>
                            </div>
                            <div className="col zoomhover2">
                                <img src="LOGO.png" alt="" width="100%" height="90%" className="d-inline-block align-text-top mx-3 mt-1" />
                            </div>
                        </div>
                    </div>
                    <div className=" col border border mt-4 col mx-5 mt-5">
                        <h2 className='bebas text-center text-white mt-2 border-bottom fs-1'>BARBEROS ACTUALES</h2>
                        <div className='text-white  fs-5 mx-4 mt-3'>
                            {barberos.map((barbero) => (
                                <div className="mt-3 fw-bold">
                                    <li>{barbero.nombre_usuario + " - " + barbero.descripcion}</li>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
