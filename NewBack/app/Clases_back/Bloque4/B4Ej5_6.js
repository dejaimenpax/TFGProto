const EjGenerico = require('../EjGenerico.js');

class B4Ej5_6 extends EjGenerico {

  constructor(
    texto = "Calcula la mediana y la moda del siguiente conjunto de números:",
    enunciado = [Array.from({length: 15}, () => Math.floor(Math.random() * 25) + 10).join(' ')],
    puntuacion = 10
  ) {
    super(
      "Bloque 4 - Organización de la información",
      4.05, // 4.05 dice bloque 4 => ej 5
      texto,
      enunciado,
      puntuacion
    );
    this.long_input=2;
    this.etiquetas= ["Mediana:", "Moda:"]
    this.puntos_explicados = "Cada respuesta vale 5 puntos, valiendo el ejercicio 10 puntos."

  }

  resolver(input) {
    this.input = input;
  
    const numeros = this.enunciado[0].split(" ").map(num => parseInt(num));
  
    // Calculamos la mediana
    const sortedNumeros = [...numeros].sort((a, b) => a - b);
    const mediana = sortedNumeros[7]
    if (mediana.toString() === this.input[0]) {
      this.explicacion.push(`¡La mediana es correcta! Para calcularla, se han ordenado los números de menor a mayor y se ha escogido el de la mitad (la octava posición).`);
      this.nota += this.puntuacion/2;
    } else {
      this.explicacion.push(`No es correcto. La mediana se puede hallar ordenando de menor a mayor y seleccionando el número que queda en el medio (la octava posición), obteniendo ${mediana}.`);
    }
  
    // Calculamos la moda
    const frecuencias = {};
    let maxFrecuencia = 0;
    numeros.forEach(num => {
      if (frecuencias[num]) {
        frecuencias[num]++;
      } else {
        frecuencias[num] = 1;
      }
      maxFrecuencia = Math.max(maxFrecuencia, frecuencias[num]);
    });
    const modas = Object.keys(frecuencias).filter(num => frecuencias[num] === maxFrecuencia);
    if (modas.includes(this.input[1])) {
      modas.length!==1 ?
        this.explicacion.push(`¡La moda es correcta! Es el número que más se repite, y los siguientes números se repiten ${maxFrecuencia} veces: ${modas.join(', ')}.`)
        :
        this.explicacion.push(`¡La moda es correcta! Es el número que más se repite, y el número ${modas[0]} se repite ${maxFrecuencia} veces.`);
      this.nota += this.puntuacion/2;
    } else {
      modas.length!==1 ?
        this.explicacion.push(`No es correcto. La moda es el número que más se repite, en este caso los siguientes números se repiten ${maxFrecuencia} veces: ${modas.join(', ')}. La moda se halla contando cuántas veces se repite cada número.`)
        :
        this.explicacion.push(`No es correcto. La moda es el número que más se repite, en este caso es el ${modas[0]}, que se repite ${maxFrecuencia} veces.`)

    }
  }
  
}

module.exports = B4Ej5_6;
