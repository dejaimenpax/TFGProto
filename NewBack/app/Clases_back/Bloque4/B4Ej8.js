const EjGenerico = require('../EjGenerico.js');

class B4Ej8 extends EjGenerico {

  constructor(
    texto = "Halla el máximo y el mínimo del siguiente conjunto de números.",
    enunciado = [
      `${Array.from({length: 15}, () => Math.floor(Math.random() * (50 - 2)) + 2).join(' ')}`
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de B4Ej4");

    super(
      "Bloque 4 - Organización de la información",
      4.08, // 4.08 dice bloque 4 => ej 8
      texto,
      enunciado,
      puntuacion
    );

    this.long_input = 2;
    this.etiquetas= ["Máximo:", "Mínimo:"]
    this.puntos_explicados = "Las respuestas correctas para el máximo y el mínimo valen 5 puntos cada una."

  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio 8 del bloque 4");
    this.input = input;
  
    const numeros = this.enunciado[0].split(' ').map(numero => parseInt(numero));
    const maximo = Math.max(...numeros);
    const sumaTotal = numeros.reduce((suma, numero) => suma + numero, 0);
    const minimo = Math.min(...numeros);
  
    const respuestaMaximo = parseInt(this.input[0]);
    const respuestaMinimo = parseInt(this.input[1]);
  
    if (respuestaMaximo === maximo) {
      this.explicacion.push(`¡Es correcto! El máximo se corresponde con el número más grande de la lista.`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. El máximo es ${maximo}. Para calcularlo se debe buscar el número más grande de la lista.`);
    }
  
  
    if (respuestaMinimo === minimo) {
      this.explicacion.push(`¡Es correcto! El mínimo se corresponde con el número más pequeño de la lista.`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. El mínimo es ${minimo}. Para calcularlo se debe buscar el número más pequeño de la lista.`);
    }
  }
  
}

module.exports = B4Ej8;
