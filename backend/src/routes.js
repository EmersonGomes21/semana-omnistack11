const express = require('express');
const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//GET: Busca informações
//POST: Cria informação
// PUT: Alterar informção
//DELETE: Deletar informações


/**
 * Tipos de parâmetros
 * 
 * Query Params: parametros nomeados enviados pela rota após o "?", que servem como filtros, paginação.
 * 
 * Route Params: utilizados para identificar recursos
 * Request Body: Corpo da requisição, utilizado para alterar ou criar recursos
 * 
 */
//ONGS
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//INCIDENTS
routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);
//Profile
routes.get('/profile', ProfileController.index);
//SESSION

routes.post('/sessions', SessionController.create);

module.exports = routes;