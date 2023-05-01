const EjGenerico = require('../EjGenerico.js');

class B2Ej7 extends EjGenerico {

    constructor(
        texto = 'Suma los siguientes dos ángulos, escribiendo en las cajas de texto grados, minutos y segundos:',
        enunciado = [
            `${Math.floor(Math.random() * 91)}º ${Math.floor(Math.random() * 60)}' ${Math.floor(Math.random() * 60)}"`,
            `${Math.floor(Math.random() * 91)}º ${Math.floor(Math.random() * 60)}' ${Math.floor(Math.random() * 60)}"`
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
    
        // Feedback para los grados
        if (this.input[0] === this.resultado[0]) {
            this.explicacion.push('¡Los grados son correctos!');
        } else {
            const mensaje = `Los grados no son correctos. La suma es ${this.resultado[0]}º ${this.resultado[1]}' ${this.resultado[2]}", por lo que deberías haber escrito ${this.resultado[0]}`;
            this.explicacion.push(mensaje);
        }
    
        // Feedback para los minutos
        if (this.input[1] === this.resultado[1]) {
            this.explicacion.push('¡Los minutos son correctos!');
        } else {
            const mensaje = `Los minutos no son correctos. La suma es ${this.resultado[0]}º ${this.resultado[1]}' ${this.resultado[2]}", por lo que deberías haber escrito ${this.resultado[1]}`;
            this.explicacion.push(mensaje);
        }
    
        // Feedback para los segundos
        if (this.input[2] === this.resultado[2]) {
            this.explicacion.push('¡Los segundos son correctos!');
        } else {
            const mensaje = `Los segundos no son correctos. La suma es ${this.resultado[0]}º ${this.resultado[1]}' ${this.resultado[2]}", por lo que deberías haber escrito ${this.resultado[2]}`;
            this.explicacion.push(mensaje);
        }
    }
    

}

module.exports = B2Ej7;
