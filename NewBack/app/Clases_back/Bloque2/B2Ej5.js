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
    this.puntos_explicados = "Responder correctamente para los minutos suma 6 puntos. Responder la hora y minuto exactos suma 10 puntos."
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

    let contador = [false, false]

    if (horasTermino.toString() === this.input[0]) {
      this.explicacion.push(`¡La hora es correcta!. Para hallarla, hay que multiplicar la duración de cada clase (${duracionClase} minutos) por el total de clases (${totalClases} clases) y sumar después los ${duracionRecreo} minutos de recreo. Ese resultado lo dividiremos entre 60, y obtendremos ${Math.floor(duracionTotal / 60)} horas, que es el cociente de la división. Sabiendo que las clases empiezan a las 9:00, obtenemos la hora adecuada sumando: las clases acaban a las ${horasTermino} horas.`);
      contador[0]=true
    } else {
      this.explicacion.push(`No es correcto para las horas. Para hallarla, hay que multiplicar la duración de cada clase (${duracionClase} minutos) por el total de clases (${totalClases} clases) y sumar después los ${duracionRecreo} minutos de recreo. Ese resultado lo dividiremos entre 60, y obtendremos ${Math.floor(duracionTotal / 60)} horas, que es el cociente de la división. Sabiendo que las clases empiezan a las 9:00, obtenemos la hora adecuada sumando: las clases acaban a las ${horasTermino} horas.`);
    }

    if (minutosTermino === this.input[1]) {
      this.explicacion.push(`¡El minuto es correcto! Para hallarlo, hay que multiplicar la duración de cada clase (${duracionClase} minutos) por el total de clases (${totalClases} clases) y sumar después los ${duracionRecreo} minutos de recreo. Ese resultado lo dividiremos entre 60 y nos quedaremos con el resto de la división, que son los minutos correctos: ${minutosTermino} minutos.`);
      contador[1]=true
    } else {
      this.explicacion.push(`No es correcto para los minutos. Para hallarlos, hay que multiplicar la duración de cada clase (${duracionClase} minutos) por el total de clases (${totalClases} clases) y sumar después los ${duracionRecreo} minutos de recreo. Ese resultado lo dividiremos entre 60 y nos quedaremos con el resto de la división, que son los minutos correctos: ${minutosTermino} minutos.`);
    }

    if (contador[1]){
      if (contador[2])
        this.nota=10
      else
        this.nota=6
    } else {
      this.nota=0
    }
    
  }
}

module.exports = B2Ej5;

