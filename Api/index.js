const express = require('express');
const cors = require('cors');
const routes = require('./Routes/index')
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const host = process.env.HOST;

// Middleware
app.use(cors());
app.use(express.json());

routes(app);

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});

// Fechar sessão e driver ao sair da aplicação
process.on('exit', () => {
    session.close();
    driver.close();
});

module.exports = app