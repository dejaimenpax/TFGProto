import React from "react";

const DropdownMenu = ({ handleSelect }) => {
  return (
    <div className="text-center">
      <button
        className="text-center btn btn-custom dropdown-toggle btn-lg"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Selecciona un bloque
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(1)}
          title="Aproximaciones, ordenación, múltiplos y divisores"
          aria-label="Aproximaciones, ordenación, múltiplos y divisores"
          tabIndex="0"
        >
          Bloque I - Números y Operaciones
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(2)}
          title="Ángulos, monedas, horarios y otras medidas"
          aria-label="Ángulos, monedas, horarios y otras medidas"
          tabIndex="0"
        >
          Bloque II - La Medida
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(3)}
          title="Tipos de triángulos según sus ángulos, áreas y perímetros"
          aria-label="Tipos de triángulos según sus ángulos, áreas y perímetros"
          tabIndex="0"
        >
          Bloque III - Formas geométricas y Orientación Espacial
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(4)}
          title="Medias, modas, medianas, máximos, mínimos y gráficas"
          aria-label="Medias, modas, medianas, máximos, mínimos y gráficas"
          tabIndex="0"
        >
          Bloque IV - Organización de la información
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;

