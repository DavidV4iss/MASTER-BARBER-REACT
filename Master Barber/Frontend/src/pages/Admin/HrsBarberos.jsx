import React from 'react'
import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'

export default function HrsBarberos() {
  return (
    <div>
      <NavbarAdmin />
      <SidebarAdmin />
      <div className='contenido2 p-4 container '>
        <p className='text-center text-white mt-5 display-6 bebas '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| ESTAS SON LAS HORAS DE LOS BARBEROS</p>
        <div className="mt-5 pt-5 contenido">
          <div class="row row-cols-1 row-cols-md-3">
            <div class="col">
              <div class="card bg-dark">
                <img src="./B1.JPG" class="card-img-top img-fluid" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-danger text-center anton display-6">DEIBY</h5>
                  <h3 class="text-white text-center bebas">Horario De Barbero</h3>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                  <a class="btn btn-warning" href="/Horasdeiby" role="button"><i class="bi bi-alarm mx-2"></i> VER HORAS EXTRAS</a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-dark">
                <img src="./B2.JPG" class="card-img-top img-fluid" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-danger text-center anton display-6">JEISON</h5>
                  <h3 class="text-white text-center bebas">Horario De Barbero</h3>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                  <a class="btn btn-warning" href="#" role="button"><i class="bi bi-alarm mx-2"></i> VER HORAS EXTRAS</a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-dark">
                <img src="./B3.JPG" class="card-img-top img-fluid" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-danger text-center anton display-6">NIXON</h5>
                  <h3 class="text-white text-center bebas">Horario De Barbero</h3>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                  <a class="btn btn-warning" href="#" role="button"><i class="bi bi-alarm mx-2"></i> VER HORAS EXTRAS</a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-dark mt-5">
                <img src="./LOGO.png" class="card-img-top img-fluid" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-danger text-center anton display-6">NOMBRE BARBERO</h5>
                  <h3 class="text-white text-center bebas">Horario De Barbero</h3>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                  <a class="btn btn-warning" href="#" role="button"><i class="bi bi-alarm mx-2"></i> VER HORAS EXTRAS</a>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="card bg-dark mt-5">
                <img src="./LOGO.png" class="card-img-top img-fluid" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-danger text-center anton display-6">NOMBRE BARBERO</h5>
                  <h3 class="text-white text-center bebas">Horario De Barbero</h3>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                  <a class="btn btn-warning" href="#" role="button"><i class="bi bi-alarm mx-2"></i> VER HORAS EXTRAS</a>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card bg-dark mt-5">
                <img src="./LOGO.png" class="card-img-top img-fluid" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-danger text-center anton display-6">NOMBRE BARBERO</h5>
                  <h3 class="text-white text-center bebas">Horario De Barbero</h3>
                </div>
                <div class="d-grid gap-2 col-12 mx-auto">
                  <a class="btn btn-warning" href="#" role="button"><i class="bi bi-alarm mx-2"></i> VER HORAS EXTRAS</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
