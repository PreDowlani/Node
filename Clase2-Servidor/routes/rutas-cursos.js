const express = require ('express');

const router = express.Router();

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

router.get('/', (req,res,next)=> {
    res.send('Aquí están los cursos');
})

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


module.exports = router

