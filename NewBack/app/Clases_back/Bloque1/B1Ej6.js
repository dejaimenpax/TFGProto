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
            if (this.resultado[modo] === input_aux[modo]) {
                this.explicacion[modo] = "¡Es correcto!"
                this.nota += this.puntuacion / 4
            } else {
                let aux = this.enunciado[0]
                let derecha = Number(aux.charAt(aux.length - 1 - modo))
                let conclusion = derecha < 5 ?
                    "y como era menor que 5, el número que habíamos fijado sigue igual,"
                    :
                    "y como era mayor o igual que 5, sumamos 1 al número que habíamos fijado,";

                this.explicacion[modo] = `No es correcto. Como estamos redondeando a las ${mapa.get(modo)}, ` +
                    `tenemos que fijar el número en esa posición y observar el número inmediatamente a su derecha. ` +
                    `En este caso, ese número de la derecha es un ${derecha}, por lo que lo convertimos a él ` +
                    `y a todos los de su derecha en 0, ${conclusion} obteniendo ${this.resultado[modo]}.`
            }
        }
    }
}

module.exports = B1Ej6
//export default Ej6
