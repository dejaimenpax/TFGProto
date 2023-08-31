const EjGenerico = require('../EjGenerico.js');

class B3Ej9 extends EjGenerico {

  constructor(
    texto = "Calcula el área del siguiente triángulo (puede ayudarte usar el Teorema de Pitágoras), y redondea el resultado al entero más cercano.",
    enunciado = [
        [
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], -2],
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], -2],
            [[-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9].filter(n => n !== -1 && n !== 0 && n !== 1)[Math.floor(Math.random() * 13)], [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)]]
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
    this.etiquetas= ["Área (redondeada a unidades de área):"]
    this.puntos_explicados = "La respuesta correcta supone un 10 en el ejercicio."
  }

  resolver(input) {
    console.log("He entrado en resolver Ej3B9");
    this.input = input;

    let a = this.enunciado[0][0];
    let b = this.enunciado[0][1];
    let c = this.enunciado[0][2];

    let area = Math.abs(
      (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])) / 2
    );
    area = Math.round(area);

    if (area === parseInt(this.input[0])) {
      this.explicacion.push(`¡Es correcto! El área redondeada del triángulo, ${area}, se ha hallado multiplicando base por altura y dividiendo entre dos. La base se obtiene fácilmente con la distancia entre los puntos (${a[0]},${a[1]}) y (${b[0]}, ${b[1]}), mientras que para la altura basta con medir la distancia entre el tercer vértice (${c[0]}, ${c[1]}) y la base, obteniendo ${Math.abs(c[1]-a[1])} unidades.`);
      this.nota = this.puntuacion;
    } else {
      this.explicacion.push(`No es correcto. El área redondeada del triángulo es ${area}. Para calcular el área de un triángulo, se puede hallar multiplicando base por altura y dividiendo entre dos. La base se obtiene fácilmente con la distancia entre los puntos (${a[0]},${a[1]}) y (${b[0]}, ${b[1]}), mientras que para la altura basta con medir la distancia entre el tercer vértice (${c[0]}, ${c[1]}) y la base, obteniendo ${Math.abs(c[1]-a[1])} unidades.`);
    }
  }
}

module.exports = B3Ej9;
