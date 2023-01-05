class EjGenerico {
    constructor (tema, id_tema, texto, enunciado, puntuacion, id) {
      this.tema=tema
      this.id_tema=id_tema
      this.texto=texto
      this.enunciado=enunciado
      this.input=' ' //el input lo mete resolver
      this.resultado=[] //array de la misma longitud que input
      this.explicacion=[] //array de la misma longitud que input
      this.puntuacion=puntuacion
      this.nota=0
      this.id=id
    }

    //Aux
    split_num(str){ //divide un string en un array de palabras que trasnforma a numeros
      return str.split(" ").map(x=>Number(x))
    }

    // Getters
    getResultado() {
      return this.resultado
    }

    getExplicacion(){
        return this.explicacion
    }

    getNota(){
        return this.nota
    }

    
}

export default EjGenerico
//module.exports = EjGenerico