import React, { useState, useEffect } from "react";

function App() {
  // Inicializa el tema desde localStorage o por defecto en "light"
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Función para alternar entre temas y guardarlo en localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Guardar la preferencia del usuario
  };

  // Efecto para aplicar la clase correspondiente al body según el tema
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div>
    <div className="bebas text-center container mt-3 d-none d-sm-block">
    <p>{theme === "light" ? "Modo Oscuro (Recomendado)" : "Modo Claro (Puede Haber Fallas Al Aplicar)"}</p> 
    </div>
      <div className="bebas">
  
        <button onClick={toggleTheme} className="position-absolute top-0 start-0 mt-2 mx-2 d-none d-sm-block">
        <i class="bi bi-moon-stars-fill"></i>
        </button>
        

      </div>  
      </div>  
      
  );
}

export default App;
