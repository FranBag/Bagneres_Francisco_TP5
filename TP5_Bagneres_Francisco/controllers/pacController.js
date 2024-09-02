const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const pacModel = require("../models/pacModel");

app.get("/", mostrarTodo);
app.get("/:nro_historial_clinico", mostrarUno);
app.get("/obtener/:nss", mostrarNSS);
app.post("/crear", crearNuevo);
app.delete("/borrar", eliminar);
app.put("/modificar", modificarUno);

function mostrarTodo(req, res){
    pacModel.getAll((err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No hay pacientes en la base de datos.")
            }else{
                res.send(result);
            }
        }
    });
}

function mostrarUno(req, res){
    nro_historial_clinico = req.params.nro_historial_clinico;
    pacModel.getOne(nro_historial_clinico, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No se ha encontrado un paciente con ese número de historial clínico.")
            }else{
                res.send(result);
            }
        }
    });
}

function mostrarNSS(req, res){
    nss = req.params.nss;
    pacModel.getNSS(nss, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No se han encontrado pacientes con ese número de seguridad social.")
            }else{
                res.send(result);
            }
        }
    });
}

function crearNuevo(req, res){
    pacModel.createNew(req.body, (err, result)=>{
        if(err){
            if(err.code == "ER_DUP_ENTRY"){
                res.send("Ya existe un paciente con ese número de historial clínico.")
            }else{
            res.send(err);
            }
        }else{
            res.send("Se ha creado el paciente correctamente.");
        }
    })
}

function eliminar(req, res){
    nro_historial_clinico = req.query.nro_historial_clinico
    pacModel.deleteOne(nro_historial_clinico, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(result.affectedRows == 0){
                res.send("No se ha encontrado un paciente con ese número de historial clínico.");
                return;
            }else if(result.affectedRows == 1){
                res.send("Se eliminó el paciente con el número de historial clínico " + nro_historial_clinico + " correctamente.");
                return;
            }
        }
    });
}

function modificarUno(req, res) {
    datosPaciente= req.body;
    nro_historial_clinico = req.query.nro_historial_clinico;
    pacModel.updateOne(datosPaciente, nro_historial_clinico, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(result.affectedRows == 0){
                res.send("No se ha encontrado un paciente con ese número de historial clínico");
                return
            }else if(result.affectedRows == 1 && result.changedRows == 0){
                res.send("No se ha modificado ningún campo.");
                return
            }else if(result.affectedRows == 1){
                res.send("Se ha realizado la modificación correctamente.");
                return
            }
        }
    })
}

module.exports = app;