const baseDatos = require("./conexionBD");

var metod = {}

metod.getAll = (callback)=>{ 
    query = `SELECT * FROM medico`;
    baseDatos.query(query, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.getOne = (matricula, callback)=>{
    query = `SELECT * FROM medico WHERE matricula = ?`;
    baseDatos.query(query, matricula, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.getEspecialidad = (especialidad, callback)=>{
    query = `SELECT * FROM medico WHERE especialidad = ?`;
    baseDatos.query(query, especialidad, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.createNew = (newDatos, callback)=>{
    datos =
    [       
        newDatos.matricula,
        newDatos.nombre,
        newDatos.apellido,
        newDatos.especialidad,
        newDatos.observaciones
    ];
    query = `INSERT INTO medico
    (matricula, nombre, apellido, especialidad, observaciones) VALUES
    (?, ?, ?, ?, ?)`;

    baseDatos.query(query, datos, (err, rows)=>{
        if(err){

            callback(err);

        }else{
            callback(undefined, rows);
        }
    });
}

metod.deleteOne = (matricula, callback)=>{
    query = `UPDATE ingreso 
    SET matricula_medico = NULL 
    WHERE matricula_medico = ?`;
    query2 = `DELETE FROM medico WHERE matricula = ?`;

    baseDatos.query(query, matricula, (err1, rows)=>{
        if(err1){
            callback(err1);
        }else{
            baseDatos.query(query2, matricula, (err2, rows)=>{
                if(err2){
                    callback(err2);
                }else{
                    callback(undefined, rows);
                }
            });
        }
    });
}

metod.updateOne = (updatedDatos, matricula, callback)=>{
    datos = [
        updatedDatos.matricula,
        updatedDatos.nombre,
        updatedDatos.apellido,
        updatedDatos.especialidad,
        updatedDatos.observaciones,
        matricula
    ];
    query = `UPDATE medico 
    SET matricula = ?, nombre = ?, apellido = ?,
    especialidad = ?, observaciones = ? 
    WHERE matricula = ?`;

    baseDatos.query(query, datos, (err, rows) =>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

module.exports = metod;