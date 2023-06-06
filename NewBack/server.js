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
    }
  });
}
*/