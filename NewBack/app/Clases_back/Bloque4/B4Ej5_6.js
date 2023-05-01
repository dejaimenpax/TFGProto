const EjGenerico = require('../EjGenerico.js');

class B4Ej5_6 extends EjGenerico {

  constructor(
    texto = "Calcula la media aritmética, la mediana y la moda del siguiente conjunto de números:",
    enunciado = [
      `${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ` +
      `${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ` +
      `${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1} ${Math.floor(Math.random() * 30) + 1}`
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de B4Ej5_6");

    super(
      "Bloque 4 - Estadística",
      4.05, // 4.05 dice bloque 4 => ej 5
      texto,
      enunciado,
      puntuacion
    );

    this.long_input=3;
  }

  resolver(input) {
    this.input = input;
  
    const numeros = this.enunciado[0].split(" ").map(num => parseInt(num));
  
    // Calculamos la media
    const suma = numeros.reduce((acum, num) => acum + num, 0);
    const media = Math.round(suma / numeros.length);
  
    if (media.toString() === this.input[0]) {
      this.explicacion.push(`¡La media es correcta!`);
    } else {
      this.explicacion.push(`No es correcto. La media es ${media}.`);
    }
  
    // Calculamos la mediana
    numeros.sort((a, b) => a - b);
    let mediana;
    if (numeros.length % 2 === 0) {
      const mediana1 = numeros[numeros.length / 2 - 1];
      const mediana2 = numeros[numeros.length / 2];
      mediana = Math.round((mediana1 + mediana2) / 2);
    } else {
      mediana = numeros[Math.floor(numeros.length / 2)];
    }
  
    if (mediana.toString() === this.input[1]) {
      this.explicacion.push(`¡La mediana es correcta!`);
    } else {
      this.explicacion.push(`No es correcto. La mediana es ${mediana}.`);
    }
  
    // Calculamos la moda
    const frecuencias = {};
    let moda = numeros[0];
    let maxFrecuencia = 0;
    numeros.forEach(num => {
      if (frecuencias[num]) {
        frecuencias[num]++;
      } else {
        frecuencias[num] = 1;
      }
      if (frecuencias[num] > maxFrecuencia) {
        moda = num;
        maxFrecuencia = frecuencias[num];
      }
    });
  
    if (moda.toString() === this.input[2]) {
      this.explicacion.push(`¡La moda es correcta!`);
    } else {
      this.explicacion.push(`No es correcto. La moda es ${moda}.`);
    }
  }
  
}

module.exports = B4Ej5_6;