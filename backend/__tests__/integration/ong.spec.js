const app = require('../../src/app');
const request = require('supertest');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should return all ONGs', async () => {
    let response = await request(app)
      .get('/ongs');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new ONG', async () => {
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

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('should return an error when trying to list the ONGs', async () => {
    await connection.migrate.rollback();

    const response = await request(app)
      .get('/ongs');

    expect(response.status).toBe(500);
    expect(response.body.error).toHaveProperty('message');
  });
});
