const EjGenerico = require('../EjGenerico.js');

class B4Ej5_6 extends EjGenerico {

  constructor(
    texto = "Calcula la mediana y la moda del siguiente conjunto de números:",
    enunciado = [Array.from({length: 15}, () => Math.floor(Math.random() * 30) + 1).join(' ')],
    puntuacion = 10
  ) {
    super(
      "Bloque 4 - Organización de la información",
      4.05, // 4.05 dice bloque 4 => ej 5
      texto,
      enunciado,
      puntuacion
    );
    this.long_input=2;
    this.etiquetas= ["Mediana:", "Moda:"]
    this.puntos_explicados = "Cada respuesta vale 5 puntos, valiendo el ejercicio 10 puntos."

  }

  resolver(input) {
    this.input = input;
  
    const numeros = this.enunciado[0].split(" ").map(num => parseInt(num));
  
    // Calculamos la mediana
    const sortedNumeros = [...numeros].sort((a, b) => a - b);
    const mediana = sortedNumeros[7]
    if (mediana.toString() === this.input[0]) {
      this.explicacion.push(`¡La mediana es correcta!`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. La mediana es ${mediana}.`);
    }
  
    // Calculamos la moda
    const frecuencias = {};
    let maxFrecuencia = 0;
    numeros.forEach(num => {
      if (frecuencias[num]) {
        frecuencias[num]++;
      } else {
        frecuencias[num] = 1;
      }
      maxFrecuencia = Math.max(maxFrecuencia, frecuencias[num]);
    });
    const modas = Object.keys(frecuencias).filter(num => frecuencias[num] === maxFrecuencia);
    if (modas.includes(this.input[1])) {
      this.explicacion.push(`¡La moda es correcta!`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. La moda es ${modas.join(' o ')}.`);
    }
  }
  
}

module.exports = B4Ej5_6;
