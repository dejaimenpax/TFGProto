const EjGenerico = require('../EjGenerico.js')

const divisible = (n, divisor) => {
    return n % divisor === 0 ?
        `${n} acaba en un múltiplo de ${divisor}, por lo que tenemos nuestro divisor.`
        :
        `incorrecto, ${n} no es divisible entre ${divisor}.`  
}

const obtener_divisores = (num) => {
    let values = new Set();
    const end = Math.floor(Math.sqrt(num));
    values.add(1);  // añadimos 1 ya que es divisor de cualquier número
  
    // iterar solo por los impares, excepto para 2
    const increment = num % 2 === 0 ? 1 : 2;
    for (let i = 2; i <= end; i += increment) {
      if (num % i === 0) {
        values.add(i);
        values.add(num / i);
      }
    }
  
    if (end * end === num) {  // añadimos la raíz cuadrada si es un divisor entero
      values.add(end);
    }
  
    return Array.from(values).sort((a, b) => a - b);
}


const generateRandomNumber = () => {
    let num;
    let numDivisors;
    
    do {
      num = Math.floor(Math.random() * (500000 - 8 + 1) + 8); //generamos un número aleatorio entre 8 y 500000
      numDivisors = obtener_divisores(num).length; // obtenemos la cantidad de divisores del número generado
    } while (numDivisors < 4); // repetimos el proceso mientras el número no tenga al menos 4 divisores
    
    return num;
  }
  
  


class B1Ej8 extends EjGenerico{

    constructor(
        texto = 'Escribe, ordenados de menor a mayor, los cuatro primeros divisores del siguiente número:', 
        enunciado = [generateRandomNumber().toString()], 
        puntuacion = 10
        ) 
    {
        console.log("Ha entrado en constructor de Ej8");
        super(
            'Bloque 1 - Números y operaciones',
            1.08, //1.08 dice bloque 1=> ej 8
            texto,
            enunciado,
            puntuacion
        )

        this.long_input=4;
        this.etiquetas= ["Primer divisor:", "Segundo divisor:", "Tercer divisor:", "Cuarto divisor:"]
    }

    
    resolver(input){
        this.input = input;
        const num = Number(this.enunciado[0]);
        const divisores = obtener_divisores(num);
        this.resultado.push(divisores);

        let contador = 0;
    
        for (let i = 0; i < 4; i++) {
            if (this.input[i] === divisores[i].toString()) {
                this.explicacion.push('¡Es correcto!');
                contador++;    
            } else {
                let feedback = '';
                switch (i) {
                    case 0:
                        feedback = 'El número 1 divide a todo número, por lo que siempre es divisor.';
                        break;
                    case 1:
                        if (num % 2 === 0) {
                            feedback = 'Un número es divisible por 2 si su última cifra es múltiplo de 2. Como la última cifra de ' + num + ' es ' + num % 10 + ', es divisible por 2 si el segundo número de la respuesta es ' + (divisores[1] / 2) + '.';
                        } else {
                            feedback = 'El número ' + divisores[1] + ' no es divisible por 2.';
                        }
                        break;
                    case 2:
                        if (divisores.reduce((a, b) => a + b, 0) % 3 === 0) {
                            feedback = 'Un número es divisible por 3 si la suma de sus cifras es múltiplo de 3. Como la suma de las cifras de ' + num + ' es ' + num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) + ', el tercer número de la respuesta debe ser 3.';
                        } else {
                            feedback = 'El número ' + divisores[2] + ' no es divisible por 3.';
                        }
                        break;
                    case 3:
                        feedback = 'El cuarto divisor se puede obtener dividiendo el número ' + num + ' entre el tercer divisor.';
                        break;
                }
                this.explicacion.push(feedback);
            }
        }

        if (contador===4)
            this.nota = this.puntuacion;
    }

}

module.exports = B1Ej8;
    