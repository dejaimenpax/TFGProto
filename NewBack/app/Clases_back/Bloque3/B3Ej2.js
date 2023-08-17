const EjGenerico = require('../EjGenerico.js');

class Ej3B2 extends EjGenerico {
  constructor(
    texto = "¿Cuántos de los siguientes triángulos son acutángulos?",
    enunciado = [
        [
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]]
        ],
        [
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]]
        ],
        [
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]]
        ],
        [
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]]
        ]
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de Ej3B2");
    super(
      "Bloque 3 - Formas Geométricas y Orientación Espacial",
      3.02, // 3.05 dice bloque 3 => ej 2
      texto,
      enunciado,
      puntuacion
    );
    this.long_input = 1;
    this.etiquetas= ["Número de triángulos acutángulos:"]
  }

  resolver(input) {
    console.log("He entrado en resolver Ej3B2");
    this.input = input;

    let acutangulos = 0;
    for (let i = 0; i < this.enunciado.length; i++) {
      let a = this.enunciado[i][0];
      let b = this.enunciado[i][1];
      let c = this.enunciado[i][2];

      let ladoA = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
      let ladoB = Math.sqrt(Math.pow(c[0] - b[0], 2) + Math.pow(c[1] - b[1], 2));
      let ladoC = Math.sqrt(Math.pow(a[0] - c[0], 2) + Math.pow(a[1] - c[1], 2));

      let maxLado = Math.max(ladoA, ladoB, ladoC);

      if (maxLado === ladoA) {
        if (Math.pow(ladoA, 2) < Math.pow(ladoB, 2) + Math.pow(ladoC, 2)) {
          acutangulos++;
        }
      } else if (maxLado === ladoB) {
        if (Math.pow(ladoB, 2) < Math.pow(ladoA, 2) + Math.pow(ladoC, 2)) {
          acutangulos++;
        }
      } else {
        if (Math.pow(ladoC, 2) < Math.pow(ladoA, 2) + Math.pow(ladoB, 2)) {
          acutangulos++;
        }
      }
    }

    // Excluir triángulos rectángulos
    let rectangulos = 0;
    for (let i = 0; i < this.enunciado.length; i++) {
      let a = this.enunciado[i][0];
      let b = this.enunciado[i][1];
      let c = this.enunciado[i][2];

      let ladoA = Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
      let ladoB = Math.sqrt(Math.pow(c[0] - b[0], 2) + Math.pow(c[1] - b[1], 2));
      let ladoC = Math.sqrt(Math.pow(a[0] - c[0], 2) + Math.pow(a[1] - c[1], 2));

      let maxLado = Math.max(ladoA, ladoB, ladoC);

      if (maxLado === ladoA) {
        if (Math.pow(ladoA, 2) === Math.pow(ladoB, 2) + Math.pow(ladoC, 2)) {
          rectangulos++;
        }
      } else if (maxLado === ladoB) {
        if (Math.pow(ladoB, 2) === Math.pow(ladoA, 2) + Math.pow(ladoC, 2)) {
          rectangulos++;
        }
      } else {
        if (Math.pow(ladoC, 2) === Math.pow(ladoA, 2) + Math.pow(ladoB, 2)) {
          rectangulos++;
        }
      }
    }

    // Restar los triángulos rectángulos para obtener los acutángulos
    acutangulos -= rectangulos;

    if (acutangulos === parseInt(this.input[0])) {
      this.explicacion.push(`¡Es correcto!`);
    } else {
      this.explicacion.push(
        `No es correcto. Hay ${acutangulos} triángulos acutángulos en total.`
      );
    }
  }
}

module.exports = Ej3B2;
