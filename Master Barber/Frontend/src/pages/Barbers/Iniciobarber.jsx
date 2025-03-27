// BARBEROS
import React, { useState } from "react";
import NavBarber from "../../Components/NavbarBarber";
import SidebarBarber from "../../Components/SidebarBarber";



const Iniciobarber = () => {
  return (
    <div>
      <NavBarber />
      <SidebarBarber />
      <div className=" text-white contenido">
        <p className="text-center text-white display-2 bebas mt-5">
          INFORMACION <span className="text-danger">BARBERO</span>|HOME{""}
        </p>

        <div className="container col border border mt-4 bg-dark row col contenido mt-5">
          <h4 className="text-center text-white display-3 bebas mx-1 mt-5">
            El barbero
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Iniciobarber;

