const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');
require('dotenv').config();

const app = express();

const port = process.env.PORT;
const host = process.env.HOST;

const userNeo4j = process.env.DB_USER_NEO4J;
const passwordNeo4j = process.env.DB_PASSWORD_NEO4J;

const userVirtuoso = process.env.DB_USER_VIRTUOSO;
const passwordVirtuoso = process.env.DB_PASSWORD_VIRTUOSO;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do driver Neo4j
const driver = neo4j.driver(`bolt://${host}:7687`,
    neo4j.auth.basic(userNeo4j, passwordNeo4j)
);

const session = driver.session();

app.get('/graph', async (req, res) => {
    const session = driver.session();
    try {
        const result = await session.run(`
      MATCH (n:Resource)
      RETURN n.uri, n
    `);

        const records = result.records.map(record => ({
            nodeA: record.get('n').properties
        }));

        res.json(records);
    } catch (err) {
        res.status(500).json({error: err.message});
    } finally {
        await session.close();
    }
});

app.get('/virtuoso', async (req, res) => {
    const session = driver.session();
    try {
        const url = `jdbc:virtuoso://${host}:1111/UID=${userVirtuoso}/PWD=${passwordVirtuoso}/CHARSET=UTF-8`;
        const query = `
          WITH $url AS url
            CALL openlink.virtuoso_jdbc_connect(
              url,
              'SPARQL SELECT ?s ?p ?o WHERE { ?s ?p ?o } LIMIT 10',
              'r'
            ) YIELD value
            UNWIND value AS row
            RETURN row`;

        const result = await session.run(query, {url});
        const rows = result.records.map(r => r.get('row'));
        res.json(rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    } finally {
        await session.close();
    }
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://${host}:${port}`);
});

// Fechar sessão e driver ao sair da aplicação
process.on('exit', () => {
    session.close();
    driver.close();
});