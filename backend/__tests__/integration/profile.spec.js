const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/database/connection');

describe('Session', () => {
  let ongId;
  
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();

    const data = {
      name: 'APAD',
      email: 'contato@apad.com.br',
      whatsapp: '4711111111',
      city: 'Rio do Sul',
      uf: 'SC',
    };

    const response = await request(app)
      .post('/ongs')
      .send(data);

    ongId = response.body.id;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should return all incidents from the ONG that match with the given ID', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Authorization', ongId);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return an error when trying to get an ONG profile with an invalid ID', async () => {
    const response = await request(app)
      .get('/profile')
      .set('Authorization', 'myfakeid');

    expect(response.status).toBe(406);
    expect(response.body.error).toHaveProperty('message');
  });
});
