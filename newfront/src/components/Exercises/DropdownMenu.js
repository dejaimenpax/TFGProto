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
          title="Números y operaciones"
          aria-label="Números y operaciones"
          tabIndex="0"
        >
          Bloque I - Números y Operaciones
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(2)}
          title="La Medida"
          aria-label="La Medida"
          tabIndex="0"
        >
          Bloque II - La Medida
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(3)}
          title="Formas Geométricas y orientación espacial"
          aria-label="Formas Geométricas y orientación espacial"
          tabIndex="0"
        >
          Bloque III - formas geométricas y Orientación Espacial
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(4)}
          title="Organización de la información"
          aria-label="Organización de la información"
          tabIndex="0"
        >
          Bloque IV - Organización de la información
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;

