import React from "react";

export default function NavbarBarber() {
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    // Redirige a la página de inicio de sesión
    window.location.href = "/";
  }; 
  return (
    <Navbar expand="lg">
      <Container fluid>
        {/* Parte izquierda de la Navbar con fondo azul */}
        <Navbar.Brand as={Link} to="/" className="bg-primary text-white px-3 py-2 rounded">
          Barber Dashboard
        </Navbar.Brand>
        
        {/* Columna de navegación */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto"> {/* ms-auto para alinear la nav a la derecha */}
            <Nav.Link as={Link} to="/" className="bg-light text-dark px-3 py-2 rounded mx-1">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/reservations" className="bg-light text-dark px-3 py-2 rounded mx-1">
              Reservaciones
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
  );
}