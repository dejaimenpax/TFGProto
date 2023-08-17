const EjGenerico = require('../EjGenerico.js');

class B4Ej8 extends EjGenerico {

  constructor(
    texto = "Halla el máximo, la media aritmética y el mínimo del siguiente conjunto de números, redondeando las tres respuestas al entero más cercano.",
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

    this.long_input = 3;
    this.etiquetas= ["Máximo:", "Media aritmética (redondeada a la unidad):", "Mínimo:"]
  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio 8 del bloque 4");
    this.input = input;
  
    const numeros = this.enunciado[0].split(' ').map(numero => parseInt(numero));
    const maximo = Math.max(...numeros);
    const media = numeros.reduce((suma, numero) => suma + numero, 0) / numeros.length;
    const minimo = Math.min(...numeros);
  
    const respuestaMaximo = parseInt(this.input[0]);
    const respuestaMedia = parseInt(this.input[1]);
    const respuestaMinimo = parseInt(this.input[2]);
  
    if (respuestaMaximo === maximo) {
      this.explicacion.push(`¡Es correcto!`);
      this.nota += this.puntuacion/4;
    } else {
      this.explicacion.push(`No es correcto. El máximo es ${maximo}. Para calcularlo se debe buscar el número más grande de la lista.`);
    }
  
    if (respuestaMedia === Math.round(media)) {
      this.explicacion.push(`¡Es correcto!`);
      this.nota += this.puntuacion/2; //vale mas calcular la media que el resto
    } else {
      this.explicacion.push(`No es correcto. La media es ${Math.round(media)}. Para calcularla se debe sumar todos los números y dividir por la cantidad de números.`);
    }
  
    if (respuestaMinimo === minimo) {
      this.explicacion.push(`¡Es correcto!`);
      this.nota += this.puntuacion/4;
    } else {
      this.explicacion.push(`No es correcto. El mínimo es ${minimo}. Para calcularlo se debe buscar el número más pequeño de la lista.`);
    }
  }
  
}

module.exports = B4Ej8;
