const EjGenerico = require('../EjGenerico.js');

class B4Ej5_6 extends EjGenerico {

  constructor(
    texto = "Calcula la media, la moda y la mediana del siguiente conjunto de números, redondeadas a la décima:",
    enunciado = [Array.from({length: Math.floor(Math.random() * 2) + 15}, () => Math.floor(Math.random() * 11) + 10).join(' ')],
    puntuacion = 10
  ) {
    super(
      "Bloque 4 - Organización de la información",
      4.05, // 4.05 dice bloque 4 => ej 5
      texto,
      enunciado,
      puntuacion
    );
    this.long_input=3;
    this.etiquetas= ["Media:", "Moda (en caso de haber varias, basta con una de ellas):", "Mediana:"]
    this.puntos_explicados = "Contestar correctamente la media proporciona 3 puntos. La moda proporciona otros 3 puntos. Finalmente, la mediana suma 4 puntos."

  }

  resolver(input) {
    this.input = input;
  
    const numeros = this.enunciado[0].split(" ").map(num => parseInt(num));

    //Calculamos la media
    const suma = numeros.reduce((total, numero) => total + numero, 0)
    let media = (suma/numeros.length)

    media = media.toFixed(1);
    if (/\.0+$/.test(media))
      media = parseFloat(media).toString()
  
    media = media.replace('.',',')

    if (media === this.input[0]) {
      this.explicacion.push(`¡La media es correcta! Para calcularla, se debe dividir la suma de todos los números (${suma}) entre el número total de valores (${numeros.length}).`);
      this.nota += 3;
    } else {
      this.explicacion.push(`No es correcto. La media es ${media}. Para calcularla, se debe dividir la suma de todos los números (${suma}) entre el número total de valores (${numeros.length}).`);
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
        this.explicacion.push(`¡La moda es correcta! Por definición, es el número que más se repite. Los siguientes números se repiten ${maxFrecuencia} veces: ${modas.join(', ')}.`)
        :
        this.explicacion.push(`¡La moda es correcta! Por definición, es el número que más se repite. El número ${modas[0]} se repite ${maxFrecuencia} veces.`);
      this.nota += 3;
    } else {
      modas.length!==1 ?
        this.explicacion.push(`No es correcto. La moda es el número que más se repite, en este caso los siguientes números se repiten ${maxFrecuencia} veces: ${modas.join(', ')}.`)
        :
        this.explicacion.push(`No es correcto. La moda es el número que más se repite, en este caso es el ${modas[0]}, que se repite ${maxFrecuencia} veces.`)

    }

    // Calculamos la mediana
    const sortedNumeros = [...numeros].sort((a, b) => a - b);
    let mediana = -1
    if (numeros%2!==0)
      mediana = sortedNumeros[7]
    else
      mediana = ((sortedNumeros[7]+sortedNumeros[8])/2)


    mediana = mediana.toFixed(1);
    if (/\.0+$/.test(mediana))
      mediana = parseFloat(mediana).toString()
  
    mediana = mediana.replace('.',',')

    if (mediana === this.input[2]) {
      if (numeros.length % 2 !==0)
        this.explicacion.push(`¡La mediana es correcta! Para calcularla, se deben ordenar los números de menor a mayor y escoger el de la mitad (la octava posición).`);
      else
        this.explicacion.push(`¡La mediana es correcta! Para calcularla, se deben ordenar los números de menor a mayor y calcular la media de los dos números que quedan en medio (octava y novena posiciones).`);

      
      this.nota += 4;
    } else {
        if (numeros.length % 2 !==0)
          this.explicacion.push(`No es correcto. La mediana es ${mediana}. Para calcularla, se deben ordenar los números de menor a mayor y escoger el de la mitad (la octava posición).`);
        else
          this.explicacion.push(`No es correcto. La mediana es ${mediana}. Para calcularla, se deben ordenar los números de menor a mayor y calcular la media de los dos números que quedan en medio (octava y novena posiciones).`);
    }

  }
  
}

module.exports = B4Ej5_6;
