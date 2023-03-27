import React from "react";

const DropdownMenu = ({ handleSelect }) => {
  return (
    <div>
      <button
        className="btn btn-secondary dropdown-toggle"
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
          Bloque I
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(2)}
          title="La Medida"
          aria-label="La Medida"
          tabIndex="0"
        >
          Bloque II
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(3)}
          title="Formas Geométricas y orientación espacial"
          aria-label="Formas Geométricas y orientación espacial"
          tabIndex="0"
        >
          Bloque III
        </button>
        <button 
          className="dropdown-item" 
          onClick={() => handleSelect(4)}
          title="Organización de la información"
          aria-label="Organización de la información"
          tabIndex="0"
        >
          Bloque IV
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;

