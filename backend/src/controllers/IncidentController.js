const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    try {
      const incidents = await connection('incidents').select('*');

      return res.json(incidents);
    } catch (err) {
      const error = {
        message: "Couldn't list the incidents",
      };
      return res.status(500).json(error);
    }
  },
  async create(req, res) {
    try {
      const { title, description, value } = req.body;
      const ong_id = req.headers.authorization;

      const data = { title, description, value, ong_id };

      const [id] = await connection('incidents').insert(data);
      
      return res.status(201).json({ id });
    } catch (err) {
      const error = {
        message: "Couldn't create a new incident",
      };
      return res.status(406).json(error);
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const ong_id = req.headers.authorization;

      const incident = await connection('incidents')
        .select('ong_id')
        .where({ id })
        .first();

      if (incident.ong_id !== ong_id) {
        const error = {
          message: 'Operation not permitted',
        };
        return res.status(401).json(error);
      }

      await connection('incidents')
        .delete()
        .where({ id });

      return res.sendStatus(204);
    } catch (err) {
      const error = {
        message: "Couldn't delete the incident",
      };
      return res.status(406).json(error);
    }
  }
}