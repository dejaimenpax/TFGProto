class Ej3_4 extends EjBloque1{
    constructor (enunciado, input, puntuacion) {
        super(enunciado,input,puntuacion)
        //enunciado es el mismo que el texto presentado en la pagina
    }

    // "Escribe 2/4 números distintos comprendidos entre Y y Z"
    obtenerResultado(){

        this.input = split_num(this.input)

        const palabras = text.split(" ")
        const cantidad = Number(palabras[1])
        const min = Number(palabras[6])
        const max = Number(palabras[8])

        const ejemplos = new Set() //conjunto para que no se repitan ejemplos aleatorios
        let lon_ej = ejemplos.size

        for (num in input){
            if (min<num && num<max) {
                this.nota += puntuacion/cantidad //Asumimos que puntuacion nos pasan un numero
                this.explicacion.push(`${num} es correcto.`)
            }
            else{
                //creamos ejemplo de numero
                let rand = 0
                while (lon_ej===ejemplos.size){
                    aux = (Math.random() * (max-1 - min+1 + 1)) + min+1
                    ejemplos.add(rand)
                }
                lon_ej++
                
                if (num<=min){
                    this.explicacion.push(`${num} es menor o igual que ${min}. Un ejemplo válido sería ${rand}.`)
                }
                else if (num>=max){
                    this.explicacion.push(`${num} es mayor o igual que ${min}. Un ejemplo válido sería ${rand}.`)
                }
            }
        }
    }

  }