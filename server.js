const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do driver Neo4j
const driver = neo4j.driver(
  'bolt://localhost:7687', // Atualize conforme necessário (URI do banco)
  neo4j.auth.basic('neo4j', '') // Substitua pela senha configurada no Neo4j Desktop
);

const session = driver.session();

// Endpoint para consultar dados no banco de dados
app.get('/graph', async (req, res) => {
  try {
    const result = await session.run('MATCH (n)-[r]->(m) RETURN n, r, m');
    const records = result.records.map(record => ({
      nodeA: record.get('n').properties,
      relationship: record.get('r').type,
      nodeB: record.get('m').properties,
    }));
    res.json(records);
  } catch (error) {
    console.error('Erro ao consultar o Neo4j:', error);
    res.status(500).send('Erro interno no servidor');
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Fechar sessão e driver ao sair da aplicação
process.on('exit', () => {
  session.close();
  driver.close();
});
