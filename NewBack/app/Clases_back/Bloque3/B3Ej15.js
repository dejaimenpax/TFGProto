const EjGenerico = require('../EjGenerico.js');

class B3Ej15 extends EjGenerico {
  constructor(
    texto = "Calcula el perímetro del siguiente triángulo (puede ayudarte usar el Teorema de Pitágoras) y redondea el resultado al entero más cercano.",
    enunciado = [
      [
        [[-6,-5,-4,-3,-2][Math.floor(Math.random() * 5)], -7],
        [[2,3,4,5,6][Math.floor(Math.random() * 5)], -7],
        [[-9,-8,-7,7,8,9][Math.floor(Math.random() * 6)], [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)]]
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
    let mensaje = ''
    perimetro = Math.round(perimetro);

    let izquierda = a[0]<=b[0] ? a[0] : b[0]
    let derecha = a[0]>=b[0] ? a[0] : b[0]
    let ladoMayor = ladoB >= ladoC ? ladoB : ladoC

    let mensaje_aux = (ladoMayor===ladoB) ?
      `(${c[0]},${c[1]}) hasta  (${b[0]},${b[1]})`
      :
      `(${a[0]},${a[1]}) hasta  (${c[0]},${c[1]})`

    if (perimetro === parseInt(this.input[0])) {

      mensaje = `¡Es correcto! Los pasos a seguir son los siguientes: 
      <ol>\n 
        <li>Hay un lado sencillo al estar los vértices (${a[0]},${a[1]}) y (${b[0]},${b[1]}) en la misma horizontal. Basta con restar la coordenada X del punto más a la derecha (${derecha})
        menos la coordenada X del punto más a la izquierda (${izquierda}) para calcular la distancia: ${derecha-izquierda} unidades.</li>\n 
        <li>El lado que va desde ${mensaje_aux} es la hipotenusa de un triángulo. Podemos usar el Teorema de Pitágoras explicado: la distancia es la raíz cuadrada de la suma al cuadrado de los catetos, obteniendo la distancia de ${ladoMayor.toFixed(2).replace('.',',')} unidades.</li>\n 
        <li>El resultado final es la suma redondeada de los tres lados: ${derecha-izquierda}+${ladoB.toFixed(2).replace('.',',')}+${ladoC.toFixed(2).replace('.',',')}=${perimetro} unidades.</li>\n 
      </ol>`

      this.nota = this.puntuacion;
    } else {
      mensaje = `No es correcto. El perímetro redondeado del triángulo es ${perimetro}. Los pasos a seguir son los siguientes: 
      <ol>\n 
        <li>Hay un lado sencillo al estar los vértices (${a[0]},${a[1]}) y (${b[0]},${b[1]}) en la misma horizontal. Basta con restar la coordenada X del punto más a la derecha (${derecha})
        menos la coordenada X del punto más a la izquierda (${izquierda}) para calcular la distancia: ${derecha-izquierda} unidades.</li>\n 
        <li>El lado que va desde ${mensaje_aux} es la hipotenusa de un triángulo. Podemos usar el Teorema de Pitágoras explicado: la distancia es la raíz cuadrada de la suma al cuadrado de los catetos, obteniendo la distancia de ${ladoMayor.toFixed(2).replace('.',',')} unidades.</li>\n 
        <li>El resultado final es la suma redondeada de los tres lados: ${derecha-izquierda}+${ladoB.toFixed(2).replace('.',',')}+${ladoC.toFixed(2).replace('.',',')}=${perimetro} unidades.</li>\n 
      </ol>`
    }

    this.explicacion.push(mensaje);

  }
}

module.exports = B3Ej15;
