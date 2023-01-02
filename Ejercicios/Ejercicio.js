class Ejercicio {
    constructor (enunciado, puntuacion, respuesta, explicacion, id_tipo, tipo) {
      this.enunciado=enunciado
      this.puntuacion=puntuacion
      this.respuesta=respuesta
      this.explicacion=explicacion
      this.id_tipo=id_tipo
      this.tipo=tipo
    }
    // Getter
    get area() {
       return this.calcArea();
     }
    // Método
    calcArea () {
      return this.alto * this.ancho;
    }
  }