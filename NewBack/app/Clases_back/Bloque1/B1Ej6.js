const EjGenerico = require('../EjGenerico.js')

class B1Ej6 extends EjGenerico {
    constructor(
        texto = 'Redondea el siguiente número a las decenas, las centenas, las unidades de millar y las decenas de millar.',
        enunciado = [Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString()],
        puntuacion = 10) 
    {
        super(
            'Bloque 1 - Números y operaciones',
            1.06, //1.06 dice bloque 1=> ej 6
            texto,
            enunciado,
            puntuacion
        )
        this.long_input=4;
        this.etiquetas= ["A las decenas:", "A las centenas:", "A las unidades de millar:", "A las decenas de millar:"]
        this.puntos_explicados = "Cada respuesta vale 2,5 puntos, valiendo el ejercicio 10 puntos."
    }

    resolver(input) { //el input es de cuatro cajas de texto, cada una con un numero de mínimo de 6 dígitos
        this.input = input

        const input_aux = this.input.map(x => Number(x))
        //resultado: array de Numeros

        const mapa = new Map()
        mapa.set(0, "decenas")
        mapa.set(1, "centenas")
        mapa.set(2, "unidades de millar")
        mapa.set(3, "decenas de millar")


        this.resultado.push(
            Math.round(this.enunciado[0] / 10) * 10,
            Math.round(this.enunciado[0] / 100) * 100,
            Math.round(this.enunciado[0] / 1000) * 1000,
            Math.round(this.enunciado[0] / 10000) * 10000
        )

        this.explicacion.push("", "", "", "")
        for (let modo = 0; modo < 4; modo++) {

            let derecha = Number(this.enunciado[0].charAt(this.enunciado[0].length - 1 - modo))

            if (this.resultado[modo] === input_aux[modo]) {
                this.explicacion[modo] = `¡Es correcto! Los pasos seguidos son los siguientes: <ol>\n  <li>Observa la cifra justo a la derecha de las ${mapa.get(modo)}. En este caso, esta cifra es un ${derecha}.</li>\n  <li>Si esa cifra es 5 o mayor aumenta en 1 las ${mapa.get(modo)} y pon ceros en todas las cifras a la derecha de las ${mapa.get(modo)}.</li>\n <li>Si la cantidad que tienes que aumentar en 1 es un 9, pon un cero y aumenta en 1 la cifra de su izquierda.</li>\n <li>Si esa cifra es 4 o más pequeña, deja las ${derecha} como están y pon ceros en todas las cifras de la derecha de las ${derecha}.</li>\n </ol>`;
                this.nota += this.puntuacion / 4 //cada apartado es 2.5
            } else {
                this.explicacion[modo] = `No es correcto. La respuesta correcta es ${this.resultado[modo]}. Los pasos seguidos son los siguientes: <ol>\n  <li>Observa la cifra justo a la derecha de las ${mapa.get(modo)}. En este caso, esta cifra es un ${derecha}.</li>\n  <li>Si esa cifra es 5 o mayor aumenta en 1 las ${mapa.get(modo)} y pon ceros en todas las cifras a la derecha de las ${mapa.get(modo)}.</li>\n <li>Si la cantidad que tienes que aumentar en 1 es un 9, pon un cero y aumenta en 1 la cifra de su izquierda.</li>\n <li>Si esa cifra es 4 o más pequeña, deja las ${derecha} como están y pon ceros en todas las cifras de la derecha de las ${derecha}.</li>\n </ol>`;
            }
        }
    }
}

module.exports = B1Ej6
//export default Ej6
