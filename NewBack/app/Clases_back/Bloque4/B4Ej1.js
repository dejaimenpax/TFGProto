const EjGenerico = require('../EjGenerico.js');

class B4Ej1 extends EjGenerico {
  constructor(
    texto = "El siguiente diagrama de barras representa las edades de los alumnos de una clase de la Universidad. " +
    "Responde, en las dos cajas de texto, cuántos alumnos tiene la clase en total " +
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
    this.puntos_explicados = "Cada respuesta vale 5 puntos, valiendo el ejercicio 10 puntos."

  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio B4Ej1 del bloque 4");
    this.input = input;

    const totalAlumnos = this.enunciado.reduce((total, cantidad) => total + cantidad, 0);
    const sumaEdades = this.enunciado.reduce((suma, cantidad, edad) => suma + cantidad * (edad + 18), 0);
    const media = Math.round(sumaEdades / totalAlumnos);

    if (this.input[0] == totalAlumnos) {
      this.explicacion.push(`¡El número total de alumnos es correcto! Para hallarlo, hay que fijarse en el eje vertical de la gráfica, que indica el número de alumnos para cada edad, y sumar las alturas de las barras, obteniendo ${totalAlumnos} alumnos.`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. El total debería ser ${totalAlumnos} alumnos, que se puede hallar observando el eje vertical de la gráfica, que indica el número de alumnos para cada edad, y sumando las alturas de las barras.`);
    }

    if (this.input[1] == media) {
      this.explicacion.push(`¡La media de edad es correcta! Para calcularla, hay que multiplicar cada edad por el número de alumnos que tienen esa edad: 18 x ${this.enunciado[0]}, 19 x ${this.enunciado[1]}, 20 x ${this.enunciado[2]}... Después, hay que sumar todos esos valores, obteniendo ${sumaEdades}. Por último, hay que dividir el resultado de la suma entre el número total de alumnos y redondear el cociente obtenido.`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. La media redondeada debería ser ${media} años. Para calcularla, hay que multiplicar cada edad por el número de alumnos que tienen esa edad: 18 x ${this.enunciado[0]}, 19 x ${this.enunciado[1]}, 20 x ${this.enunciado[2]}... Después, hay que sumar todos esos valores, obteniendo ${sumaEdades}. Por último, hay que dividir el resultado de la suma entre el número total de alumnos y redondear el cociente obtenido.`);
    }
  }

}

module.exports = B4Ej1;
