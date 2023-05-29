const EjGenerico = require('../EjGenerico.js')

class B1Ej3_4 extends EjGenerico{
    constructor (texto, enunciado, puntuacion) {
        if (!texto && !enunciado && !puntuacion) {
            let min, max;
            do {
                min = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
                max = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
            } while (Math.abs(max - min) < 4);

            if (min > max) {
            [min, max] = [max, min]; // Swap values if min is greater than max
            }

            super(
                'Bloque 1 - Números y operaciones',
                1.03, //1.06 dice bloque 1=> ej 3
                `Escribe 4 números distintos comprendidos entre ${min} y ${max}`, 
                [min, max],
                10
            )
        } else {
            super(
                'Bloque 1 - Números y operaciones',
                1.03, //1.03 dice bloque 1=> ej 3
                texto, 
                enunciado,
                puntuacion
            )
        }

        this.long_input = 4;
    }

    resolver(input) {
        this.input = input;
        const numerosIngresados = new Set(); // Conjunto para almacenar los números ingresados

        const input_aux = this.input.map(x => Number(x));
        const min = Number(this.enunciado[0]);
        const max = Number(this.enunciado[1]);

        const ejemplos = new Set(); // Conjunto para que no se repitan ejemplos aleatorios
        let lon_ej = ejemplos.size;

        input_aux.forEach(num => {
            if (min < num && num < max && !numerosIngresados.has(num)) {
                this.nota += this.puntuacion / 4; // Cada apartado da 2.5
                this.explicacion.push(`¡Es correcto!`);
                this.resultado.push(num);
                numerosIngresados.add(num); // Agregamos el número ingresado al conjunto
            } else {
                // Creamos ejemplo de número
                let rand = 0;
                while (lon_ej === ejemplos.size) {
                    rand = Math.floor(Math.random() * (max - 1 - min + 1)) + min + 1;
                    ejemplos.add(rand);
                }
                lon_ej++;

                this.resultado.push(rand);

                if (num <= min) {
                    this.explicacion.push(`${num} es menor o igual que ${min}. Un ejemplo válido sería ${rand}.`);
                } else if (num >= max) {
                    this.explicacion.push(`${num} es mayor o igual que ${max}. Un ejemplo válido sería ${rand}.`);
                } else if (numerosIngresados.has(num)) {
                    this.explicacion.push(`El número ${num} ya ha sido ingresado. Un ejemplo válido sería ${rand}.`);
                }
            }
        });

        console.log(this.explicacion);
    }
}

module.exports = B1Ej3_4;
