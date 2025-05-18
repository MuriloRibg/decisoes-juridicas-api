from rdflib_neo4j import Neo4jStoreConfig, Neo4jStore, HANDLE_VOCAB_URI_STRATEGY
from rdflib import Graph

# Configuração da conexão com o Neo4j
auth_data = {
    'uri': "bolt://localhost:7687",
    'database': "neo4j",
    'user': "neo4j",
    'pwd': "@Dois5371"
}

# Configuração do armazenamento
config = Neo4jStoreConfig(
    auth_data=auth_data,
    handle_vocab_uri_strategy=HANDLE_VOCAB_URI_STRATEGY.IGNORE,
    batching=True
)

# Criação do grafo RDF
neo4j_graph = Graph(store=Neo4jStore(config=config))

# Importação dos dados RDF
file_path = 'import/outputFinal.rdf'
neo4j_graph.parse(file_path, format="xml")
neo4j_graph.close(True)
