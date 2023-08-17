const EjGenerico = require('../EjGenerico.js');

class B4EJ1 extends EjGenerico {
  constructor(
    texto = "El siguiente diagrama de barras representa las edades de los alumnos de una clase de la Universidad. " +
    "Responde, en las dos cajas de texto, cúantos alumnos tiene la clase en total " +
    "y cual es la edad media de la clase (redondea la media a un entero).",
    enunciado = Array.from({length: 10}, () => Math.floor(Math.random() * 11)),
    puntuacion = 10
  ) {
    super( 
      "Bloque 4 - Organización de la información",
      4.01,
      texto,
      enunciado,
      puntuacion
    );

    this.long_input = 2;
    this.etiquetas= ["Alumnos totales:", "Promedio de edad (número entero):"]
  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio B4Ej1 del bloque 4");
    this.input = input;

    const totalAlumnos = this.enunciado.reduce((total, cantidad) => total + cantidad, 0);
    const sumaEdades = this.enunciado.reduce((suma, cantidad, edad) => suma + cantidad * (edad + 18), 0);
    const media = Math.round(sumaEdades / totalAlumnos);

    if (this.input[0] == totalAlumnos) {
      this.explicacion.push(`¡El número total de alumnos es correcto!`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. El total debería ser ${totalAlumnos} alumnos.`);
    }

    if (this.input[1] == media) {
      this.explicacion.push(`¡La media de edad es correcta!`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. La media debería ser ${media} años.`);
    }
  }

}

module.exports = B4EJ1;
