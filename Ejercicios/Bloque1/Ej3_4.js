const EjBloque1 = require('./EjBloque1')

class Ej3_4 extends EjBloque1{


    // "Escribe 2/4 números distintos comprendidos entre Y y Z"
    constructor (texto, enunciado, input, puntuacion) {
        super(texto,enunciado,input,puntuacion)
        //enunciado es el mismo que el texto presentado en la pagina

        this.input = this.input.split(" ").map(x=>Number(x))

        const palabras = this.enunciado.split(" ")
        const cantidad = Number(palabras[1])
        const min = Number(palabras[6])
        const max = Number(palabras[8])

        const ejemplos = new Set() //conjunto para que no se repitan ejemplos aleatorios
        let lon_ej = ejemplos.size

        this.input.forEach(num => {
            if (min<num && num<max) {
                this.nota += puntuacion/cantidad //Asumimos que puntuacion nos pasan un numero
                this.explicacion.push(`${num} es correcto.`)
                this.resultado.push(num)
            }
            else{
                //creamos ejemplo de numero
                let rand=0
                while (lon_ej===ejemplos.size){
                    rand = Math.floor( (Math.random() * (max-1 - min+1 + 1)) + min+1 )
                    ejemplos.add(rand)
                }
                lon_ej++

                this.resultado.push(rand)
                
                if (num<=min){
                    this.explicacion.push(`${num} es menor o igual que ${min}. Un ejemplo válido sería ${rand}.`)
                }
                else if (num>=max){
                    this.explicacion.push(`${num} es mayor o igual que ${min}. Un ejemplo válido sería ${rand}.`)
                }
            }
        })
        
        

    }
}

module.exports = Ej3_4