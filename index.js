// 1º Creamos la instancia de express que va a escuchar y responder a las peticiones
const express = require("express");
const app = express();
const config = require("./config.js");

// 2º Traemos knex y lo configuramos
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
});
// 3º Tramos cors
const cors = require("cors");

// 4º Middlewares
app.use(express.json());
app.use(cors());

// 5º Validamos la informacion que llega a traves de los post
const Ajv = require("ajv");
const ajv = new Ajv();

// Definimos formato json
const schema = {
  type: "object",
  properties: {
    Title: { type: "string" },
    Author: { type: "string" },
    Year: { type: "string" },
    Image: { type: "string" },
    Sinopsis: { type: "string" },
    ID: { type: "integer" },
  },
  required: ["Title", "Author", "Year", "Sinopsis"],
  additionalProperties: false,
};
// Construimos validador para validar ese formato json
const validate = ajv.compile(schema);

// compobamos si el json que viene en el post cumple con el formato (schema)
const valid = validate(req.body);

// 6º Creamos metodos get y post

// Metodo get que devuelve todos los libros que existen
app.get("/books", async (req, res) => {
  try {
    const result = await knex.select("*").from("books");
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Metodo post para crear nuevo libro
app.post("/new", async (req, res) => {
  try {
    if (valid) {
      const newBook = {
        Title: req.body.Title,
        Author: req.body.Author,
        Year: req.body.Year,
        Image: req.body.Image,
        Sinopsis: req.body.Sinopsis,
      };
      await knex("books").insert(newBook);
      res.send({ ok: true, message: `Libro creado: ${newBook.Title}` });
    } else {
      throw new Error("La información no es correcta");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Metodo post para borrar libro a traves del id
app.post("/delete", async (req, res) => {
  try {
    await knex("books").where("ID", req.body.ID).del();
    res.send({ ok: true, message: "Libro borrado correctamente" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// Metodo post para actualizar un libro
app.post("/update", async (req, res) => {
  try {
    if (valid) {
      await knex("books").where("ID", req.body.ID).update({
        Title: req.body.Title,
        Author: req.body.Author,
        Year: req.body.Year,
        Image: req.body.Image,
        Sinopsis: req.body.Sinopsis,
      });
      res.send({ ok: true, message: "Libro actualizado correctamente" });
    } else {
      throw new Error("La información no es correcta");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

// 7º Hacemos que el servidor escuche las peticiones
app.listen(config.PORT, () => {
  console.log(`Books-api listening at http://localhost:${config.PORT}`);
});
