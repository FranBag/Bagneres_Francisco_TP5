const mysql = require("mysql");
const configuration = require("../config.json");
const connection = mysql.createConnection(configuration.database);

connection.connect((err) => {

    if(err){
        console.log(err);
    } else {
        console.log("Base de Datos conectada.")
    }

});

module.exports = connection
