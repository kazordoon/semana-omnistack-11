const request = require('supertest');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

const { ongData, incidentData } = require('../mock');

describe('Incident', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should return all incidents', async () => {  
    const response = await request(app)
      .get('/incidents')
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a new incident', async () => {
    const { body: createdOng } = await request(app)
      .post('/ongs')
      .send(ongData);

    const response = await request(app)
      .post('/incidents')
      .send(incidentData)
      .set('Authorization', createdOng.id);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should delete an incident', async () => {
    const { body: createdOng } = await request(app)
      .post('/ongs')
      .send(ongData);

    const { body: createdIncident } = await request(app)
      .post('/incidents')
      .send(incidentData)
      .set('Authorization', createdOng.id);

    const response = await request(app)
      .delete(`/incidents/${createdIncident.id}`)
      .set('Authorization', createdOng.id);

    expect(response.status).toBe(204);
  });

  it('should return an error when listing incidents', async () => {
    await connection.migrate.rollback();

    const response = await request(app)
      .get('/incidents');
    
    expect(response.status).toBe(500);
    expect(response.body.error).toHaveProperty('message');
  });

  it('should return an error when when trying to create a new incident with the wrong ONG ID', async () => {
    const response = await request(app)
      .post('/incidents')
      .send(incidentData)
      .set('Authorization', 'myfakeid');
    
    expect(response.status).toBe(406);
    expect(response.body.error).toHaveProperty('message');
  });

  it('should return an error when trying to delete an incident with an invalid ID', async () => {
    const { body: createdOng } = await request(app)
      .post('/ongs')
      .send(ongData);

    const response = await request(app)
      .delete('/incidents/1')
      .set('Authorization', createdOng.id);

    expect(response.status).toBe(404);
    expect(response.body.error).toHaveProperty('message');
  });

  it('should return an error when trying to delete an incident with an invalid ONG ID', async () => {
    const { body: createdOng } = await request(app)
      .post('/ongs')
      .send(ongData);

    // Create a new incident to access the incident page
    // otherwise an error will appear stating that the incident doesn't exist
    await request(app)
      .post('/incidents')
      .send(incidentData)
      .set('Authorization', createdOng.id);

    const response = await request(app)
      .delete('/incidents/1')
      .set('Authorization', 'myfakeid');

    expect(response.status).toBe(401);
    expect(response.body.error).toHaveProperty('message');
  });
});
