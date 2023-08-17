const EjGenerico = require('../EjGenerico.js');

class B2Ej6 extends EjGenerico {

  constructor(
    texto = "Se acercan las fiestas del barrio y hay que preparar el confeti. "+
    "Solo tienes monedas de 1 euro para pagar, y te han encargado calcular cuántas monedas necesitas "+
    "darle al dependiente de la tienda para comprar cinta sabiendo que...",
    enunciado = [
      `El precio de la cinta es de ${Math.floor(Math.random() * (10 - 1)) + 1} euros el metro`,
      `Se quieren poder tirar ${Math.floor(Math.random() * (2000 - 100)) + 100} confetis`,
      `Para hacer cada confeti se necesitan ${Math.floor(Math.random() * (50 - 5)) + 5} mm de cinta`
    ],
    puntuacion = 10
  ) {
    console.log("Ha entrado en constructor de Ej6 del bloque 2");

    super(
      "Bloque 2 - La medida",
      2.06, // 2.06 dice bloque 2 => ej 6
      texto,
      enunciado,
      puntuacion
    );

    this.long_input=1;
    this.etiquetas= ["Número de monedas de un euro:"]
  }

  resolver(input) {
    console.log("He entrado en resolver un ejercicio 6 del bloque 2");
    this.input = input;

    const [precio, confetis, mmPorConfeti] = this.enunciado.map(x => parseInt(x.replace(/[^0-9]/g, '')))
    const metrosTotales = (confetis * mmPorConfeti) / 1000;
    const precioTotal = Math.ceil(metrosTotales * precio);

    if (this.input[0] === precioTotal.toString()) {
      this.explicacion.push(`¡Es correcto! Los pasos realizados han sido los siguientes: <ol>\n <li>Multiplicar los confetis que se quieren tirar por la medida de cada confeti en milímetros, obteniendo ${confetis * mmPorConfeti} mm.</li>\n <li>Pasar de milímetros a metros dividiendo entre 1000, obteniendo ${metrosTotales}</li>\n <li>Multiplicar estos metros por el precio por metro, obteniendo ${metrosTotales * precio}</li>\n <li>Redondear al entero mayor, obteniendo ${precioTotal}</li>\n </ol>`);
      this.nota = this.puntuacion;
    } else {
        const mensaje = `No es correcto. Los pasos a seguir son los siguientes: <ol>\n <li>Multiplicar los confetis que se quieren tirar por la medida de cada confeti en milímetros, obteniendo ${confetis * mmPorConfeti} mm.</li>\n <li>Pasar de milímetros a metros dividiendo entre 1000, obteniendo ${metrosTotales}</li>\n <li>Multiplicar estos metros por el precio por metro, obteniendo ${metrosTotales * precio}</li>\n <li>Redondear al entero mayor, obteniendo ${precioTotal}</li>\n </ol>`
      this.explicacion.push(mensaje);
    }
  }
}

module.exports = B2Ej6;
