const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const ingModel = require("../models/ingModel");

app.get("/", mostrarTodo);
app.get("/:id_ingreso", mostrarUno);
app.get("/obtener/:nro_habitacion", mostrarHabitacion);
app.post("/crear", crearNuevo);
app.delete("/borrar", eliminar);
app.put("/modificar", modificarUno);

function mostrarTodo(req, res){
    ingModel.getAll((err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No hay ingresos en la base de datos.")
            }else{
                res.send(result);
            }
        }
    });
}

function mostrarUno(req, res){
    id_ingreso = req.params.id_ingreso;
    ingModel.getOne(id_ingreso, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No se ha encontrado un ingreso con ese ID.")
            }else{
                res.send(result);
            }
        }
    });
}

function mostrarHabitacion(req, res){
    nro_habitacion = req.params.nro_habitacion;
    ingModel.getHabitacion(nro_habitacion, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(JSON.stringify(result) == "[]"){
                res.send("No se han encontrado ingresos con esa habitación.")
            }else{
                res.send(result);
            }
        }
    });
}

function crearNuevo(req, res){
    ingModel.createNew(req.body, (err, result)=>{
        if(err){
            if(err.code == "ER_DUP_ENTRY"){
                res.send("Ya existe un ingreso con ese ID.")
            }else{
            res.send(err);
            }
        }else{
            res.send("Se ha cargado el ingreso correctamente.");
        }
    })
}

function eliminar(req, res){
    id_ingreso = req.query.id_ingreso
    ingModel.deleteOne(id_ingreso, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(result.affectedRows == 0){
                res.send("No se ha encontrado un ingreso con ese ID.");
                return;
            }else if(result.affectedRows == 1){
                res.send("Se eliminó el ingreso con el ID " + id_ingreso + " correctamente.");
                return;
            }
        }
    });
}

function modificarUno(req, res) {
    datosIngreso = req.body;
    id_ingreso = req.query.id_ingreso;
    ingModel.updateOne(datosIngreso, id_ingreso, (err, result)=>{
        if(err){
            res.send(err);
        }else{
            if(result.affectedRows == 0){
                res.send("No se ha encontrado un ingrseo con ese ID");
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