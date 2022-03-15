const express = require('express');
const usuario = require('./routes/usuario')
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/myapp',{useNewUrlParser:true})
    .then(()=>console.log('Conexion exitosa'))
    .catch(err => console.log('Error en la conexion. '+err))
    
const port = 5000;
app.use(cors())

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
    })
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('combined'))
app.use('/api/usuarios',usuario);




app.listen(port,()=>{
    console.log('App runing in port '+port)
})
