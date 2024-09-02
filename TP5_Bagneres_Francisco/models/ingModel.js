const baseDatos = require("./conexionBD");

var metod = {};

metod.getAll = (callback)=>{ 
    query = `SELECT * FROM ingreso`;

    query2 = `SELECT concat(apellido, ", ", nombre) as ApeNomPaciente FROM ingreso
    INNER JOIN paciente ON ingreso.nro_historial_paciente =  paciente.nro_historial_clinico ORDER BY ingreso.id_ingreso`;

    query3 = `SELECT concat(apellido, ", ", nombre) as ApeNomMedico FROM ingreso
    INNER JOIN medico ON ingreso.matricula_medico =  medico.matricula ORDER BY ingreso.id_ingreso`;

    baseDatos.query(query, (err1, rows)=>{
        if(err1){
            callback(err1);
        }else{
            AllIngresos = rows;
            baseDatos.query(query2, (err2, rows2)=>{
                if(err2){ 
                    callback(err2);
                    /*Utilizo muchos if-else anidados porque necesito
                    que las querys se ejecuten una después de la otra si o si.
                    Si las ejecuto solas me saldrán que las variables nombrePaciente y
                    nombreMedico son undefined debido al tiempo que tarda en consultar a la DB.*/
                }else{
                    nombrePaciente = rows2;
                    baseDatos.query(query3, (err3, rows3)=>{
                        if(err3){
                            callback(err3);
                        }else{
                            nombreMedico = rows3;
                            for(let i = 0; i < AllIngresos.length; i++){
                                AllIngresos[i].ApeNomPaciente = nombrePaciente[i].ApeNomPaciente;
                                AllIngresos[i].ApeNomMedico = nombreMedico[i].ApeNomMedico;
                            }
                            callback(undefined, AllIngresos);
                        }
                    });
                }
            });      
        }
    });
}

metod.getOne = (id_ingreso, callback)=>{
    query = `SELECT * FROM ingreso WHERE id_ingreso = ?`;

    query2 = `SELECT concat(apellido, ", ", nombre) as ApeNomPaciente FROM ingreso 
    INNER JOIN paciente ON ingreso.nro_historial_paciente =  paciente.nro_historial_clinico
    WHERE id_ingreso = ?`;

    query3 = `SELECT concat(apellido, ", ", nombre) as ApeNomMedico FROM ingreso
    INNER JOIN medico ON ingreso.matricula_medico =  medico.matricula
    WHERE id_ingreso = ?`;

    baseDatos.query(query, id_ingreso, (err1, rows)=>{
        if(err1){
            callback(err1);
        }else if(JSON.stringify(rows) == "[]"){
            callback(undefined, rows);
            
        }else{
            AllIngresos = rows;
            baseDatos.query(query2, id_ingreso, (err2, rows2)=>{
                if(err2){
                    callback(err2);
                }else{
                    AllIngresos[0].ApeNomPaciente = rows2[0].ApeNomPaciente;
                    baseDatos.query(query3, id_ingreso, (err3, rows3)=>{
                        if(err3){
                            callback(err3);
                        }else{
                            AllIngresos[0].ApeNomMedico = rows3[0].ApeNomMedico;
                            callback(undefined, AllIngresos);
                        }
                    });
                }
            });      
        }
    });
}

metod.getHabitacion = (nro_habitacion, callback)=>{
    query = `SELECT * FROM ingreso WHERE nro_habitacion = ?`;
    baseDatos.query(query, nro_habitacion, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.createNew = (newDatos, callback)=>{
    datos = [
        newDatos.id_ingreso,
        newDatos.fecha_ingreso,
        newDatos.nro_habitacion,
        newDatos.nro_cama,
        newDatos.observaciones,
        newDatos.nro_historial_paciente,
        newDatos.matricula_medico
    ];
    query = `INSERT INTO ingreso
    (id_ingreso, fecha_ingreso, nro_habitacion,
    nro_cama, observaciones, nro_historial_paciente,
    matricula_medico) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    baseDatos.query(query, datos, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.deleteOne = (id_ingreso, callback)=>{
    query = `DELETE FROM ingreso WHERE id_ingreso = ?`;
    baseDatos.query(query, id_ingreso, (err, rows)=>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

metod.updateOne = (updatedDatos, id_ingreso, callback)=>{
    datos = [
        updatedDatos.id_ingreso,
        updatedDatos.fecha_ingreso,
        updatedDatos.nro_habitacion,
        updatedDatos.nro_cama,
        updatedDatos.observaciones,
        updatedDatos.nro_historial_paciente,
        updatedDatos.matricula_medico,
        id_ingreso
    ];
    query = `UPDATE ingreso 
    SET id_ingreso = ?, fecha_ingreso = ?, nro_habitacion = ?,
    nro_cama = ?, observaciones = ?, nro_historial_paciente = ?,
    matricula_medico = ? 
    WHERE id_ingreso = ?`;

    baseDatos.query(query, datos, (err, rows) =>{
        if(err){
            callback(err);
        }else{
            callback(undefined, rows);
        }
    });
}

module.exports = metod;