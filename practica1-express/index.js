const { json } = require("express");
const express = require("express");
const { valid } = require("joi");
const app = express();
let port = 5000;
const Joi = require("joi");

// VALIDAR SOLO EN POST Y PUT -- JOI

const deportistas = [
  {
    id: 1,
    nombre: "Rafa",
    apellidos: "NadaL",
    actividad: "Tennis",
    date: "06-25-1985", //Feach : MES-DIA-AÑO
    // from: "",
    // to: "",
  },
  {
    id: 2,
    nombre: "Fernando",
    apellidos: "Alonso",
    actividad: "Formula-1",
    date: "03-21-2012",
    // from: "",
    // to: "",
  },
  {
    id: 3,
    nombre: "Roger",
    apellidos: "Federer",
    actividad: "Tennis",
    date: "01-01-2020",
    // from: "",
    // to: "",
  },
  {
    id: 4,
    nombre: "Pre",
    apellidos: "Dowlani",
    actividad: "NINI",
    date: "04-15-1992",
    // from: "",
    // to: "",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido al Home Page del endpoint.");
});

app.get("/api/deportistas", (req, res) => {
  res.send(deportistas);
});

app.get("/api/deportistas/:id", (req, res) => {
  const idDepor = parseInt(req.params.id);
  indivDepor = deportistas.find((depor) => {
    return depor.id === idDepor;
  });
  if (!indivDepor) {
    res.status(404).send("Eroor!!!");
  } else {
    res.status(200).send(indivDepor);
  }
});

app.post("/api/deportistas", (req, res) => {
  const schema = Joi.object({
    nombre: Joi.string().min(4).required(),
    apellidos: Joi.string().min(4).required(),
    actividad: Joi.string().min(6).required(),
    date: Joi.date().greater("01-12-1995"),
    // from: Joi.date().required(),
    // to: Joi.date().greater(Joi.ref("from")).required(),
  });
  const validacion = schema.validate(req.body);
  if (validacion.error) {
    console.log(validacion.error.details[0].message);
    res.status(400).send(validacion.error.details[0].message);
    return;
  }
  const newUser = {
    id: deportistas.length + 1,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    actividad: req.body.actividad,
    date: req.body.date,
  };

  deportistas.push(newUser);
  res.status(200).send(deportistas);
});

app.put("/api/deportistas/:id", (req, res) => {
  const idDepor = parseInt(req.params.id);
  indivDepor = deportistas.find((depor) => {
    return depor.id === idDepor;
  });
  if (!indivDepor) {
    res.send(404).send("Error Usuario");
  } else {
    (indivDepor.nombre = req.body.nombre),
      (indivDepor.apellidos = req.body.apellidos),
      (indivDepor.actividad = req.body.actividad);
  }
  res.status(200).send(deportistas);
});

app.delete("/api/deportistas/:id", (req, res) => {
  const idDepor = parseInt(req.params.id);
  indivDepor = deportistas.find((depor) => {
    return depor.id === idDepor;
  });
  if (!indivDepor) {
    res.send(404).send("Error Usuario");
  } else {
    const posicion = deportistas.indexOf(indivDepor);
    deportistas.splice(posicion, 1);
    res.status(200).send("Deportista eliminado..");
  }
});

app.listen(port, () => console.log("Servidor Listing .."));
