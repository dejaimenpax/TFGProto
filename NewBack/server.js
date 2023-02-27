const express = require("express")
const cors = require("cors")
const dbConfig = require("./app/config/db.config")

const app = express()

var corsOptions = {
  origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(express.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

const db = require("./app/models") // cojo los modelos de mongoose
const Role = db.role

db.mongoose.set("strictQuery", false); //para evitar cambio en Mongoose 7

db.mongoose
  .connect(`mongodb+srv://tfg:${dbConfig.psw}@cluster1.ox2jmnh.mongodb.net/?retryWrites=true&w=majority`, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Se ha producido la conexión con MongoDB.");
    //initial();
  })
  .catch(err => {
    console.error("Error en la conexión con la base de datos.", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido a MatemAPIcas" });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/exercise.routes")(app);

// set port, listen for requests
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
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
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