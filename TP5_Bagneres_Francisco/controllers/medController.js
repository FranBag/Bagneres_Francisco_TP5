const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const medModel = require("../models/medModel");


app.get("/", mostrarTodo);
app.get("/:matricula", mostrarUno);
app.get("/obtener/:especialidad", mostrarEspecialidad);
app.post("/crear", crearNuevo);
app.delete("/borrar", eliminar);
app.put("/modificar", modificarUno);


function mostrarTodo(req, res){
    medModel.getAll((err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No hay medicos en la base de datos.")
            }else{
                res.send(result);
            }
        }
    });
}

function mostrarUno(req, res){
    matricula = req.params.matricula;
    medModel.getOne(matricula, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No se ha encontrado un médico con esa matrícula.")
            }else{
                res.send(result);
            }
        }
    });
}

function mostrarEspecialidad(req, res){
    especialidad = req.params.especialidad;
    medModel.getEspecialidad(especialidad, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No se han encontrado medicos con esa especialidad.")
            }else{
                res.send(result);
            }
        }
    });
}

function crearNuevo(req, res){
    medModel.createNew(req.body, (err, result)=>{
        if(err){
            if(err.code == "ER_DUP_ENTRY"){
                res.send("Ya existe un médico con esa matrícula")
            }else{
            res.send(err);
            }
        }else{
            res.send("Se ha creado el medico correctamente.");
        }
    })
}

function eliminar(req, res){
    matricula = req.query.matricula
    medModel.deleteOne(matricula, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(result.affectedRows == 0){
                res.send("No se ha encontrado un médico con esa matrícula");
                return;
            }else if(result.affectedRows == 1){
                res.send("Se eliminó el médico con la matricula " + matricula + " correctamente.");
                return;
            }
        }
    });
}

function modificarUno(req, res) {
    datosMedico = req.body;
    matricula = req.query.matricula;
    medModel.updateOne(datosMedico, matricula, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(result.affectedRows == 0){
                res.send("No se ha encontrado un médico con esa matrícula");
                return;
            }else if(result.affectedRows == 1 && result.changedRows == 0){
                res.send("No se ha modificado ningún campo.");
                return;
            }else if(result.affectedRows == 1){
                res.send("Se ha realizado la modificación correctamente.");
                return;
            }
        }
    });
}

module.exports = app