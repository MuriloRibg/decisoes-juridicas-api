const db = require("../../Models/index");

class Neo4jControllers {
    static async getGraph(req, res) {
        try {
            const result = await db.session.run(`
                MATCH (n:Resource)
                RETURN n.uri, n
            `);

            const records = result.records.map(record => ({
                nodeA: record.get('n').propertiesÎ
            }));

            return res.status(200).json(records);
        } catch (err) {
            return res.status(500).json({error: err.message});
        } finally {
            await db.session.close();
        }
    }
}

module.exports = Neo4jControllers;