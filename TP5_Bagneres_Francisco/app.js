const express = require("express");
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const config = require("./config.json");

const medController = require("./controllers/medController");
const pacController = require("./controllers/pacController")
const ingController = require("./controllers/ingController")

app.use("/api/medico", medController);
app.use("/api/paciente", pacController);
app.use("/api/ingreso", ingController);


app.use((req, res) => {
    res.status(404).send('Página no encontrada.');
});

app.listen(config.server.port, (err)=> {
    if(err){
        console.log(err);
        return;
    } else{
        console.log("Servidor funcionando correctamente bro.");
    }
});