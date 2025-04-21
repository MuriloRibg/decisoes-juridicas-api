const db = require("../../Models/index");
const url = db.urlVirtuoso;

class VirtuosoController {

    static async getVirtuoso(req, res) {
        try {

            const query = `
              WITH $url AS url
                    CALL openlink.virtuoso_jdbc_connect(
                      url,
                      'SPARQL SELECT ?s ?p ?o WHERE { ?s ?p ?o } LIMIT 10',
                      'r'
                    ) YIELD value
                UNWIND value AS row
                RETURN row`;

            const result = await db.session.run(query, {url});
            const rows = result.records.map(r => r.get('row'));

            res.status(200).json(rows);

        } catch (err) {
            res.status(500).json({error: err.message});
        } finally {
            await db.session.close();
        }
    }
}

module.exports = VirtuosoController;