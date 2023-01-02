class EjBloque1 {
    constructor (enunciado, input, puntuacion) {
      this.enunciado=enunciado
      this.input=input
      this.resultado=[] //array de la misma longitud que input
      this.explicacion=[] //array de la misma longitud que input
      this.puntuacion=puntuacion
      this.nota=0
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