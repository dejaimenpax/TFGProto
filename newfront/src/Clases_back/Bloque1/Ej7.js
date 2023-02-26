const EjBloque1 = require('./EjBloque1.js')
//import EjBloque1 from './EjBloque1'

class Ej7 extends EjBloque1{
    //Escribe los 6 primeros múltiplos de los siguientes números. Recuerda que existe un número que es múltiplo de todos.
    constructor (texto, enunciado, puntuacion) {
        super(1.07, texto, enunciado, puntuacion) //1.06 dice bloque 1=> ej 7
        //texto es siempre el mismo
        //enunciado no es el mismo que el texto, son una serie de números separados por espacios
    }

   obtener_multiplos(num,cantidad){
    let respuesta = []
    for (let i=0;i<cantidad;i++){
        respuesta.push(num*i)
    }
    return respuesta
   } 

    resolver(input){ //el input es de la forma 0 3 6 9 12 15_0 4 8 12 15 18
        this.input=input 

        const enunciado_aux = this.enunciado.split(" ").map(x=>Number(x))
        //array de numeros [7,9,12,3]
        const input_strings = this.input.split("_")

        enunciado_aux.forEach(num => {
            this.resultado.push(this.obtener_multiplos(num,6)) //porque quiero los 6 primeros numeros
        })
        //hasta aqui tengo un array de multiplos

        for (let fila=0; fila<this.input_strings.length; fila++){
            if (input_strings(fila)===this.resultado(fila)){
                this.explicacion.push('¡Es correcto!')
            }
            else{
                const n = this.enunciado_aux(fila)

                this.explicacion.push(
                    `No es correcto. Has introducido ${this.input_strings(fila)}, cuando los múltiplos de ${n} son ` +
                    `${this.resultado(fila)}. Los primeros 6 múltiplos de ${n} se obtienen multiplicando dicho número ` +
                    `por los diferentes números del 0 en adelante. Así, ${n} multiplicado por 0 es 0 (el cero es múltiplo) ` +
                    `de cualquier número, ${n} multiplicado por 1 es ${n}, ya que todo número multiplicado por él mismo es él mismo, ` +
                    `${n} por dos es ${n*2}...\nUna buena forma de seguir multiplicando, si no recuerdas las tablas, es calcular la suma ` +
                    `del número del que te piden los múltiplos y dle último múltiplo calculado. Así, ${n} por tres es lo mismo que ${n} ` +
                    `por dos más ${n} (obteniendo ${n*3}).`
                )
            }
        }
    }
}

module.exports = Ej7
//export default Ej7