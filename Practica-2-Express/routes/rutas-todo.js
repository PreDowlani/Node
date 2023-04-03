const express = require("express");
const router = express();
const Joi = require("joi")

//ESTE ES EL ARRAY DE LOS CURSOS !! 

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

router.get("/", (req, res) => {
  res.send(cursos);
});

router.get("/:id", (req, res) => {
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

router.post("/", (req, res) => {
  const schema = Joi.object({
    curso: Joi.string().min(5).max(15).required(),
    docente: Joi.string().min(5).required(),
    precio: Joi.number().min(1000).max(5000).required(),
})
const validacion = schema.validate(req.body);
if(validacion.error) {
    res.status(404).send(validacion.error.details[0].message);
    return
}
  const nuevoCurso = {
    id: cursos.length + 1,
    curso: req.body.curso,
    docente: req.body.docente,
    precio: req.body.precio,
  };
  cursos.push(nuevoCurso);
  res.status(200).send(cursos);
});

router.put("/:id", (req, res) => {
  const schema2 = Joi.object({
    curso: Joi.string().min(5).max(15).required(),
    docente: Joi.string().min(5).required(),
    precio: Joi.number().min(1000).max(5000).required(),
})
const validacion2 = schema2.validate(req.body);
console.log(validacion2)
if(validacion2.error){
    res.status(404).send(validacion2.error.details[0].message)
    return
} 
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
    res.status(200).send(cursos);
  }
});

router.delete("/:id", (req, res) => {
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

module.exports = router;
