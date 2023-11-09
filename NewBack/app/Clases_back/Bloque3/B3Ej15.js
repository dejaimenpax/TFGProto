const EjGenerico = require('../EjGenerico.js');

class B3Ej15 extends EjGenerico {
  constructor(
    texto = "Calcula el perímetro del siguiente triángulo (puede ayudarte usar el Teorema de Pitágoras) y redondea el resultado al entero más cercano.",
    enunciado = [
      [
        [[-9,-8,-7,-6,-5,-4,-3,-2][Math.floor(Math.random() * 8)], -7],
        [[2,3,4,5,6,7,8,9][Math.floor(Math.random() * 7)], -7],
        [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9][Math.floor(Math.random() * 16)], [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)]]
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
    this.etiquetas= ["Perímetro (redondeado a la unidad):"]
    this.puntos_explicados = "La respuesta correcta proporciona 10 puntos."

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
      this.explicacion.push(`¡Es correcto! El perímetro se ha hallado sumando todos los lados. Hay un lado sencillo al estar los vértices (${a[0]},${a[1]}) y (${b[0]},${b[1]}) en la misma horizontal. Para el resto de lados, se puede calcular la distancia entre dos puntos del plano con una raiz cuadrada, siendo por ejemplo la distancia entre (${a[0]},${a[1]}) y (${c[0]},${c[1]}) igual a la raíz cuadrada de la suma de la distancia por eje al cuadrado: ((${a[0]})-(${c[0]}))² + ((${a[1]})-(${c[1]}))², obteniendo ${Math.sqrt( (a[0]-c[0])**2 + (a[1]-c[1])**2).toFixed(2)}.`);
      this.nota = this.puntuacion;
    } else {
      this.explicacion.push(`No es correcto. El perímetro del triángulo es ${perimetro}. Hay un lado sencillo al estar los vértices (${a[0]},${a[1]}) y (${b[0]},${b[1]}) en la misma horizontal. Para el resto de lados, se puede calcular la distancia entre dos puntos del plano con una raiz cuadrada, siendo por ejemplo la distancia entre (${a[0]},${a[1]}) y (${c[0]},${c[1]}) igual a la raíz cuadrada de la suma de la distancia por eje al cuadrado: ((${a[0]})-(${c[0]}))² + ((${a[1]})-(${c[1]}))², obteniendo ${ladoC.toFixed(2)}.`);
    }
  }
}

module.exports = B3Ej15;
