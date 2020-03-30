const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/database/connection');

describe('Session', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should return an ONG with the given ID', async () => {
    const data = {
      name: 'APAD',
      email: 'contato@apad.com.br',
      whatsapp: '4711111111',
      city: 'Rio do Sul',
      uf: 'SC',
    };

    const { body: { id } } = await request(app)
      .post('/ongs')
      .send(data);

    const response = await request(app)
      .post('/sessions')
      .send({ id });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(data.name);
  });

  it('should return an error when trying to find an ONG with an invalid ID', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({ id: 'invalidId123' });

    expect(response.status).toBe(400);
    expect(response.body.error).toHaveProperty('message');
  });
});
