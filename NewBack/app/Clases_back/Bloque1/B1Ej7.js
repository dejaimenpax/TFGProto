const EjGenerico = require('../EjGenerico.js');

const obtener_multiplos = (num, cantidad) => {
    let respuesta = [];
    for (let i = 1; i <= cantidad; i++) {
        respuesta.push(num * i);
    }
    return respuesta;
}

class B1Ej7 extends EjGenerico {
    constructor(
        texto = 'Escribe los 4 primeros múltiplos del siguiente número, sin contar el 0:', 
        enunciado = [Math.floor(Math.random() * (100 - 2 + 1) + 2).toString()], 
        puntuacion = 10
    ) {
        console.log("Ha entrado en constructor de Ej7");
        super(
            'Bloque 1 - Números y operaciones',
            1.07, //1.07 dice bloque 1=> ej 7
            texto,
            enunciado,
            puntuacion
        )
        this.long_input=4;
        this.etiquetas= ["Primer múltiplo:", "Segundo múltiplo:", "Tercer múltiplo:", "Cuarto múltiplo:"]
        this.puntos_explicados = "Cada respuesta vale 2.5, valiendo el ejercicio 10 puntos."
    }

    resolver(input) { //el input es un array de 4 strings
        this.input = input;
        const num = Number(this.enunciado[0]);
        this.resultado = obtener_multiplos(num, 4); //porque quiero los 4 primeros numeros
        let contador = 0;
        let ordinal = '';

        for (let i = 0; i < 4; i++) {
            const ordinales = ['primer', 'segundo', 'tercer', 'cuarto'];

            if (Number(this.input[i]) === this.resultado[i]) {

                ordinal = ordinales[i];

                this.explicacion.push(`¡Es correcto! El ${ordinal} múltiplo de ${num} es ${Number(this.input[i])}, ya que ${num} por ${i+1} es ${num*(i+1)}.`);
                contador++;
            } else {
                const mensaje = `No es correcto. Has introducido ${this.input[i]}. Para calcular el ${ordinales[i]} múltiplo hay que multiplicar ${num} por ${i+1}, obteniendo como resultado ${num*(i+1)}.`;
                this.explicacion.push(mensaje);
            }
        }

        this.nota = (this.puntuacion/4)*contador;
    }
}

module.exports = B1Ej7;