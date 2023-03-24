const { json } = require("express");
const express = require("express");
const app = express();
let port = 5000;

const deportistas = [
  {
    id: 1,
    nombre: "Rafa",
    apellidos: "NadaL",
    actividad: "Tennis",
  },
  {
    id: 2,
    nombre: "Fernando",
    apellidos: "Alonso",
    actividad: "Formula-1",
  },
  {
    id: 3,
    nombre: "Roger",
    apellidos: "Federer",
    actividad: "Tennis",
  },
  {
    id: 4,
    nombre: "Pre",
    apellidos: "Dowlani",
    actividad: "NINI",
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
  const newUser = {
    id: deportistas.length + 1,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    actividad: req.body.actividad,
  };

  deportistas.push(newUser);
  res.status(200).send(deportistas);
});

app.listen(port, () => console.log("Servidor Listing .."));
