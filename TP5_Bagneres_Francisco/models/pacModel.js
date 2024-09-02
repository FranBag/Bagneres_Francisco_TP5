const baseDatos = require("./conexionBD");

var metod = {}

metod.getAll = (callback)=>{ 
    query = `SELECT * FROM paciente`;
    baseDatos.query(query, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.getOne = (nro_historial_clinico, callback)=>{
    query = `SELECT * FROM paciente WHERE nro_historial_clinico = ?`;
    baseDatos.query(query, nro_historial_clinico, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.getNSS = (nss, callback)=>{
    query = `SELECT * FROM paciente WHERE nss = ?`;
    baseDatos.query(query, nss, (err, rows)=>{
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
        newDatos.nro_historial_clinico,
        newDatos.nss,
        newDatos.nombre,
        newDatos.apellido,
        newDatos.domicilio,
        newDatos.codigo_postal,
        newDatos.telefono,
        newDatos.observaciones
    ];

    query = `INSERT INTO paciente
    (nro_historial_clinico, nss, nombre, apellido, domicilio, codigo_postal, telefono, observaciones) VALUES
    (?, ?, ?, ?, ?, ?, ?, ?)`;

    baseDatos.query(query, datos, (err, rows)=>{
        if(err){

            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.deleteOne = (nro_historial_clinico, callback)=>{
    query = `UPDATE ingreso 
    SET nro_historial_paciente = NULL 
    WHERE nro_historial_paciente = ?`;
    query2 = `DELETE FROM paciente WHERE nro_historial_clinico = ?`;

    baseDatos.query(query, nro_historial_clinico, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            baseDatos.query(query2, nro_historial_clinico, (err, rows)=>{
                if(err){
                    callback(err);
                }else{
                    callback(undefined, rows);
                }
            });
        }
    });
}

metod.updateOne = (updatedDatos, nro_historial_clinico, callback)=>{
    datos =
    [       
        updatedDatos.nro_historial_clinico,
        updatedDatos.nss,
        updatedDatos.nombre,
        updatedDatos.apellido,
        updatedDatos.domicilio,
        updatedDatos.codigo_postal,
        updatedDatos.telefono,
        updatedDatos.observaciones,
        nro_historial_clinico
    ];
    query = `UPDATE paciente 
    SET nro_historial_clinico = ?, nss = ?, nombre = ?,
    apellido = ?, domicilio = ?, codigo_postal = ?,
    telefono = ?, observaciones = ?
    WHERE nro_historial_clinico = ?`;

    baseDatos.query(query, datos, (err, rows) =>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

module.exports = metod;