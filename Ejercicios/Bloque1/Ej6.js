const EjBloque1 = require('./EjBloque1')

class Ej6 extends EjBloque1{
    constructor (texto, enunciado, input, puntuacion) {
        super(texto, enunciado,input,puntuacion)
        //enunciado no es el mismo que el texto, son numeros

        //this.puntuacion sera siempre divisible entre 4*cantidad de números

        this.enunciado = this.enunciado.split(" ").map(x=>Number(x))
        //divide primero cuando ve un "_" (cambio de fila) y luego por espacios
        this.input = this.input.split("_").map(sub_arr => sub_arr.split(" ").map(x=>Number(x)))
        //resultado: array de arrays [ [decenas, centenas, millares, decenas de millar], ...]

        const mapa = new Map()
        mapa.set(0,"decenas")
        mapa.set(1, "centenas")
        mapa.set(2, "unidades de millar")
        mapa.set(3, "decenas de millar")

        this.enunciado.forEach(num => {
            this.resultado.push([
                Math.round(num/10)*10,
                Math.round(num/100)*100,
                Math.round(num/1000)*1000,
                Math.round(num/10000)*10000
            ])
            this.explicacion.push(["","","",""])
        })

        for (let fila=0; fila<this.input.length; fila++){
            for(let modo=0; modo<4; modo++){
                if (this.resultado[fila][modo]===this.input[fila][modo]){
                    this.explicacion[fila][modo]="¡Es correcto!"
                    this.nota += this.puntuacion/this.enunciado.length/4
                }
                else{

                    let columna = mapa.get(modo)
                    let aux = enunciado[fila].toString()
                    let derecha = Number(aux.charAt(aux.length-1 - modo))

                    let propuesta = this.resultado[fila][modo]
                    let conclusion = ""
                    if (derecha < 5){
                        conclusion = "y como era menor que 5, el número que habíamos fijado sigue igual,"
                    }
                    else{
                        conclusion = "y como era mayor o igual que 5, sumamos 1 al número que habíamos fijado,"
                    }

                    this.explicacion[fila][modo]=`No es correcto. Como estamos redondeando a las ${columna}, \
tenemos que fijar el número en esa posición y observar el número inmediatamente a su derecha. \
En este caso, ese número de la derecha es un ${derecha}, por lo que lo convertimos a él \
y a todos los de su derecha en 0, ${conclusion} obteniendo ${propuesta}.`
                }
            }
        }


    }
}

module.exports = Ej6