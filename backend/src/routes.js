const routes = require('express').Router();

// Controllers
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

// Validators
const incidentsValidator = require('./validators/incidents')();
const ongValidator = require('./validators/ongs')();
const profileValidator = require('./validators/profile')();
const sessionValidator = require('./validators/session')();

// Routes
routes.get('/ongs', OngController.index);

routes.post('/ongs', ongValidator, OngController.create);

routes.get('/incidents', incidentsValidator.listIncidents, IncidentController.index);
routes.post('/incidents', incidentsValidator.createIncidents, IncidentController.create);
routes.delete('/incidents/:id', incidentsValidator.deleteIncidents, IncidentController.delete);

routes.get('/profile', profileValidator, ProfileController.index);

routes.post('/sessions', sessionValidator, SessionController.create);

module.exports = routes;
