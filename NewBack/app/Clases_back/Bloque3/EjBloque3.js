const EjGenerico = require('../EjGenerico.js')
//import EjGenerico from '../EjGenerico.js'

class EjBloque2 extends EjGenerico{
    constructor (id_tema, texto, enunciado, puntuacion) {
        super("Bloque 3 - Formas Geométricas y orientación espacial",
            id_tema,
            texto, 
            enunciado,
            puntuacion)
    }
}

//export default EjBloque2
module.exports = EjBloque2