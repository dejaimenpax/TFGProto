const EjGenerico = require('../EjGenerico.js');

class B3Ej15 extends EjGenerico {
  constructor(
    texto = "Calcula el perímetro redondeado a la décima del siguiente triángulo (puede ayudarte usar el Teorema de Pitágoras).",
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
    this.etiquetas= ["Perímetro:"]
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

    let perimetro = Number(ladoA.toFixed(2)) + Number(ladoB.toFixed(2)) + Number(ladoC.toFixed(2));
    let mensaje = ''
    perimetro = perimetro.toFixed(1);
    if (/\.0+$/.test(perimetro))
      perimetro = parseFloat(perimetro).toString()

    perimetro = perimetro.replace('.',',')

    let izquierda = a[0]<=b[0] ? a[0] : b[0]
    let derecha = a[0]>=b[0] ? a[0] : b[0]
    let hipotenusa = ladoB >= ladoC ? ladoB : ladoC
    let otro_cateto = ladoB < ladoC ? ladoB : ladoC

    let texto_hipotenusa = (hipotenusa===ladoB) ?
      `(${c[0]},${c[1]}) hasta  (${b[0]},${b[1]})`
      :
      `(${a[0]},${a[1]}) hasta  (${c[0]},${c[1]})`

    let otro_cateto_texto = (hipotenusa===ladoB) ?
    `(${a[0]},${a[1]}) hasta  (${c[0]},${c[1]})`
    :
    `(${c[0]},${c[1]}) hasta  (${b[0]},${b[1]})`

    if (perimetro === this.input[0]) {

      mensaje = `¡Es correcto! Se utiliza para la resolución el Toerema de Pitágoras, que demuestra que la hipotenusa al cuadrado es igual a la suma de los cuadrados de los catetos. Los pasos a seguir son los siguientes: 
      <ol>\n 
        <li>Hay un lado sencillo al estar los vértices (${a[0]},${a[1]}) y (${b[0]},${b[1]}) en la misma horizontal, se trata de un cateto. Basta con restar la coordenada X del punto más a la derecha (${derecha})
        menos la coordenada X del punto más a la izquierda (${izquierda}) para calcular la distancia: ${derecha-izquierda} unidades.</li>\n 
        <li>El lado que va desde ${texto_hipotenusa} es la hipotenusa del triángulo. Podemos usar el Teorema de Pitágoras explicado: la distancia es la raíz cuadrada de la suma al cuadrado de los catetos, obteniendo la distancia de ${hipotenusa.toFixed(2).replace('.',',')} unidades.</li>\n
        <li>El lado que va desde ${otro_cateto_texto} es el otro cateto del triángulo. Podemos usar el Teorema de Pitágoras explicado: la distancia es la raíz cuadrada de la diferencia entre el cuadrado de la hipotenusa y el cuadrado del otro cateto, obteniendo la distancia de ${otro_cateto.toFixed(2).replace('.',',')} unidades.</li>\n 
        <li>El resultado final es la suma de los tres lados: ${derecha-izquierda}+${ladoB.toFixed(2).replace('.',',')}+${ladoC.toFixed(2).replace('.',',')}=${perimetro} unidades.</li>\n 
      </ol>`

      this.nota = this.puntuacion;
    } else {
      mensaje = `No es correcto. El perímetro redondeado del triángulo es ${perimetro}. Se utiliza para la resolución el Toerema de Pitágoras, que demuestra que la hipotenusa al cuadrado es igual a la suma de los cuadrados de los catetos. Los pasos a seguir son los siguientes: 
      <ol>\n 
        <li>Hay un lado sencillo al estar los vértices (${a[0]},${a[1]}) y (${b[0]},${b[1]}) en la misma horizontal, se trata de un cateto. Basta con restar la coordenada X del punto más a la derecha (${derecha})
        menos la coordenada X del punto más a la izquierda (${izquierda}) para calcular la distancia: ${derecha-izquierda} unidades.</li>\n 
        <li>El lado que va desde ${texto_hipotenusa} es la hipotenusa del triángulo. Podemos usar el Teorema de Pitágoras explicado: la distancia es la raíz cuadrada de la suma al cuadrado de los catetos, obteniendo la distancia de ${hipotenusa.toFixed(2).replace('.',',')} unidades.</li>\n 
        <li>El lado que va desde ${otro_cateto_texto} es el otro cateto del triángulo. Podemos usar el Teorema de Pitágoras explicado: la distancia es la raíz cuadrada de la diferencia entre el cuadrado de la hipotenusa y el cuadrado del otro cateto, obteniendo la distancia de ${otro_cateto.toFixed(2).replace('.',',')} unidades.</li>\n 
        <li>El resultado final es la suma de los tres lados: ${derecha-izquierda}+${ladoB.toFixed(2).replace('.',',')}+${ladoC.toFixed(2).replace('.',',')}=${perimetro} unidades.</li>\n 
      </ol>`
    }

    this.explicacion.push(mensaje);

  }
}

module.exports = B3Ej15;
