const express = require('express');
// app.post()
// app.put()
// app.delete()

const app = express();

app.get('/', (req,res) => {
    res.send('respuesta desde el servidor');
})



app.listen(3000, ()=> console.log('servidor escuchando en puerto 3000'))
