const EjGenerico = require('../EjGenerico.js');

class B2Ej2 extends EjGenerico {
  constructor(
    texto = "Quieres llenar de agua un bidón de varios litros de capacidad con la ayuda de un vaso en el que caben unos pocos centilitros. ¿Cuántos vasos llenos de agua tendrás que echar en el bidón para que se llene?",
    enunciado = [
      `El bidón tiene ${Math.floor(Math.random() * (100 - 29)) + 1} litros`,
      `El vaso tiene ${Math.floor(Math.random() * (60 - 1)) + 1} cl`
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de Ej2 del bloque 2");

    super(
      "Bloque 2 - La medida",
      2.02, // 2.02 dice bloque 2 => ej 2
      texto,
      enunciado,
      puntuacion
    );

    this.long_input = 1;
  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio 2 del bloque 2");
    this.input = input;

    const capacidadBidon = parseInt(this.enunciado[0].replace(/[^0-9]/g, ''));
    const capacidadVaso = parseInt(this.enunciado[1].replace(/[^0-9]/g, ''));
    const litrosPorVaso = capacidadVaso / 100;

    const numVasos = Math.ceil(capacidadBidon / litrosPorVaso);

    if (this.input[0] == numVasos) {
      this.explicacion.push(`¡Correcto! El número de vasos necesarios es ${numVasos}.`);
      this.nota = this.puntuacion;
    } else {
      const mensaje = `No es correcto. Para obtener el número de vasos necesarios, debes dividir la capacidad del bidón (${capacidadBidon} litros) entre la cantidad de agua que cabe en un vaso (${capacidadVaso} cl, es decir, ${litrosPorVaso} litros) y luego redondear hacia arriba, obteniendo ${numVasos} vasos.`;
      this.explicacion.push(mensaje);
    }
  }
}

module.exports = B2Ej2;