const EjGenerico = require('../EjGenerico.js');

class B2Ej2 extends EjGenerico {
  constructor(
    texto = "¿Cuántos de los siguientes triángulos son acutángulos?",
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
      3.02, // 3.05 dice bloque 3 => ej 2
      texto,
      enunciado,
      puntuacion
    );
    this.long_input = 1;
    this.etiquetas= ["Número de triángulos acutángulos:"]
    this.puntos_explicados = "La respuesta correcta proporciona 10 puntos."
  }
  resolver(input) {
    console.log("He entrado en resolver Ej3B2");
    this.input = input;

    const mapa = new Map();
    mapa.set(0, " el rojo");
    mapa.set(1, " el azul");
    mapa.set(2, " el verde");
    mapa.set(3, " el amarillo");

    // Guarda los colores de los que son acutangulos
    let acuteNames = new Set();
    let acutangulos = 0;

    for (let i = 0; i < this.enunciado.length; i++) {
      let acu_original = acutangulos;

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

      // Check if all three angles are less than 90 degrees
      if (cosA > 0 && cosB > 0 && cosC > 0) {
        acutangulos++;
      }

      // If a new acute triangle is found, add its color to the set
      if (acu_original !== acutangulos) {
        acuteNames.add(mapa.get(i));
      }
    }

    let formattedColors = [...acuteNames];

    // This code adds a "y" to the last color
    formattedColors.map((x, i) => {
      if (i === formattedColors.length - 1)
        return " y " + x.slice(1);
    });

    if (acutangulos === parseInt(this.input[0])) {
      switch (acutangulos) {
        case 0:
          this.explicacion.push(
            `¡Es correcto! Hay ${acutangulos} triángulos acutángulos en total.`
          );
          break;
        case 1:
          this.explicacion.push(
            `¡Es correcto! Hay ${acutangulos} triángulo acutángulo en total. El triángulo cuyos ángulos son todos menores de 90º es${formattedColors}.`
          );
          break;
        default:
          this.explicacion.push(
            `¡Es correcto! Hay ${acutangulos} triángulos acutángulos en total. Los triángulos cuyos ángulos son todos menores de 90º son${formattedColors}.`
          );
      }

      this.nota=this.puntuacion;

    } else {
      switch (acutangulos) {
        case 0:
          this.explicacion.push(
            `No es correcto. Hay ${acutangulos} triángulos acutángulos en total.`
          );
          break;
        case 1:
          this.explicacion.push(
            `No es correcto. Hay ${acutangulos} triángulo acutángulo en total. El triángulo cuyos ángulos son todos menores de 90º es${formattedColors}.`
          );
          break;
        default:
          this.explicacion.push(
            `No es correcto. Hay ${acutangulos} triángulos acutángulos en total. Los triángulos cuyos ángulos son todos menores de 90º son${formattedColors}.`
          );
      }
    }
  }
}

module.exports = B2Ej2;