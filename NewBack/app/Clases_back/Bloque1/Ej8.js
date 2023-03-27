const EjGenerico = require('../EjGenerico.js')

const divisible = (n, divisor) => {
    return n % divisor === 0 ?
        `${n} acaba en un múltiplo de ${divisor}, por lo que tenemos nuestro divisor.`
        :
        `${divisor} no es divisor.`  
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
  
  


class Ej8 extends EjGenerico{

    constructor(
        texto = 'Escribe, ordenados de menor a mayor, los cuatro primeros divisores del siguiente número:', 
        enunciado = [generateRandomNumber()], 
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
    }

    
    resolver(input){ //el input son los 4 candidatos a divisores en strings
        this.input=input
        const num = Number(this.enunciado[0])
        this.resultado.push(obtener_divisores(num))

        for (let i=0; i<4; i++){
            if (this.input[i]===this.resultado[i]){
                this.explicacion.push('¡Es correcto!')
            }
            else{
    
                let divisible_3 = ''
                this.enunciado[0].split('').reduce((a, b) => parseInt(a) + parseInt(b), 0) % 3 == 0 ?
                    divisible_3 = `es múltiplo de 3, por lo que colocamos al 3 y al ${num/3} como divisores.`
                    :
                    divisible_3 = `no es múltiplo de 3.`


                this.explicacion.push( //darle una vuelta a la explicacion porque no queda bien que todo este tocho de lecciones aparezca en cada línea
                    `No es correcto. Convendría aplicar criterios de divisibilidad. Entre ellos, tenemos el del 2, que nos dice `+
                    `que un número es divisible por dos si su última cifra es múltiplo de 2 (en otras palabras, si es 0 o par). En este caso, ${divisible(n,2)}\n`+
                    `Por otro lado, un número es divisible por tres si la suma de sus cifras es múltiplo de 3. En este caso, la suma de las cifras de ${n} ${divisible_3}\n`+
                    `Puede que nuestro número no cumpla ningún criterio y aún así queden divisisores por descubrir. ¡Toca hacer cuentas!`
                )
            }
        }
    }
}

module.exports = Ej8
