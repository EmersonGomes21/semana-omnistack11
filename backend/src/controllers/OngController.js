const connection = require('../database/connection');
const crypto = require('crypto'); //para gerar uma striing aleatória ao id da ong

module.exports = {
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
    const id = crypto.randomBytes(4).toString('HEX'); // 4 bytes de string hexadecimais
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })
    return response.json({ id });
  },

async index(request, response) {
  const ongs = await connection('ongs').select('*');
  return response.json(ongs);
}

};