const EjGenerico = require('../EjGenerico.js');

class B4Ej4 extends EjGenerico {

  constructor(
    texto = "Hay que hacer un estudio sobre el deporte de pelota favorito de los alumnos de la clase. " +
            "Calcula el porcentaje de alumnos (redondeando a la unidad) cuyo deporte favorito es el fútbol sabiendo que...",
    enunciado = [
      `${Math.floor(Math.random() * 4) + 2} alumnos han dicho que es el voleibol`,
      `${Math.floor(Math.random() * 4) + 2} alumnos han dicho que es el pádel`,
      `${Math.floor(Math.random() * 4) + 2} alumnos han dicho que es el bádminton`,
      `${Math.floor(Math.random() * 4) + 2} alumnos han dicho que es el fútbol`,
      `${Math.floor(Math.random() * 4) + 2} alumnos han dicho que es el tenis`,
      `${Math.floor(Math.random() * 4) + 2} alumnos han dicho que es otro deporte distinto de los anteriores`
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de B4Ej4");

    super(
      "Bloque 4 - Organización de la información",
      4.04,
      texto,
      enunciado,
      puntuacion
    );

    this.long_input = 1;
    this.etiquetas= ["% de alumnos:"]
  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio de estadística del bloque 4");
    this.input = input;

    const futbol = parseInt(this.enunciado[3].match(/\d+/)[0]);
    const total = this.enunciado.reduce((acc, el) => acc + parseInt(el.match(/\d+/)[0]), 0);

    const porcentajeFutbol = Math.round((futbol / total) * 100);

    if (porcentajeFutbol === parseInt(this.input[0])) {
      this.explicacion.push(`¡Es correcto!`);
      this.nota = this.puntuacion;
    } else {
      this.explicacion.push(`No es correcto. Para calcular el porcentaje correcto, divide el número de alumnos que han dicho que el fútbol es su deporte favorito entre el número total de alumnos y multiplica por 100, obteniendo ${porcentajeFutbol}%.`);
    }
  }
}

module.exports = B4Ej4;
