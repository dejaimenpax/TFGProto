import React from "react";

import '../../styles/Exercises/BlockButtons.css';

const BlockButtons = ({ handleSelect }) => {
  return (
    <div className="button-menu">
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-bloque btn-lg block1"
          onClick={() => handleSelect(1)}
        >
          <div className="image-container" />
          <span> Números y Operaciones </span>
        </button>
        <button
          className="btn btn-bloque btn-lg block2"
          onClick={() => handleSelect(2)}
        >
          <div className="image-container" />
          <span> Unidades de Medida </span>
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-bloque btn-lg block3"
          onClick={() => handleSelect(3)}
        >
          <div className="image-container" />
          <span> Formas Geométricas </span>
        </button>
        <button
          className="btn btn-bloque btn-lg block4"
          onClick={() => handleSelect(4)}
        >
          <div className="image-container" />
          <span> Gráficas y Estadística </span>
        </button>
      </div>
    </div>
  );
};

export default BlockButtons;
