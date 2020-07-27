const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //develoment, pois foi a configuração que escolhi no knexfile

module.exports = connection;