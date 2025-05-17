'use strict';

require('dotenv').config();

const host = process.env.HOST;

const userNeo4j = process.env.DB_USER_NEO4J;
const passwordNeo4j = process.env.DB_PASSWORD_NEO4J;

const neo4j = require('neo4j-driver');
const db = {}

// Configuração do driver Neo4j
const driver = neo4j.driver(`bolt://${host}:7687`,
    neo4j.auth.basic(userNeo4j, passwordNeo4j)
);

const userVirtuoso = process.env.DB_USER_VIRTUOSO;
const passwordVirtuoso = process.env.DB_PASSWORD_VIRTUOSO;

const url = `jdbc:virtuoso://${host}:1111/UID=${userVirtuoso}/PWD=${passwordVirtuoso}/CHARSET=UTF-8`;

db.driver = driver;
db.urlVirtuoso = url;

module.exports = db;
