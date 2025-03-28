import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/scss/bootstrap.scss";
import * as faIncons from "react-icons/fa";
import { GiBleedingEye } from "react-icons/gi";


export default function SidebarBarber() {
  return (
    <div className="min-vh-100 shadow sidebar2 position-fixed px-1 text-center justify-content-center">
      <ul className="list-unstyled">

      <li className="text-center align-items-center justify-content-center">
        <NavLink
          to="/InicioBarber"
          exact
          className=" rounded d-block text-white fw-bold w-100 mt-5"
          activeClassName="active"
        >
          <faIncons.FaHome className="me-2 " />
          <span className="d-none d-lg-block">Inicio</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/GestionReservas"
          exact
          className="rounded py-2 d-inline-block  text-white fw-bold w-100"
          activeClassName="active"
        >
          <GiBleedingEye className="me-2" />
          <span className="d-none d-lg-block">Reservas</span>
        </NavLink>
        </li>
      </ul>
        
    </div>
  );
}
