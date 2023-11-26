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
    this.etiquetas=["Número de vasos:"]
    this.puntos_explicados = "La respuesta correcta proporciona 10 puntos."

  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio 2 del bloque 2");
    this.input = input;

    const capacidadBidon = parseInt(this.enunciado[0].replace(/[^0-9]/g, ''));
    const capacidadVaso = parseInt(this.enunciado[1].replace(/[^0-9]/g, ''));
    const litrosPorVaso = capacidadVaso / 100;

    const numVasos = Math.ceil(capacidadBidon / litrosPorVaso);

    if (this.input[0] == numVasos) {
      this.explicacion.push(`¡Es correcto! Los pasos seguidos son los siguientes: <ol>\n  <li>Pasamos de centilitros a litros la capacidad del vaso dividiendo entre 100 y obteniendo ${capacidadVaso} litros.</li>\n  <li>Calculamos el número de vasos necesarios dividiendo la capacidad del bidón en litros entre la capacidad de cada vaso en litros, obteniendo ${(capacidadBidon / litrosPorVaso).toFixed(2).replace('.',',')}.</li>\n <li>Aproximamos al entero más cercano por arriba, ya que si tenemos decimales necesitaremos un vaso extra aunque no esté lleno del todo, obteniendo ${numVasos}.</li>\n</ol>`);
      this.nota = this.puntuacion;
    } else {
      const mensaje = `No es correcto. Los pasos a seguir son los siguientes: <ol>\n  <li>Pasamos de centilitros a litros la capacidad del vaso dividiendo entre 100 y obteniendo ${capacidadVaso} litros.</li>\n  <li>Calculamos el número de vasos necesarios dividiendo la capacidad del bidón en litros entre la capacidad de cada vaso en litros, obteniendo ${(capacidadBidon / litrosPorVaso).toFixed(2).replace('.',',')}.</li>\n <li>Aproximamos al entero más cercano por arriba, ya que si tenemos decimales necesitaremos un vaso extra aunque no esté lleno del todo, obteniendo ${numVasos}.</li>\n</ol>`;
      this.explicacion.push(mensaje);
    }
  }
}

module.exports = B2Ej2;