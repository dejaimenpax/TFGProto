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

    const mapa = new Map()
    mapa.set(0, " el rojo")
    mapa.set(1, " el azul")
    mapa.set(2, " el verde")
    mapa.set(3, " el amarillo")
    
    //guarda los colores de los que son acutangulos
    let acuteNames = new Set();
    let acutangulos = 0;

    for (let i = 0; i < this.enunciado.length; i++) {
      let acu_original = acutangulos

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

      //si se ha añadido un acutangulo, añade el color
      if (acu_original!==acutangulos){
        acuteNames.add(mapa.get(i));
      }
    }

    /*

    // Excluir triángulos rectángulos
    let rectangulos = 0;
    for (let i = 0; i < this.enunciado.length; i++) {
      let rect_original = rectangulos;

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

      //si se ha añadido un rectangulo, quita ese color
      if (rect_original!==rectangulos){
        acuteNames.delete(mapa.get(i))
      }
    }
    

    // Restar los triángulos rectángulos para obtener los acutángulos
    acutangulos -= rectangulos;

    */

    let formattedColors=[...acuteNames]

    //esto añade un "y" al ultimo
    formattedColors.map((x,i)=> {
      if (i===formattedColors.length-1)
        return " y " + x.slice(1)
      })
    
    if (acutangulos === parseInt(this.input[0])) {
      switch(acutangulos){
        case 0:
          this.explicacion.push(
            `¡Es correcto! Hay ${acutangulos} triángulos acutángulos en total.`
          );
          break;
        case 1:
          this.explicacion.push(
            `¡Es correcto! Hay ${acutangulos} triángulo acutángulo en total. El triángulo acutángulo es${formattedColors}.`
          );
          break;
        default:
          this.explicacion.push(
            `¡Es correcto! Hay ${acutangulos} triángulos acutángulos en total. Los triángulos acutángulos son${formattedColors}.`
          );
      }
    } else {
      switch(acutangulos){
        case 0:
          this.explicacion.push(
            `No es correcto. Hay ${acutangulos} triángulos acutángulos en total.`
          );
          break;
        case 1:
          this.explicacion.push(
            `No es correcto. Hay ${acutangulos} triángulo acutángulo en total. El triángulo acutángulo es ${formattedColors}.`
          );
          break;
        default:
          this.explicacion.push(
            `No es correcto. Hay ${acutangulos} triángulos acutángulos en total. Los triángulos acutángulos son ${formattedColors}.`
          );
      }
    }
  }
}

module.exports = Ej3B2;
