const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    try {
      const { id } = req.body;

      const ong = await connection('ongs')
        .select('name')
        .where({ id })
        .first();
      
      if (!ong) {
        const error = {
          message: 'No ONG found with this ID',
        };
        return res.status(400).json({ error });
      }

      return res.json(ong);
    } catch (err) {
      const error = {
        message: "Couldn't login",
      };
      return res.status(401).json({ error });
    }
  }
}