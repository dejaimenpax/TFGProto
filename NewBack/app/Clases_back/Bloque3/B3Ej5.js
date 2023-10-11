const EjGenerico = require('../EjGenerico.js');

class B2Ej5 extends EjGenerico {
  constructor(
    texto = "¿Cuántos de los siguientes triángulos son obtusángulos?",
    enunciado = [
        [
          [[-9,-8,-7][Math.floor(Math.random() * 3)], [-9,-8,-7][Math.floor(Math.random() * 3)]],
          [[-5,-4,-3,-2][Math.floor(Math.random() * 3)], [-9,-8,-7][Math.floor(Math.random() * 3)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2][Math.floor(Math.random() * 8)], [-5,-4,-3,-2][Math.floor(Math.random() * 4)]]
        ],
        [
          [[-9,-8,-7][Math.floor(Math.random() * 3)], [9,8,7][Math.floor(Math.random() * 3)]],
          [[-5,-4,-3,-2][Math.floor(Math.random() * 3)], [9,8,7][Math.floor(Math.random() * 3)]],
          [[-9,-8,-7,-6,-5,-4,-3,-2][Math.floor(Math.random() * 8)], [5,4,3,2][Math.floor(Math.random() * 4)]]
        ],
        [
          [[9,8,7][Math.floor(Math.random() * 3)], [9,8,7][Math.floor(Math.random() * 3)]],
          [[5,4,3,2][Math.floor(Math.random() * 3)], [9,8,7][Math.floor(Math.random() * 3)]],
          [[9,8,7,6,5,4,3,2][Math.floor(Math.random() * 8)], [5,4,3,2][Math.floor(Math.random() * 4)]]
        ],
        [
          [[9,8,7][Math.floor(Math.random() * 3)], [-9,-8,-7][Math.floor(Math.random() * 3)]],
          [[5,4,3,2][Math.floor(Math.random() * 3)], [-9,-8,-7][Math.floor(Math.random() * 3)]],
          [[9,8,7,6,5,4,3,2][Math.floor(Math.random() * 8)], [-5,-4,-3,-2][Math.floor(Math.random() * 4)]]
        ]
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de Ej3B2");
    super(
      "Bloque 3 - Formas Geométricas y Orientación Espacial",
      3.05, // 3.05 dice bloque 3 => ej 5
      texto,
      enunciado,
      puntuacion
    );
    this.long_input = 1;
    this.etiquetas= ["Número de triángulos obtusángulos:"]
    this.puntos_explicados = "La respuesta correcta supone un 10 en el ejercicio."
  }

  resolver(input) {
    console.log("He entrado en resolver Ej3B5");
    this.input = input;

    const mapa = new Map();
    mapa.set(0, " el rojo");
    mapa.set(1, " el azul");
    mapa.set(2, " el verde");
    mapa.set(3, " el amarillo");

    // Store the colors of obtuse triangles
    let obtuNames = new Set();
    let obtusangulos = 0;

    for (let i = 0; i < this.enunciado.length; i++) {
      let obtu_original = obtusangulos;

      let a = this.enunciado[i][0];
      let b = this.enunciado[i][1];
      let c = this.enunciado[i][2];

      // Calculate the squared lengths of the sides
      let sqLengthA = Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2);
      let sqLengthB = Math.pow(c[0] - b[0], 2) + Math.pow(c[1] - b[1], 2);
      let sqLengthC = Math.pow(a[0] - c[0], 2) + Math.pow(a[1] - c[1], 2);

      // Calculate the cosine of each angle
      let cosA = (sqLengthB + sqLengthC - sqLengthA) / (2 * Math.sqrt(sqLengthB * sqLengthC));
      let cosB = (sqLengthC + sqLengthA - sqLengthB) / (2 * Math.sqrt(sqLengthC * sqLengthA));
      let cosC = (sqLengthA + sqLengthB - sqLengthC) / (2 * Math.sqrt(sqLengthA * sqLengthB));

      // Check if any angle is greater than 90 degrees
      if (cosA < 0 || cosB < 0 || cosC < 0) {
        obtusangulos++;
      }

      // If a new obtuse triangle is found, add its color to the set
      if (obtu_original !== obtusangulos) {
        obtuNames.add(mapa.get(i));
      }
    }

    let formattedColors = [...obtuNames];

    // This code adds a "y" to the last color
    formattedColors.map((x, i) => {
      if (i === formattedColors.length - 1)
        return " y " + x.slice(1);
    });

    if (obtusangulos === parseInt(this.input[0])) {
      switch (obtusangulos) {
        case 0:
          this.explicacion.push(
            `¡Es correcto! Hay ${obtusangulos} triángulos obtusángulos en total.`
          );
          break;
        case 1:
          this.explicacion.push(
            `¡Es correcto! Hay ${obtusangulos} triángulo obtusángulo en total. El triángulo obtusángulo es${formattedColors}.`
          );
          break;
        default:
          this.explicacion.push(
            `¡Es correcto! Hay ${obtusangulos} triángulos obtusángulos en total. Los triángulos obtusángulos son${formattedColors}.`
          );
      }
    } else {
      switch (obtusangulos) {
        case 0:
          this.explicacion.push(
            `No es correcto. Hay ${obtusangulos} triángulos obtusángulos en total.`
          );
          break;
        case 1:
          this.explicacion.push(
            `No es correcto. Hay ${obtusangulos} triángulo obtusángulo en total. El triángulo obtusángulo es ${formattedColors}.`
          );
          break;
        default:
          this.explicacion.push(
            `No es correcto. Hay ${obtusangulos} triángulos obtusángulos en total. Los triángulos obtusángulos son ${formattedColors}.`
          );
      }
    }
  }
}

module.exports = B2Ej5;