const EjGenerico = require('../EjGenerico.js');

class B3Ej9 extends EjGenerico {

  constructor(
    texto = "Calcula el área del siguiente triángulo, redondeada a la décima.",
    enunciado = [
      [
        [[-6,-5,-4,-3,-2][Math.floor(Math.random() * 5)], -7],
        [[2,3,4,5,6][Math.floor(Math.random() * 5)], -7],
        [[-9,-8,-7,7,8,9][Math.floor(Math.random() * 6)], [2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 8)]]
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
    this.etiquetas= ["Área:"]
    this.puntos_explicados = "La respuesta correcta proporciona 10 puntos."
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

    area = area.toFixed(1);
    if (/\.0+$/.test(area))
      area = parseFloat(area).toString()

    area = area.replace('.',',')

    let izquierda = a[0]<=b[0] ? a[0] : b[0]
    let derecha = a[0]>=b[0] ? a[0] : b[0]
    let mensaje = ''

    if (area === this.input[0]) {
      
      mensaje = `¡Es correcto! El área del triángulo se ha calculado aplicando la fórmula del área de un triángulo =  (base por altura) / 2. 
      <ol>\n 
        <li>La base se obtiene fácilmente con la distancia entre los puntos (${a[0]},${a[1]}) y (${b[0]},${b[1]}). Están en la misma horizontal, por lo que basta con restar la coordenada X del punto más a la derecha (${derecha})
        menos la coordenada X del punto más a la izquierda (${izquierda}) para calcular la distancia: ${derecha-izquierda} unidades.</li>\n 
        
        <li>La altura se obtiene midiendo la distancia (vertical) entre el tercer vértice (${c[0]},${c[1]}) y
        la base. Restamos para ello la coordenada Y del tercer vértice (${c[1]}) menos la coordenada Y de la base (${b[1]}), obteniendo ${c[1]-b[1]} unidades.</li>\n 
        
        <li>El resultado final se obtiene aplicando la fórmula con precisión de un decimal, obteniendo un área de ${area} unidades cuadradas.</li>\n 
      </ol>`

      this.nota = this.puntuacion;
    } else {

      mensaje = `No es correcto. El área del triángulo es ${area} unidades cuadradas y se ha calculado aplicando la fórmula del área de un triángulo =  (base por altura) / 2. 
      <ol>\n 
        <li>La base se obtiene fácilmente con la distancia entre los puntos (${a[0]},${a[1]}) y (${b[0]},${b[1]}). Están en la misma horizontal, por lo que basta con restar la coordenada X del punto más a la derecha (${derecha})
        menos la coordenada X del punto más a la izquierda (${izquierda}) para calcular la distancia: ${derecha-izquierda} unidades.</li>\n 
        
        <li>La altura se obtiene midiendo la distancia (vertical) entre el tercer vértice (${c[0]},${c[1]}) y
        la base. Restamos para ello la coordenada Y del tercer vértice (${c[1]}) menos la coordenada Y de la base (${b[1]}), obteniendo ${c[1]-b[1]} unidades.</li>\n 
        
        <li>El resultado final se obtiene aplicando la fórmula con precisión de un decimal, obteniendo un área de ${area} unidades cuadradas.</li>\n 
      </ol>`
    }


    this.explicacion.push(mensaje)
  }
}

module.exports = B3Ej9;
