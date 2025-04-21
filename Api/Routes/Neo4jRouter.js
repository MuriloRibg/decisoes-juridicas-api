const router = require('express').Router();
const neo4jController = require('../Controllers/Neo4j/Neo4jControllers');

const uri = "/"

router
    .get(uri + "graph", neo4jController.getGraph)

module.exports = router;