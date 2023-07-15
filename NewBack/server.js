const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
const Exercise = db.exercise;

db.mongoose.set("strictQuery", false);

db.mongoose
  .connect(`mongodb+srv://tfg:${dbConfig.psw}@cluster1.ox2jmnh.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Se ha producido la conexión con MongoDB.");
  })
  .catch((err) => {
    console.error("Error en la conexión con la base de datos.", err);
    process.exit();
  });

/*
  app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a MatemAPI" });
});
*/

// Rutas API
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/exercise.routes")(app);
require("./app/routes/admin.routes")(app);

// Configurar ruta para devolver la página principal en todas las rutas no reconocidas
app.use(express.static(path.join(__dirname, "./build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//Crea tres roles
/*
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {

      /*
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
      

      new Role({
        name: "teacher"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'teacher' to roles collection");
      });


      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
*/


//Crea los ejercicios

/*
function initial() {

      //bloque 1
      new Exercise({
        name: 'Números dentro de un rango.',
        id_tema: 1.03,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      

      new Exercise({
        name: 'Redondear a distintas cifras.',
        id_tema: 1.06,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });


      new Exercise({
        name: 'Cálculo de múltiplos.',
        id_tema: 1.07,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      new Exercise({
        name: 'Cálculo de divisores.',
        id_tema: 1.08,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      //bloque 2
      new Exercise({
        name: 'Divisiones con unidades de volumen.',
        id_tema: 2.02,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      

      new Exercise({
        name: 'Cálculos con horas y minutos.',
        id_tema: 2.05,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });


      new Exercise({
        name: 'Cálculos con unidades monetarias.',
        id_tema: 2.06,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      new Exercise({
        name: 'Sumas numéricas de ángulos.',
        id_tema: 2.07,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });


      //bloque 3
      new Exercise({
        name: 'Triángulos acutángulos.',
        id_tema: 3.02,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      

      new Exercise({
        name: 'Triangulos obtusángulos.',
        id_tema: 3.05,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });


      new Exercise({
        name: 'Área de un triángulo dadas sus coordenadas.',
        id_tema: 3.09,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      new Exercise({
        name: 'Perímetro de un triángulo dadas sus coordenadas.',
        id_tema: 3.15,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      //bloque 4
      new Exercise({
        name: 'Diagramas de barras.',
        id_tema: 4.01,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
      

      new Exercise({
        name: 'Cálculo de porcentajes.',
        id_tema: 4.04,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });


      new Exercise({
        name: 'Cálculo de mediana y moda de una muestra.',
        id_tema: 4.05,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });

      new Exercise({
        name: 'Promedio, máximo y mínimo de una muestra.',
        id_tema: 4.08,
        flag_active: true
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
      });
}

*/