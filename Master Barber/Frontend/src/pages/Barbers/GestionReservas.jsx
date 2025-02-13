import NavbarBarber from "../../Components/NavbarBarber";
import SidebarBarber from "../../Components/SidebarBarber";
import React from "react";
import Barbero from "../../Components/Barbero";

export default function GestionReservas() {
  return (
    <div>
      <NavbarBarber />
      <SidebarBarber />
      <div className="container text-white mt-5 bebas text-center display-3">
        <p className="text-center text-white display-3 bebas mx-3 mt-5">
          RESERVAS <span className="text-danger">DE CLIENTES</span>
          <Barbero />
        </p>
      </div>
    </div>
  );
}
