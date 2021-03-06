const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    try {
      const ong_id = req.headers.authorization;

      const [ong] = await connection('ongs')
        .select('*').where({ id: ong_id });
      
      if (!ong) {
        const error = {
          message: "There's no ONG with the given ID",
        };
        return res.status(406).json({ error });
      }

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