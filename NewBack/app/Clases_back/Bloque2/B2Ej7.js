const EjGenerico = require('../EjGenerico.js');

class B2Ej7 extends EjGenerico {

    constructor(
        texto = 'Suma los siguientes dos ángulos, escribiendo en las cajas de texto grados, minutos y segundos:',
        enunciado = [
            `${Math.floor(Math.random() * 91)}º ${Math.floor(Math.random() * 59)}' ${Math.floor(Math.random() * 59)}"`,
            `${Math.floor(Math.random() * 91)}º ${Math.floor(Math.random() * 59)}' ${Math.floor(Math.random() * 59)}"`
        ], 
        puntuacion = 10
    ) {
        console.log("Ha entrado en constructor de Ej7 del bloque 2");
        super(
            'Bloque 2 - La medida',
            2.07, // 2.07 dice bloque 2 => ej 7
            texto,
            enunciado, 
            puntuacion
        );

        this.long_input=3;
        this.etiquetas= ["Segundos:", "Minutos:", "Grados:"]
        this.puntos_explicados = "Los grados, minutos y segundos deben ser los tres correctos para que el ejercicio puntúe con 10 puntos."
    }

    sumarAngulos(angulo1, angulo2) {
        // Sumar los segundos
        let segundos = angulo1[2] + angulo2[2];
        // Verificar si se exceden los 60 segundos
        let minutos = 0;
        if (segundos >= 60) {
          minutos = Math.floor(segundos / 60);
          segundos = segundos % 60;
        }
        // Sumar los minutos y el posible excedente de segundos
        minutos += angulo1[1] + angulo2[1];
        // Verificar si se exceden los 60 minutos
        let grados = 0;
        if (minutos >= 60) {
          grados = Math.floor(minutos / 60);
          minutos = minutos % 60;
        }
        // Sumar los grados y el posible excedente de minutos
        grados += angulo1[0] + angulo2[0];
        // Devolver el resultado en un array de 3 posiciones
        return [grados, minutos, segundos];
      }
      
      

    
    resolver(input) {
        console.log("He entrado en resolver un ejercicio 7 del bloque 2")
        this.input = input;
    
        const angulo1 = this.enunciado[0].replace(/[º'"]/g, '').split(' ').map(Number);
        console.log(angulo1)
        const angulo2 = this.enunciado[1].replace(/[º'"]/g, '').split(' ').map(Number);
        console.log(angulo2)
    
        this.resultado = this.sumarAngulos(angulo1, angulo2).map(x => x.toString())
        console.log(this.resultado) 
    
        this.explicacion = [];
        let contador = 0;
        let mensaje = ""
    
        // Feedback para los segundos
        if (this.input[0] === this.resultado[2]) {
            (angulo1[2]+angulo2[2]) > 60 ?
                mensaje = `¡Los segundos son correctos! La suma de segundos es ${angulo1[2]+angulo2[2]} y sobrepasa los 60, por lo que nos quedamos con el resto de la division de ${angulo1[2]+angulo2[2]} entre 60, obteniendo ${this.resultado[2]}". El cociente debemos sumarlo a los minutos.`
                :
                mensaje = `¡Los segundos son correctos! La suma de segundos es ${this.resultado[2]}".`
            this.explicacion.push(mensaje);
            contador++;
        } else {
            (angulo1[2]+angulo2[2]) > 60 ?
                mensaje = `Los segundos no son correctos. La suma de segundos es ${angulo1[2]+angulo2[2]} y sobrepasa los 60, por lo que nos quedamos con el resto de la division de ${angulo1[2]+angulo2[2]} entre 60, obteniendo ${this.resultado[2]}". El cociente debemos sumarlo a los minutos.`
                :
                mensaje = `Los segundos no son correctos. La suma de segundos es ${this.resultado[2]}".`
            this.explicacion.push(mensaje);
        }

        // Feedback para los minutos
        if (this.input[1] === this.resultado[1]) {
            this.resultado[1]!==(angulo1[1]+angulo2[1]) ? //si el resultado es distinto a la suma, nos hemos llevado una unidad desde los segundos
                mensaje = `¡Los minutos son correctos! La suma de minutos es ${angulo1[1]+angulo2[1]} y, en este caso, le sumamos un minuto extra que viene de la suma de segundos. Teniendo en cuenta lo mismo que en los segundos, obtenemos finalmente un total de ${this.resultado[1]} minutos."`
                :
                mensaje = `¡Los minutos son correctos! La suma de minutos es ${angulo1[1]+angulo2[1]}. Teniendo en cuenta lo mismo que en los segundos, obtenemos finalmente un total de ${this.resultado[1]} minutos."`
            this.explicacion.push(mensaje);
            contador++;
        } else {
            this.resultado[1]!==(angulo1[1]+angulo2[1]) ? //si el resultado es distinto a la suma, nos hemos llevado una unidad desde los segundos
                mensaje = `Los minutos no son correctos. La suma de minutos es ${angulo1[1]+angulo2[1]} y, en este caso, le sumamos un minuto extra que viene de la suma de segundos. Teniendo en cuenta lo mismo que en los segundos, obtenemos finalmente un total de ${this.resultado[1]} minutos."`
                :
                mensaje = `Los minutos no son correctos. La suma de minutos es ${angulo1[1]+angulo2[1]}. Teniendo en cuenta lo mismo que en los segundos, obtenemos finalmente un total de ${this.resultado[1]} minutos."`
            this.explicacion.push(mensaje);
        }

        // Feedback para los grados
        if (this.input[2] === this.resultado[0]) {
            this.resultado[0]!==(angulo1[0]+angulo2[0]) ? //si el resultado es distinto a la suma, nos hemos llevado una unidad desde los minutos
                mensaje = `¡Los grados son correctos! La suma de los grados es ${angulo1[2]+angulo2[2]} y, en este caso, le sumamos un grado extra que viene de los minutos, obteniendo ${this.resultado[0]} grados.`
                :
                mensaje = `¡Los grados son correctos! La suma da como resultado ${angulo1[2]+angulo2[2]} grados.`
            this.explicacion.push(mensaje);
            contador++;
        } else {
            this.resultado[0]!==(angulo1[0]+angulo2[0]) ? //si el resultado es distinto a la suma, nos hemos llevado una unidad desde los minutos
                mensaje = `Los grados no son correctos. La suma de grados es ${angulo1[2]+angulo2[2]} y, en este caso, le sumamos un grado extra que viene de los minutos, obteniendo ${this.resultado[0]} grados.`
                :
                mensaje = `Los grados no son correctos. La suma da como resultado ${angulo1[2]+angulo2[2]} grados.`
            this.explicacion.push(mensaje);
        }
    
        if (contador===3)
            this.nota = this.puntuacion;
    }
    
}

module.exports = B2Ej7;
