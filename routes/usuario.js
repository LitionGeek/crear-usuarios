const express = require('express');
const ruta = express.Router();
const modelUsuario = require('../models/model_usuario');
const joi = require('joi')
const bcrypt = require('bcrypt')

const schemaValidation = joi.object({
    nombre:joi.string()
    .min(3)
    .max(15)
    .required(),
    password:joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
    email:joi.string()
    .email({minDomainSegments:2,tlds:{allow:['com','net','ar']}}),
})

ruta.post('/',(req,res)=>{
    let body = req.body;
    modelUsuario.findOne({email:body.email},(err,user)=>{
        if(user){
            return res.status(400).json({
                ok:false
            })
        }else{
            const {error,value} = schemaValidation.validateAsync({nombre: body.nombre, email: body.email})
            if(error){
                console.log('No se cumplio la validacion')
            }else{
                let resultado = crearUsuario(body);
                console.log(resultado);
                resultado.then(user=>{
                    console.log(user)
                    return res.json({
                        usuario:user
                    })
                })
            }
        }
    })
    console.log(body)

})

ruta.get('/g',(req,res)=>{
    res.status(200).json({
        ok:true
    });
})

async function crearUsuario(body){
    let usuario = new modelUsuario({
        email:body.email,
        nombre:body.nombre,
        password:bcrypt.hashSync(body.password,10),
        imagen:body.imagen
    })
    return await usuario.save();
}

module.exports = ruta;