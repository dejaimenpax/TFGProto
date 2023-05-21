const EjGenerico = require('../EjGenerico.js');

class Ej3B15 extends EjGenerico {
  constructor(
    texto = "Calcula el perímetro del siguiente triángulo (puede ayudarte usar el Teorema de Pitágoras) y redondea el resultado al entero más cercano.",
    enunciado = [
        [
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]]
        ]
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de Ej3B15");

    super(
      "Bloque 3 - Formas Geométricas y Orientación Espacial",
      3.15,
      texto,
      enunciado,
      puntuacion
    );

    this.long_input = 1;
  }

  resolver(input) {
    console.log("He entrado en resolver Ej3B15");
    this.input = input;

    let a = this.enunciado[0][0];
    let b = this.enunciado[0][1];
    let c = this.enunciado[0][2];

    let ladoA = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
    let ladoB = Math.sqrt(Math.pow(c[0] - b[0], 2) + Math.pow(c[1] - b[1], 2));
    let ladoC = Math.sqrt(Math.pow(a[0] - c[0], 2) + Math.pow(a[1] - c[1], 2));

    let perimetro = ladoA + ladoB + ladoC;
    perimetro = Math.round(perimetro);

    if (perimetro === parseInt(this.input[0])) {
      this.explicacion.push(`¡Es correcto!`);
    } else {
      this.explicacion.push(`No es correcto. El perímetro del triángulo es ${perimetro}. Puedes ayudarte del Teorema de Pitágoras para calcular las distancias entre vértices`);
    }
  }
}

module.exports = Ej3B15;
