const db = require("../../Models/index");

class Neo4jControllers {
    static async getGraph(req, res) {
        const session = db.driver.session();
        try {
            const result = await session.run(`
               MATCH (p:JudicialProcess)-[:judicialProcessMediatesAppellant]->(appellant),
                      (p)-[:judicialProcessMediatesAppellee]->(appellee)
                RETURN p, appellant, appellee
                LIMIT 10
            `);

            const records = result.records.map(record => ({
                judicialProcess: record.get('p').properties,
                appellant: record.get('appellant').properties,
                appellee: record.get('appellee').properties
            }));

            return res.status(200).json(records);
        } catch (err) {
            return res.status(500).json({error: err.message});
        } finally {
            await session.close();
        }
    }

    static async getEstadosAdvogados(req, res) {
        const session = db.driver.session();
        try {
            const result = await session.run(`
            MATCH (ac:AttorneyCounsel)
            WHERE ac.OABRegistrationState IS NOT NULL AND ac.OABRegistrationState <> ""
            RETURN ac.OABRegistrationState AS state, count(ac) AS totalAttorneys
                ORDER BY totalAttorneys DESC`
            );
            const attorneysByState = result.records.map(record => ({
                state: record.get('state'),
                totalAttorneys: record.get('totalAttorneys').toNumber() // Converter para número
            }));

            res.json(attorneysByState);
        } catch (error) {
            console.error('Erro ao buscar advogados por estado:', error);
            res.status(500).json({error: 'Erro interno do servidor'});
        } finally {
            await session.close();
        }
    }

    static async getRedeJuizesProcessos(req, res) {
        const session = db.driver.session();
        try {
            const result = await session.run(`
                  MATCH (j:FederalJudge)-[r:federalJudgeMediatesJudicialProcess]->(p:JudicialProcess)
                  RETURN j.uri AS judgeId, j.label AS judgeName, 
                         p.uri AS processId, p.number AS processNumber,
                         type(r) AS relationshipType
                `);

            const nodes = [];
            const links = [];
            const addedNodes = new Set();

            result.records.forEach(record => {
                // Processar juízes
                const judge = {
                    id: record.get('judgeId'),
                    label: record.get('judgeName'),
                    type: 'judge'
                };

                if (!addedNodes.has(judge.id)) {
                    nodes.push(judge);
                    addedNodes.add(judge.id);
                }

                // Processar processos
                const processo = {
                    id: record.get('processId'),
                    label: record.get('processNumber'),
                    type: 'process'
                };

                if (!addedNodes.has(processo.id)) {
                    nodes.push(processo);
                    addedNodes.add(processo.id);
                }

                // Adicionar relacionamento
                links.push({
                    source: judge.id,
                    target: processo.id,
                    type: record.get('relationshipType')
                });
            });

            res.json({nodes, links});

        } catch (err) {
            return res.status(500).json({error: err.message});
        } finally {
            await session.close();
        }
    }
}

module.exports = Neo4jControllers;