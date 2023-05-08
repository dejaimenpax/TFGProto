const B1Ej6 = require("../Clases_back/Bloque1/B1Ej6");
const B1Ej3_4 = require("../Clases_back/Bloque1/B1Ej3_4");
const B1Ej7 = require("../Clases_back/Bloque1/B1Ej7");
const B1Ej8 = require("../Clases_back/Bloque1/B1Ej8");

const B2Ej2 = require("../Clases_back/Bloque2/B2Ej2");
const B2Ej5 = require("../Clases_back/Bloque2/B2Ej5");
const B2Ej6 = require("../Clases_back/Bloque2/B2Ej6");
const B2Ej7 = require("../Clases_back/Bloque2/B2Ej7");

const B4Ej1 = require("../Clases_back/Bloque4/B4Ej1");
const B4Ej4 = require("../Clases_back/Bloque4/B4Ej4");
const B4Ej5_6 = require("../Clases_back/Bloque4/B4Ej5_6");
const B4Ej8 = require("../Clases_back/Bloque4/B4Ej8");

exports.create = (req, res) => {
  const { id_tema } = req.body;
  let exercise;
  const randomNumber = Math.floor(Math.random() * 4);

  switch (id_tema) {
    case 1:
      switch (randomNumber) {
        case 0:
          exercise = new B1Ej3_4();
          break;
        case 1:
          exercise = new B1Ej6();
          break;
        case 2:
          exercise = new B1Ej7();
          break;
        case 3:
          exercise = new B1Ej8();
          break;
        default:
          // handle invalid randomNumber
      }
      break;
    case 2:
      switch (randomNumber) {
        case 0:
          exercise = new B2Ej2();
          break;
        case 1:
          exercise = new B2Ej5();
          break;
        case 2:
          exercise = new B2Ej6();
          break;
        case 3:
          exercise = new B2Ej7();
          break;
        default:
          // handle invalid randomNumber
      }
      break;
    case 3:

      break;
    case 4:
      switch (randomNumber) {
        case 0:
          exercise = new B4Ej1();
          break;
        case 1:
          exercise = new B4Ej5_6();
          break;
        case 2:
          exercise = new B4Ej4();
          break;
        case 3:
          exercise = new B4Ej8();
          break;
        default:
          // handle invalid randomNumber
      }
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

    let [bloque, tema] = exercise.id_tema.toString().split('.').map(Number)

    console.log(`El bloque del ejercicio es ${bloque} y el tema es ${tema}`)

    switch (bloque) {
      case 1:    
        switch (tema) {
          case 3:
          case 4:
            exAux = new B1Ej3_4(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 3 del bloque 1')
            break;
          case 6:
            exAux = new B1Ej6(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 6 del bloque 1')
            break;
          case 7:
            exAux = new B1Ej7(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 7 del bloque 1')
            break;
          case 8:
            exAux = new B1Ej8(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 8 del bloque 1')
            break;
          default:

        }
        break;
      case 2:
        switch (tema) {
          case 7:
            exAux = new B2Ej7(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 7 del bloque 2')
            break;
          case 2:
            exAux = new B2Ej2(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 2 del bloque 2')
            break; 
          case 5:
            exAux = new B2Ej5(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 5 del bloque 2')
            break;
          case 6:
            exAux = new B2Ej6(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 6 del bloque 2')
            break;
          default:

        }
        break;
      case 3:
        // handle case 3
        break;
      case 4:
        switch (tema) {
          case 1:
            exAux = new B4Ej1(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 1 del bloque 4')
            break;
          case 4:
            exAux = new B4Ej4(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 4 del bloque 4')
            break;
          case 5:
            exAux = new B4Ej5_6(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 5 del bloque 4')
            break;
          case 8:
            exAux = new B4Ej8(exercise.texto, exercise.enunciado, exercise.puntuacion);
            console.log('He creado un ejercicio 8 del bloque 4')
            break;
          default:

        }
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