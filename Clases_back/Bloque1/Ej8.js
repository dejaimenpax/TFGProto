const EjBloque1 = require('./EjBloque1.js')
//import EjBloque1 from './EjBloque1'

class Ej8 extends EjBloque1{
    //Escribe, ordenados de menos a mayor, los divisores de los siguientes números. Recuerda que hay dos números que son divisores de todos los números.
    constructor (texto, enunciado, puntuacion, id) {
        super(1.08, texto, enunciado, puntuacion, id) //1.08 dice bloque 1=> ej 8
        //texto es siempre el mismo
        //enunciado no es el mismo que el texto, son una serie de números separados por espacios
    }

    obtener_divisores(num){ //te devuelve los divisores en un string separados por espacios
        let values = []
        const end = Math.floor(Math.sqrt(num))

        for (let i=1; i<=end; i++) {
            if (num%i==0) {
                values.push(i)
                if (i*i!=num) {
                    values.push(num/i);
                }
            }
        }
        return values.sort((a,b)=>a-b).toString().replace(',', '/\s/g')
    }

    divisible(num, candidato){
        respuesta = ''
        num%candidato==0 ?
            respuesta = `${n} se puede dividir entre ${candidato}, dando como resultado ${Math.floor(n/candidato)}, por lo que ese cociente también es divisor.`
            :
            respuesta = `${n} no se puede dividir entre ${candidato}, ya que su última cifra es ${n.toString().slice(-1)}`
        return respuesta
    }

    resolver(input){ //el input es de la forma 1 2 3 4 6 12_ 1 2 3 4 6 12 24
        this.input=input

        const enunciado_aux = this.enunciado.split(" ").map(x=>Number(x))
        //array de numeros [10, 20, 16]
        const input_strings = this.input.split("_")

        enunciado_aux.forEach(num => {
            this.resultado.push(this.obtener_divisores(num))
        })
        //hasta aqui tengo un array de divisores

        for (let fila=0; fila<this.input_strings.length; fila++){
            if (input_strings(fila)===this.resultado(fila)){
                this.explicacion.push('¡Es correcto!')
            }
            else{
                const n = this.enunciado_aux(fila)

                let divisible_3 = ''
                n.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) % 3 == 0 ?
                    divisible_3 = `es múltiplo de 3, por lo que colocamos al 3 y al ${n/3} como divisores.`
                    :
                    divisible_3 = `no es múltiplo de 3.`


                this.explicacion.push( //darle una vuelta a la explicacion porque no queda bien que todo este tocho de lecciones aparezca en cada línea
                    `No es correcto. Hay varias formas de hacer este ejercicio, siendo una de las más eficientes aplicar criterios de divisibilidad. Algunos de los más conocidos son:\n`+
                    `* Al encontrar un divisor obtenemos dos por el precio de uno, ya que el cociente de esa división también es divisor\n` +
                    `* Un número es divisible por dos si su última cifra es múltiplo de 2 (en otras palabras, si es 0 o par). En este caso, ${divisible(n,2)}\n`+
                    `* Un número es divisible por tres si la suma de sus cifras es múltiplo de 3. En este caso, la suma de las cifras de ${n} ${divisible_3}\n`+
                    `* Un número es divisible por cinco si su última cifra es un 5 o un 0. En este caso, ${divisible(n,5)}\n` +
                    `* Un número es divisible por diez si su última cifra es un 0. En este caso, ${divisible(n,10)}\n` +
                    `Estos criterios no determinan todos los divisores. Puede que nuestro número no cumpla ninguno y aún así queden divisisores por descubrir. ¡Toca hacer cuentas!`
                )
            }
        }
    }
}

module.exports = Ej8
//export default Ej8