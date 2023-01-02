const EjBloque1 = require('./EjBloque1')

class Ej6 extends EjBloque1{
    constructor (texto, enunciado, input, puntuacion) {
        super(texto, enunciado,input,puntuacion)
        //enunciado no es el mismo que el texto, son numeros
    }

    obtenerResultado(){
        this.enunciado = split_num(this.enunciado)
        //divide primero cuando ve un "_" (cambio de fila) y luego por espacios
        this.input = this.input.split("_").map(sub_arr => split_num(sub_arr))
        //resultado: array de arrays [ [decenas, centenas, millares, decenas de millar], ...]

        const mapa = new Map()
        mapa.set(0,"decenas")
        mapa.set(1, "centenas")
        mapa.set(2, "unidades de millar")
        mapa.set(3, "decenas de millar")

        for (num in enunciado){
            this.resultado.push([
                Math.round(num/10)*10,
                Math.round(num/100)*100,
                Math.round(num/1000)*1000,
                Math.round(num/10000)*10000
            ])
            this.explicacion.push(["","","",""])
        }

        for (let fila=0; fila<this.input.length; fila++){
            for(let modo=0; modo<4; modo++){
                if (resultado[fila][modo]===input[fila][modo]){
                    explicacion[fila][modo]="¡Es correcto!"
                }
                else{

                    let columna = mapa.get(modo)
                    let aux = enunciado[fila].toString()
                    let derecha = Number(aux.charAt(aux.length-1 - modo))

                    let propuesta = resultado[fila][modo]
                    let conclusion = ""
                    if (derecha <5){
                        conclusion = "y como era menor que 5, el número que habíamos fijado sigue igual,"
                    }
                    else{
                        "y como era mayor o igual que 5, sumamos 1 al número que habíamos fijado,"
                    }

                    explicacion[fila][modo]=`No es correcto. Como estamos redondeando a las ${columna},
                    tenemos que fijar el número en esa posición y observar el número inmediatamente a su derecha.
                    En este caso, ese número de la derecha es un ${derecha}, por lo que lo convertimos a él
                    y a todos los de su derecha en 0, ${conclusion} obteniendo ${propuesta} `
                }
            }
        }
    }
}

module.exports = Ej6