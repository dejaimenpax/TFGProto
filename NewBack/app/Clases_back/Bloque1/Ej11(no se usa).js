const EjBloque1 = require('./EjBloque1.js')
//import EjBloque1 from './EjBloque1'

class Ej11 extends EjGenerico{
    //El número 7/3, si se divide, es más de dos. Usando ese razonamiento di entre que numeros consecutivos están los siguientes números
    constructor (texto, enunciado, puntuacion) {
        super(1.11, texto, enunciado, puntuacion) //1.11 dice bloque 1=> ej 11
        //texto es siempre el mismo
        //enunciado no es el mismo que el texto, son una serie de números fraccionarios separados por espacios
    }


    

    obtener_fronteras(fraccionario){
        const arry_aux = fraccionario.toString().split('/').map(x => Number(x)) //te coge el numero y te lo divide en un array de dos posiciones
        arry_aux[0] = Math.floor(respuesta[0]) //primera posicion es frontera inferior
        arry_aux[1] = respuesta[0] + 1
        return [arry_aux[0].toString() + ' ' + arry_aux[1].toString(), arry_aux.map(x=>parseInt(x))] //devuelve ["7 3", [7,3]]
    }

    resolver(input){ //el input es de la forma 2 3_4 5_6 7
        this.input=input

        const enunciado_aux = this.enunciado.split(" ")
        //array de numeros fraccionarios [1/2, 7/3, 20/15]
        const input_strings = this.input.split("_")

        v_front = this.obtener_fronteras(num)[1]

        enunciado_aux.forEach(num => {
            this.resultado.push(this.obtener_fronteras(num)[0]) //le mete el string
        })
        //hasta aqui tengo un array de fronteras

        for (let fila=0; fila<this.input_aux.length; fila++){
            if (input_strings(fila)===this.resultado(fila)){
                this.explicacion.push('¡Es correcto!')
            }
            else{
                const n = this.enunciado_aux(fila)

                cifra_divisor = ''
                Number(v_front[0].slice(-1)) < v_front[1] ?
                    cifra_divisor = `la última cifra es menor, por lo que nos llevamos tantas cifras como haga falta.`
                    :
                    cifra_divisor = `la última cifra no es menor, por lo que tenemos que buscar un número que, multiplicándolo por ${v_front[1]}, se acerque a las cifras que hemos cogido.`

                this.explicacion.push(
                    `No es correcto. Vamos a hallar el resultado dividiendo ${v_front[0]} entre ${v_front[1]}. Para hacer la división en caja, recordemos `+
                    `que si la última cifra del dividendo es menor que el divisor, nos llevamos otra cifra del divisor. En este caso, ${cifra_divisor}` +
                    `Una vez tengamos nuestro cociente, obtenemos de paso los números consecutivos entre los que está nuestro número: como el cociente ` +
                    `es ${Math.floor(v_front[0]/v_front[1])}, los números consecutivos son ese y ${Math.floor(v_front[0]/v_front[1]) +1}.`
                )
            }
        }
    }
}

module.exports = Ej11
//export default Ej11