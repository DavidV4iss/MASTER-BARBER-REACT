import React from 'react'
import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'
export default function Gestiondeventas() {
    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='contenido' id='Gestiondeventas'>
                <p className='text-center text-white mt-5 display-6 bebas mx-3 '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| AQUI PODRAS AÑADIR, ELIMINAR Y MODIFICAR VENTAS</p>
            </div>
        </div>
    )
}
