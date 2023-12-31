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
        this.puntos_explicados = "Responder correctamente los segundos proporciona 2 puntos. Responder correctamente segundos y minutos proporciona 6 puntos. Responder todo correctamente proporciona 10 puntos."
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
        let contador = [false, false, false]
        let mensaje = ""
    
        // Feedback para los segundos
        if (this.input[0] === this.resultado[2]) {
            (angulo1[2]+angulo2[2]) > 60 ?
                mensaje = `¡Los segundos son correctos! La suma de segundos es ${angulo1[2]+angulo2[2]} y sobrepasa los 60, por lo que nos quedamos con el resto de la división de ${angulo1[2]+angulo2[2]} entre 60, obteniendo ${this.resultado[2]} segundos. Y nos llevamos una, que deberemos sumar a los minutos.`
                :
                mensaje = `¡Los segundos son correctos! La suma de segundos es ${this.resultado[2]}".`
            this.explicacion.push(mensaje);
            contador[0] = true;
        } else {
            (angulo1[2]+angulo2[2]) > 60 ?
                mensaje = `Los segundos no son correctos. La suma de segundos es ${angulo1[2]+angulo2[2]} y sobrepasa los 60, por lo que nos quedamos con el resto de la división de ${angulo1[2]+angulo2[2]} entre 60, obteniendo ${this.resultado[2]} segundos. Y nos llevamos una, que deberemos sumar a los minutos.`
                :
                mensaje = `Los segundos no son correctos. La suma de segundos es ${this.resultado[2]}".`
            this.explicacion.push(mensaje);
        }

        // Feedback para los minutos
        if (this.input[1] === this.resultado[1]) {
            if ( angulo1[2]+angulo2[2] > 60 ) {// por aqui entra si nos llevabamos una
                if ((angulo1[1]+angulo2[1]+1) > 60)
                    mensaje = `¡Los minutos son correctos! La suma de minutos es ${angulo1[1]+angulo2[1]}, más el que nos llevamos, ${angulo1[1]+angulo2[1]+1}. Supera los 60, por lo que dividimos ${angulo1[1]+angulo2[1]+1} entre 60. El resto de la división es el resultado, ${this.resultado[1]} minutos. Y nos llevamos una, que deberemos sumar a los grados. `
                else   
                    mensaje = `¡Los minutos son correctos! La suma de minutos es ${angulo1[1]+angulo2[1]}, más el que nos llevamos, ${angulo1[1]+angulo2[1]+1}. Como no supera los 60, obtenemos los minutos.`
            }
            else { //aqui no nos hemos llevado 1
                if (angulo1[1]+angulo2[1] > 60) 
                    mensaje = `¡Los minutos son correctos! La suma de minutos es ${angulo1[1]+angulo2[1]}. Supera los 60, por lo que dividimos ${angulo1[1]+angulo2[1]} entre 60. El resto de la división es el resultado, ${this.resultado[1]} minutos. Y nos llevamos una, que deberemos sumar a los grados. `
                else   
                    mensaje = `¡Los minutos son correctos! La suma de minutos es ${angulo1[1]+angulo2[1]}. Como no supera los 60, obtenemos los minutos.`
            }
            
            this.explicacion.push(mensaje);
            contador[1] = true
        } else {
            if ( angulo1[2]+angulo2[2] > 60 ) { // por aqui entra si nos llevabamos una
                if ((angulo1[1]+angulo2[1]+1) > 60)
                    mensaje = `No es correcto. La suma de minutos es ${angulo1[1]+angulo2[1]}, más el que nos llevamos, ${angulo1[1]+angulo2[1]+1}. Supera los 60, por lo que dividimos ${angulo1[1]+angulo2[1]+1} entre 60. El resto de la división es el resultado, ${this.resultado[1]} minutos. Y nos llevamos una, que deberemos sumar a los grados. `
                else   
                    mensaje = `No es correcto. La suma de minutos es ${angulo1[1]+angulo2[1]}, más el que nos llevamos, ${angulo1[1]+angulo2[1]+1}. Como no supera los 60, obtenemos los minutos.`
            }
            else { //aqui no nos hemos llevado 1
                if (angulo1[1]+angulo2[1] > 60) 
                    mensaje = `No es correcto. La suma de minutos es ${angulo1[1]+angulo2[1]}. Supera los 60, por lo que dividimos ${angulo1[1]+angulo2[1]} entre 60. El resto de la división es el resultado, ${this.resultado[1]} minutos. Y nos llevamos una, que deberemos sumar a los grados. `
                else   
                    mensaje = `No es correcto. La suma de minutos es ${angulo1[1]+angulo2[1]}. Como no supera los 60, obtenemos los minutos.`
            }
            this.explicacion.push(mensaje);
        }

        // Feedback para los grados
        if (this.input[2] === this.resultado[0]) {
            ( angulo1[1]+angulo2[1] > 60  ) ? // por aqui entra si nos llevabamos una
                mensaje = `¡Los grados son correctos! La suma de los grados es ${angulo1[0]+angulo2[0]}, más el que nos llevábamos, ${this.resultado[0]} grados.`
                :
                mensaje = `¡Los grados son correctos! La suma da como resultado ${angulo1[0]+angulo2[0]} grados.`
            this.explicacion.push(mensaje);
            contador[2] = true
        } else { //aqui no nos hemos llevado 1
            (  angulo1[1]+angulo2[1] > 60  ) ? 
                mensaje = `Los grados no son correctos. La suma de los grados es ${angulo1[0]+angulo2[0]}, más el que nos llevábamos, ${this.resultado[0]} grados.`
                :
                mensaje = `Los grados no son correctos. La suma da como resultado ${angulo1[0]+angulo2[0]} grados.`
            this.explicacion.push(mensaje);
        }


        //Para casos improbables, como que acierte grados/minutos pero no segundos
        if (contador[2]&&!contador[0])
            this.explicacion[2] = this.explicacion[2].replace("¡Los grados son correctos!", "Has acertado los grados, pero los segundos no son correctos.");
        if (contador[1]&&!contador[0])
            this.explicacion[1] = this.explicacion[1].replace("¡Los minutos son correctos!", "Has acertado los minutos, pero los segundos no son correctos.");
    
        if (contador[0]&&contador[1]&&contador[2])
            this.nota=10
        else if (contador[0]&&contador[1])
            this.nota=6
        else if (contador[0])
            this.nota=2
        else
            this.nota=0
    }
    
}

module.exports = B2Ej7;
