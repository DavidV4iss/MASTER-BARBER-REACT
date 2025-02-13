import React from 'react'
import NavbarUserIndex from '../../Components/NavbarUserIndex'
import Reserva from '../../Components/Reserva'

export default function InicioUsuario() {
    return (
      <div>
        <NavbarUserIndex />
        <div className="img position-fixed top-50 start-50 translate-middle row h-100 col-1 col-sm-12  mt-5 p-5 m-2">
          <img src="/LOGO.png" alt="" className="" />
        </div>
        <div
          className="container-fluid p-5 nab table-responsive col col-sm-12"
          id="homeuser"
        >
          <h1 className="text-white text-center display-1 anton fw-bold">
            MASTER BARBER VIP
          </h1>
          <h2 className="text-warning text-center mt-5 anton fw-bold">
            BOGOTA
          </h2>
          <p className="text-white text-center mt-5 p-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            animi, cum quas delectus nulla voluptate velit, corrupti beatae in
            rerum sint, minima doloribus fugit officia quae dolor doloremque
            aspernatur voluptas!
          </p>
        </div>
        <div
          className="container-fluid p-5 nab table-responsive col col-sm-12"
          id="home"
        >
          <h1 className="text-white text-center display-1 anton fw-bold">
            MASTER BARBER VIP
          </h1>
          <h2 className="text-warning text-center mt-5 anton fw-bold">
            BOGOTA
          </h2>
          <p className="text-white text-center mt-5 p-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            animi, cum quas delectus nulla voluptate velit, corrupti beatae in
            rerum sint, minima doloribus fugit officia quae dolor doloremque
            aspernatur voluptas!
          </p>
        </div>

        <div className='container text-white text-center'>
          <Reserva />
        </div>

        <div
          className="container-fluid p-5 nab table-responsive col col-sm-12"
          id="home"
        >
          <h1 className="text-white text-center display-1 anton fw-bold">
            MASTER BARBER VIP
          </h1>
          <h2 className="text-warning text-center mt-5 anton fw-bold">
            BOGOTA
          </h2>
          <p className="text-white text-center mt-5 p-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            animi, cum quas delectus nulla voluptate velit, corrupti beatae in
            rerum sint, minima doloribus fugit officia quae dolor doloremque
            aspernatur voluptas!
          </p>
        </div>
        <div
          className="container-fluid p-5 nab table-responsive col col-sm-12"
          id="home"
        >
          <h1 className="text-white text-center display-1 anton fw-bold">
            MASTER BARBER VIP
          </h1>
          <h2 className="text-warning text-center mt-5 anton fw-bold">
            BOGOTA
          </h2>
          <p className="text-white text-center mt-5 p-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            animi, cum quas delectus nulla voluptate velit, corrupti beatae in
            rerum sint, minima doloribus fugit officia quae dolor doloremque
            aspernatur voluptas!
          </p>
        </div>

        <div
          className="container-fluid p-5 nab table-responsive col col-sm-12"
          id="home"
        >
          <h1 className="text-white text-center display-1 anton fw-bold">
            MASTER BARBER VIP
          </h1>
          <h2 className="text-warning text-center mt-5 anton fw-bold">
            BOGOTA
          </h2>
          <p className="text-white text-center mt-5 p-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
            animi, cum quas delectus nulla voluptate velit, corrupti beatae in
            rerum sint, minima doloribus fugit officia quae dolor doloremque
            aspernatur voluptas!
          </p>
        </div>
      </div>
    );
}