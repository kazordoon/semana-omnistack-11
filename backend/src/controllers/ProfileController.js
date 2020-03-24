const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    try {
      const ong_id = req.headers.authorization;

      const incidents = await connection('incidents')
        .select('*')
        .where({ ong_id });

      return res.json(incidents);
    } catch (err) {
      const error = {
        message: "Couldn't list the incident",
      };
      return res.status(406).json({ error });
    }
  }
}