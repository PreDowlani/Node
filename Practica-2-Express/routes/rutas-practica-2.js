//ESTO ES ARRAY DE LOS DOCENTES !!!

const express = require("express");
const Joi = require("joi");
const router = express.Router();
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const docentes = [
  {
    id: 1,
    nombre: "Popo",
    apellidos: "Kami",
    email: "popo&kami@dbz.com",
    password: "popokami&dbz",
  },
  {
    id: 2,
    nombre: "Muten",
    apellidos: "Roshi",
    email: "muten-roshi@dbz.com",
    password: "tortise-academy",
  },
  {
    id: 3,
    nombre: "Whis",
    apellidos: "Beerus",
    email: "whisyBeerus@dbz.com",
    password: "losDosMaricas",
  },
  {
    id: 4,
    nombre: "Zeno",
    apellidos: "Zama",
    email: "zeno$zama@dbz.com",
    password: "zeno-el-niño-marica",
  },
];

router.get("/", (req, res) => {
  res.send(docentes);
});

router.get("/:id", (req, res) => {
  let idDocente = parseInt(req.params.id);
  const elDocente = docentes.find((docent) => {
    return docent.id === idDocente;
  });
  if (!elDocente) {
    res.status(404).send("Error! Usuario no encontrado");
  } else {
    res.status(200).send(elDocente);
  }
});

router.post("/", (req, res) => {
  const schema = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    apellidos: Joi.string().min(5).required(),
    email: Joi.string(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  });
  const validacion = schema.validate(req.body);
  console.log(validacion);
  if (validacion.error) {
    res.status(404).send(validacion.error.details[0].message);
    return;
  }
  const nuevoDocente = {
    id: docentes.length + 1,
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    email: req.body.email,
    password: req.body.password,
  };

  docentes.push(nuevoDocente);
  res.status(200).send(docentes);
});

router.put("/:id", (req, res) => {
  let idDocente = parseInt(req.params.id);
  const elDocente = docentes.find((docent) => {
    return docent.id === idDocente;
  });
  const schema2 = Joi.object({
    nombre: Joi.string().min(3).max(15).required(),
    apellidos: Joi.string().min(5).required(),
    email: Joi.string(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
  });
  const validacion2 = schema2.validate(req.body);
  console.log(validacion2);
  if (validacion2.error) {
    res.status(404).send(validacion2.error.details[0].message);
    return;
  }
  if (!elDocente) {
    res.status(404).send("No encontrado");
  } else {
    // Actualizamos los datos del DOCENTE !
    (elDocente.nombre = req.body.nombre),
      (elDocente.apellidos = req.body.apellidos),
      (elDocente.email = req.body.email),
      (elDocente.password = req.body.password);

    res.status(200).send(docentes);
  }
});

router.delete("/:id", (req, res) => {
  let idDocente = parseInt(req.params.id);
  const elDocente = docentes.find((docent) => {
    return docent.id === idDocente;
  });
  if (!elDocente) {
    res.status(404).send("Usuario no encontrado");
  } else {
    const eliminar = docentes.indexOf(elDocente);
    docentes.splice(eliminar, 1);
    res.status(200).send("Usuario eliminado");
  }
});

module.exports = router;
