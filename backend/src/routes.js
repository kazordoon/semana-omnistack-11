const routes = require('express').Router();
const crypto = require('crypto');

const connection = require('./database/connection');

routes.get('/ongs', async (req, res) => {
  try {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  } catch (err) {
    const error = {
      message: "Couldn't list the ONGs",
    };
    return res.json({ error });
  }
});

routes.post('/ongs', async (req, res) => {
  try {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('hex');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.status(201).json({ id });
  } catch (err) {
    const error = {
      message: "Couldn't create an account",
    };
    return res.json({ error });
  }
});

module.exports = routes;
