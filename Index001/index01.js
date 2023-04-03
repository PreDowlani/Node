// index01.js
// endpoint /api/cursos
// endpoint /api/cursos/:id
const express = require("express");
const { debugPort } = require("process");
const app = express();
const port = 5000;
const router = express.Router;

app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
