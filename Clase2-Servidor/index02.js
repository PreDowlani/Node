// index02.js
// endpoint /api/cursos
// endpoint /api/cursos/:id
const express = require("express");
const app = express();
const Joi = require('joi');
const logger = require('./logger');
const auth = require('./auth');
const helmet = require('helmet');
const morgan = require('morgan');

const rutasCursos = require('./routes/rutas-cursos');

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

app.use(helmet());
app.use(morgan());
app.use(express.json());


app.use(logger); //ruta para el logger
app.use(auth);

app.use('/api/cursos', rutasCursos);

app.post("/api/cursos/", (req, res) => {
  const schema = Joi.object({
    curso: Joi.string().min(3).required(),
    docente:Joi.string().min(10).required(),
    precio: Joi.number().min(1000).max(10000).required()
  })
  const validacion = schema.validate(req.body);
  if(validacion.error) {
    console.log(validacion.error.details[0].message);
    res.status(400).send(validacion.error.details[0].message);
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

app.put('/api/cursos/:id', (req,res)=>  {
  let idCurso = parseInt(req.params.id);
  const elCurso = cursos.find((curso)=> {
    return curso.id === idCurso
  })
  // No existe?
  if(!elCurso) {
    res.status(404).send('Id de curso no encontrado ');
    return;
  } else {
    elCurso.curso = req.body.curso;
    elCurso.docente = req.body.docente;
    elCurso.precio = req.body.precio;
    // * Devolver al cliente el curso actualizado
    res.status(200).send(elCurso);
  }
  
})

app.delete('/api/cursos/:id', (req,res) => {
  let idCurso = parseInt(req.params.id);
  const elCurso = cursos.find((curso)=> {
    return curso.id === idCurso
  })
  // * Si no existe devolver 404
  if (!elCurso) {
    res.status(404).send("No hemos encontrado un curso con ese id");
    return;
  }
  const posicion = cursos.indexOf(elCurso);
  cursos.splice(posicion,1);
  res.status(200).send('Curso eliminado');
})

app.use((req,res,next) => {
  res.status(404);
  res.json({
    mensaje: 'Curso no encontrado'
  })
})

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});


// CORS
// helmet
// Morgan