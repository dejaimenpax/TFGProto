const EjGenerico = require('../EjGenerico.js');

class B2Ej7 extends EjGenerico {

    constructor(
        texto = 'Suma los siguientes dos ángulos:',
        enunciado = [], 
        puntuacion = 10
    ) {
        console.log("Ha entrado en constructor de Ej9");
        super(
            'Bloque 1 - Números y operaciones',
            2.07, // 2.07 dice bloque 2 => ej 7
            texto,
            enunciado,
            puntuacion
        );
    
        // Generar dos ángulos aleatorios
        const grados1 = Math.floor(Math.random() * 91); // Entre 0 y 90 grados
        const minutos1 = Math.floor(Math.random() * 60);
        const segundos1 = Math.floor(Math.random() * 60);
        const grados2 = Math.floor(Math.random() * 91);
        const minutos2 = Math.floor(Math.random() * 60);
        const segundos2 = Math.floor(Math.random() * 60);
    
        // Guardar los ángulos en el enunciado
        this.enunciado.push(`${grados1}º ${minutos1}' ${segundos1}"`);
        this.enunciado.push(`${grados2}º ${minutos2}' ${segundos2}"`);
    }

    sumarAngulos(angulo1, angulo2, angulo3) {
        const segundos1 = this.convertirASegundos(angulo1);
        const segundos2 = this.convertirASegundos(angulo2);
        let totalSegundos = segundos1 + segundos2;

        if (totalSegundos < 0) {
            totalSegundos += 3600 * 12;
        }

        const grados = Math.floor(totalSegundos / 3600);
        totalSegundos %= 3600;
        const minutos = Math.floor(totalSegundos / 60);
        const segundos = totalSegundos % 60;
        return [grados, minutos, segundos];
    }

    convertirASegundos(angulo) {
        return angulo[0] * 3600 + angulo[1] * 60 + angulo[2];
    }

    
    resolver(input) {
        this.input = input;

        const angulo1 = this.enunciado[0].replace(/[º'"]/g, '').split(' ');
        const angulo2 = this.enunciado[1].replace(/[º'"]/g, '').split(' ');

        this.resultado.push(this.sumarAngulos(angulo1, angulo2).map(x => x.toString()))

        if (this.input[0] === this.resultado[0] && this.input[1] === this.resultado[1] && this.input[2] === this.resultado[2]) {
            this.explicacion.push('¡Es correcto!');
        } else {
            const mensaje = `No es correcto. La suma de los dos ángulos es ${this.resultado[0]}º ${this.resultado[1]}' ${this.resultado[2]}"`;
            this.explicacion.push(mensaje);
        }
    }

}

module.exports = B2Ej7;
