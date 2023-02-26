const EjBloque3 = require('./EjBloque3')
//import EjBloque3 from './EjBloque3'

class Ej1 extends EjBloque3{

    // "Dibuja un triángulo con los vértices en las coordenadas ... y responde a las preguntas"
    constructor (texto, enunciado, puntuacion) {
        super(1.03, texto, enunciado, puntuacion) //1.03 dice bloque 1 => ej3_4
        //en el texto estan las coordenadas, en enunciado las preguntas
    }

    resolver(input) { //el input es de la forma 23700 23800
        this.input=input

        
    }
}


module.exports = Ej3_4
//export default Ej3_4