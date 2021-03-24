//Framework hapi.js
const Hapi = require('hapi');

// Máquina e Porto Lógico
const host = 'localhost';
const port = process.env.PORT || 5000; 

// Criação do Servidor
const server = Hapi.Server({
    host: host,
    port: port
});

// Iniciar servidor
const init = async () => {

    await server.start();
    console.log("Server up on port: " + port);

}

require('./routes/routes')(server);

init();
