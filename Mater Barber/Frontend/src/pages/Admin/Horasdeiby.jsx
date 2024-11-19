import React from 'react'
import SidebarAdmin from '../../Components/SidebarAdmin'
import NavbarAdmin from '../../Components/NavbarAdmin'

export default function Horasdeiby() {
    return (
        <div>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='contenido'>
                <p className='text-center text-white mt-5 display-3 bebas mx-3 '>HORAS <span className='text-danger'>EXTRAS</span> TRABAJADAS</p>

            </div>

        </div>
    )
}
