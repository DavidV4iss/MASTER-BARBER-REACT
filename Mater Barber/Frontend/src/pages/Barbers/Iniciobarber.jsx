// BARBEROS
import React, { useState } from "react";
import NavBarber from "../../Components/NavbarBarber";
import SidebarBarber from "../../Components/SidebarBarber";


const Iniciobarber = () => {
  return (
    <div>
      <NavBarber />
      <SidebarBarber />
      <div className="container text-white">
        <p className="text-center text-white display-3 bebas mx-3 mt-5">
          INFORMACION <span className="text-danger">BARBERO</span>|HOME{""}
        </p>
        
      </div>
    </div>
  );
};

export default Iniciobarber;

