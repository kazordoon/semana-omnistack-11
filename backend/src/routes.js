const routes = require('express').Router();

const OngController = require('./controllers/OngController');

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

module.exports = routes;
