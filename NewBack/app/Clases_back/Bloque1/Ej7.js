const EjGenerico = require('../EjGenerico.js')

const obtener_multiplos = (num, cantidad) => {
    let respuesta = []
    for (let i = 1; i <= cantidad; i++) {
      respuesta.push(num * i)
    }
    return respuesta
}
  

class Ej7 extends EjGenerico {
    constructor(
        texto = 'Escribe los 4 primeros múltiplos del siguiente números, sin contar al 0', 
        enunciado = [Math.floor(Math.random() * (24999 - 2 + 1) + 2).toString()], 
        puntuacion = 10
        ) 
    {
        console.log("Ha entrado en constructor de Ej7");
        super(
            'Bloque 1 - Números y operaciones',
            1.07, //1.07 dice bloque 1=> ej 7
            texto,
            enunciado,
            puntuacion
        )
    }

    resolver(input) { //el input es un array de 4 strings
        this.input = input

        const num = Number(this.enunciado[0])
        this.resultado.push(obtener_multiplos(num, 4)) //porque quiero los 4 primeros numeros


        for (let i = 0; i < 4; fila++) {
            if (this.input[i] === this.resultado[i]) {
                this.explicacion.push('¡Es correcto!')
            } else {
                this.explicacion.push(
                    `No es correcto. Has introducido ${this.input[i]}, cuando lo correcto sería ${this.resultado[i]} ` +
                    `Los primeros 4 múltiplos de ${num} se obtienen multiplicando dicho número ` +
                    `por los diferentes números del 1 en adelante. Así, ${num} multiplicado por 1 es ${num}` +
                    `ya que todo número multiplicado por él mismo es él mismo, ` +
                    `${num} por dos es ${num * 2}...\nUna buena forma de seguir multiplicando, si no recuerdas las tablas, es calcular la suma ` +
                    `del número del que te piden los múltiplos y del último múltiplo calculado. Así, ${num} por tres es lo mismo que ${n} ` +
                    `por dos más ${num} (obteniendo ${num * 3}).`
                )
            }
        }
    }
}

module.exports = Ej7
