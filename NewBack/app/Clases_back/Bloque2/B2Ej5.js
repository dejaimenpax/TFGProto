const EjGenerico = require('../EjGenerico.js');

class B2Ej5 extends EjGenerico {

  constructor(
    texto = "Los maestros están teniendo problemas para cuadrar los horarios y las clases. " +
            "Se sabe que las clases empiezan a las 9 en punto de la mañana. " +
            "Introduce la hora y el minuto a la que termina la jornada escolar (en formato 24 horas) si...",
    enunciado = [
      `Cada clase dura ${Math.floor(Math.random() * (120 - 60)) + 60} minutos`,
      `Hay un solo recreo que dura ${Math.floor(Math.random() * (30 - 10)) + 10} minutos`,
      `Hay un total de ${Math.floor(Math.random() * (8 - 6)) + 6} clases`
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de Ej5 del bloque 2");

    super(
      "Bloque 2 - La medida",
      2.05, // 2.05 dice bloque 2 => ej 5
      texto,
      enunciado,
      puntuacion
    );

    this.long_input=2;
    this.etiquetas=["Hora:", "Minuto:"]
    this.puntos_explicados = "La hora y el minuto deben ser correctas para que el ejercicio cuente 10 puntos."
  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio 5 del bloque 2");
    this.input = input;

    const duracionClase = parseInt(this.enunciado[0].match(/(\d+)/)[0]);
    const duracionRecreo = parseInt(this.enunciado[1].match(/(\d+)/)[0]);
    //const clasesAntesRecreo = parseInt(this.enunciado[2].match(/(\d+)/)[0]);
    const totalClases = parseInt(this.enunciado[2].match(/(\d+)/)[0]);

    const duracionTotal = (duracionClase * totalClases) + duracionRecreo;
    const horasTermino = 9 + Math.floor(duracionTotal / 60);
    const minutosTermino = (duracionTotal % 60).toString().padStart(2, '0');

    let contador = 0

    if (horasTermino.toString() === this.input[0]) {
      this.explicacion.push(`¡La hora es correcta!`);
      contador++;
    } else {
      this.explicacion.push(`No es correcto para las horas. Las clases terminan a las ${horasTermino}:${minutosTermino}.`);
    }

    if (minutosTermino === this.input[1]) {
      this.explicacion.push(`¡El minuto es correcto!`);
      contador++;
    } else {
      this.explicacion.push(`No es correcto para los minutos. Las clases terminan a las ${horasTermino}:${minutosTermino}.`);
    }

    if (contador===2)
      this.nota = this.puntuacion;
  }
}

module.exports = B2Ej5;

