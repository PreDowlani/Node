const express = require("express");
const app = express();
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const port = 5000;
const test = require('./test');
const server = require('./server');
app.use(express.json());

const rutasDocente = require('./routes/rutas-practica-2')
const rutaCursos = require('./routes/rutas-todo')

app.use(helmet());
app.use(morgan());

app.use(test);
app.use(server);

app.use('/api/docentes',rutasDocente)
app.use('/api/cursos', rutaCursos)


app.listen(port,() =>{
    console.log(`Server listing through ${port}`)
})