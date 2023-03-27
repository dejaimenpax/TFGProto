const Ej6 = require("../Clases_back/Bloque1/Ej6");
const Ej3_4 = require("../Clases_back/Bloque1/Ej3_4");
const Ej7 = require("../Clases_back/Bloque1/Ej7");
const Ej8 = require("../Clases_back/Bloque1/Ej8");

exports.create = (req, res) => {
  const { id_tema } = req.body;
  let exercise;

  switch (id_tema) {
    case 1:
      const randomNumber = 0//Math.floor(Math.random() * 4);
      switch (randomNumber) {
        case 0:
          exercise = new Ej3_4();
          break;
        case 1:
          exercise = new Ej6();
          break;
        case 2:
          exercise = new Ej7();
          break;
        case 3:
          exercise = new Ej8();
          break;
        default:
          // handle invalid randomNumber
      }
      break;
    case 2:
      // handle case 2
      break;
    case 3:
      // handle case 3
      break;
    case 4:
      // handle case 4
      break;
    default:
      // handle invalid id_tema
  }
  res.json(exercise);
};



exports.resolve = (req, res) => {
    const { exercise, input } = req.body;

    console.log(`El ejercicio es ${JSON.stringify(exercise)}`)
    console.log(`El ejercicio es del tema ${exercise.id_tema}`)
    console.log(`El input es ${input}`)


    let exAux;

    const bloque = Math.floor(exercise.id_tema)
    const tema = exercise.id_tema*100 - bloque*100

    console.log(`El bloque del ejercicio es ${bloque} y el tema es ${tema}`)

    switch (bloque) {
      case 1:    
        switch (tema) {
          case 3:
          case 4:
            exAux = new Ej3_4(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 3')
            break;
          case 6:
            exAux = new Ej6(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 6')
            break;
          case 7:
            exAux = new Ej7(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 7')
          case 8:
            exAux = new Ej8(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 8')
            break;
          default:

        }
        break;
      case 2:
        // handle case 2
        break;
      case 3:
        // handle case 3
        break;
      case 4:
        // handle case 4
        break;
      default:
        // handle invalid id_tema
    }

    exAux.resolver(input);
    res.json(exAux);
  };


/*

const Ej6 = require("../Clases_back/Bloque1/Ej6");

exports.create = (req, res) => {
  const { id_tema } = req.body;
  const ex6 = new Ej6("Texto", "374583 298769", 40);
  res.json(ex6);
};

exports.resolve = (req, res) => {
  const { exercise, input } = req.body;
  const exAux = new Ej6(exercise.texto, exercise.enunciado, exercise.puntuacion);
  exAux.resolver(input);
  res.json(exAux);
};

*/