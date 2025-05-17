const router = require('express').Router();
const neo4jController = require('../Controllers/Neo4j/Neo4jControllers');

const uri = "/neo4j/";

router
    .get(uri + "graph", neo4jController.getGraph)
    .get(uri + "rede-juizes-processos", neo4jController.getRedeJuizesProcessos)
    .get(uri + "estados-advogados", neo4jController.getEstadosAdvogados)

module.exports = router;