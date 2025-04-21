const bodyParser = require('body-parser')
const cors = require('cors')
const virtuoso = require('./VirtuosoRouter')
const neo4j = require('./Neo4jRouter')

module.exports = app => {
    app.use(
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        cors(), virtuoso, neo4j
    )
}