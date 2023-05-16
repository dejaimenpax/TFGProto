const EjGenerico = require('../EjGenerico.js');

class B3Ej9 extends EjGenerico {

  constructor(
    texto = "Calcula el área del siguiente triángulo (puede ayudarte usar el Teorema de Pitágoras), y redondea el resultado al entero más cercano.",
    enunciado = [
        [
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]],
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)]]
        ]
    ],

    puntuacion = 10
  ) {

    console.log("Ha entrado en constructor de Ej3B9");

    super(
      "Bloque 3 - Formas Geométricas y Orientación Espacial",
      3.09,
      texto,
      enunciado,
      puntuacion
    );

    this.long_input=1;
  }

  resolver(input) {
    console.log("He entrado en resolver Ej3B9");
    this.input = input;

    let a = this.enunciado[0][0];
    let b = this.enunciado[0][1];
    let c = this.enunciado[0][2];

    let ladoA = Math.sqrt(Math.pow(b[0]-a[0],2) + Math.pow(b[1]-a[1],2));
    let ladoB = Math.sqrt(Math.pow(c[0]-b[0],2) + Math.pow(c[1]-b[1],2));
    let ladoC = Math.sqrt(Math.pow(a[0]-c[0],2) + Math.pow(a[1]-c[1],2));

    let semiperimetro = (ladoA + ladoB + ladoC) / 2;
    let area = (ladoA * ladoB) / 2;

    if(area % 1 >= 0.5) {
      area = Math.ceil(area);
    } else {
      area = Math.floor(area);
    }

    if(area === parseInt(this.input[0])) {
      this.explicacion.push(`¡Es correcto!`);
    } else {
      this.explicacion.push(`No es correcto. El área redondeada del triángulo es ${area}. Para calcular el área de un triángulo, se puede multiplicar la base por la altura y dividir el resultado entre dos.`);
    }
  }
}

module.exports = B3Ej9;