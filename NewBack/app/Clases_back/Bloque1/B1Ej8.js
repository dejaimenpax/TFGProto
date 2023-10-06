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
      num = Math.floor(Math.random() * (10000 - 8 + 1) + 8); //generamos un número aleatorio entre 8 y 500000
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
        this.puntos_explicados = "Para obtener los 10 puntos del ejercicio, todas las respuestas deben ser correctas."
    }

    
    resolver(input){
        this.input = input;
        const num = Number(this.enunciado[0]);
        const divisores = obtener_divisores(num);
        this.resultado.push(divisores);

        let contador = 0;
        let ordinal = '';
        const ordinales = ['primer', 'segundo', 'tercer', 'cuarto'];
    
        for (let i = 0; i < 4; i++) {
            if (this.input[i] === divisores[i].toString()) {
                ordinal = ordinales[i];

                this.explicacion.push(`¡Es correcto! El ${ordinal} divisor de ${num} es ${this.input[i]}, ya que es el ${ordinales[i]} número que, si hacemos con él la división entera de ${num}, da resto 0.`); 
            
            } else {
                let feedback = '';
                switch (i) {
                    case 0:
                        feedback = 'El número 1 divide a todo número, por lo que siempre es divisor.';
                        break;
                    case 1:
                        if (num % 2 === 0) {
                            feedback = `No es correcto. Sabemos que su última cifra es un número par, por lo que el segundo divisor es 2, y no ${this.input[i]}.`;
                        } else {
                            feedback = 'El número ' + this.input[i] + ` no es el segundo divisor de ${num}. La respuesta correcta es ${this.resultado[i]}, lo que se puede comprobar yendo en orden desde el anterior divisor y probando a dividir hasta que nos encontremos con una división con resto 0. `;
                        }
                        break;
                    case 2:
                        if (divisores.reduce((a, b) => a + b, 0) % 3 === 0) {
                            feedback = 'No es correcto. Sabemos que la suma de sus cifras es múltiplo de tres (en concreto es ' + num.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) + `, por lo que el tercer divisor es 3 y no ${this.input[i]}.`;
                        } else {
                            feedback = 'El número ' + this.input[i] + ` no es el tercer divisor de ${num}. La respuesta correcta es ${this.resultado[i]}, lo que se puede comprobar yendo en orden desde el anterior divisor y probando a dividir hasta que nos encontremos con una división con resto 0. `;
                        }
                        break;
                    case 3:
                        feedback = `No es correcto. La manera más sencilla de obtener el cuarto divisor es dividir nuestro número, ${num}, entre el tercer divisor (${this.divisores(2)} en este caso), obteniendo ${this.divisores(i)} .`;
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
    