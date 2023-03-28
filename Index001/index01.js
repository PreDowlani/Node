// index01.js
// endpoint /api/cursos
// endpoint /api/cursos/:id
const express = require("express");
const { debugPort } = require("process");
const app = express();
const port = 5000;

const cursos = [
  {
    id: 1,
    curso: "Conceptos básicos GraphQL",
    docente: "Fran 'the Master' Dávila",
    precio: 5000,
  },
  {
    id: 2,
    curso: "Conceptos básicos de Docker",
    docente: "Fran 'the Master' Dávila",
    precio: 5000,
  },
  {
    id: 3,
    curso: "Master en Node.js",
    docente: "Fran 'the Master' Dávila",
    precio: 8000,
  },
];

app.use(express.json());

app.get("/api/cursos", (req, res) => {
  res.send(cursos);
});

app.get("/api/cursos/:id", (req, res) => {
  let idCurso = parseInt(req.params.id);
  const elCurso = cursos.find((curso) => {
    return curso.id === idCurso;
  });
  if (!elCurso) {
    res.status(404);
    res.send("No hemos encontrado un curso con ese id");
  } else {
    res.send(elCurso);
  }
});

app.post("/api/cursos/", (req, res) => {
  const nuevoCurso = {
    id: cursos.length + 1,
    curso: req.body.curso,
    docente: req.body.docente,
    precio: req.body.precio,
  };
  cursos.push(nuevoCurso);
  res.status(200).send(cursos);
});

app.put("/api/cursos/:id", (req, res) => {
  let idCurso = parseInt(req.params.id);
  const elCurso = cursos.find((curso) => {
    return curso.id === idCurso;
  });
  // No existe?
  if (!elCurso) {
    res.status(404).send("Id de curso no encontrado ");
    return;
  } else {
    elCurso.curso = req.body.curso;
    elCurso.docente = req.body.docente;
    elCurso.precio = req.body.precio;
    // * Devolver al cliente el curso actualizado
    res.status(200).send(elCurso);
  }
});

app.delete("/api/cursos/:id", (req, res) => {
  let idCurso = parseInt(req.params.id);
  const elCurso = cursos.find((curso) => {
    return curso.id === idCurso;
  });
  // * Si no existe devolver 404
  if (!elCurso) {
    res.status(404).send("No hemos encontrado un curso con ese id");
    return;
  }
  const posicion = cursos.indexOf(elCurso);
  cursos.splice(posicion, 1);
  res.status(200).send("Curso eliminado");
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
