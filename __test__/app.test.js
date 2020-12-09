const request = require('supertest');
const fs = require('fs').promises;
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Sauce = require('../lib/models/Sauce');

describe('app.js tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });


  it('creates a sauce via post', async() => {
    const response = await request(app)
      .post('/api/v1/sauce')
      .send({
        color: 'red',
        type: 'garlic'
      });

    expect(response).toEqual({
      id: 1,
      color: 'red',
      type: 'garlic'
    });
  });

    
  it('updates a sauce with put', async() => {
    const sauce = await Sauce.insert({ color: 'yellow', type: 'mustard' });

    const response = await request(app)
      .put(`/api/v1/sauce/${sauce.id}`)
      .send({
        color: 'yellow',
        type: 'mustard'
      });

    expect(response.body).toEqual({
      ...sauce,
      color: 'yellow',
      type: 'mustard'
    });
  });

  it('returns all sauces with get', async() => {
    const response = await request(app)
      .get('/api/v1/sauce');

    expect(response.body).toEqual([{
      id: 1,
      color: 'red',
      type: 'garlic'
    }]);
  });

  it('returns one sauce with get', async() => {
    const sauce = await Sauce.insert({ color: 'yellow', type: 'mustard' });

    const response = await request(app)
      .get(`/api/v1/sauce/${sauce.id}`);

    expect(response.body).toEqual(sauce);
  });


  it('removes one sauce with delete', async() => {
    const sauce = await Sauce.insert({ color: 'yellow', type: 'mustard' });

    const response = await request(app)
      .delete(`/api/v1/sauce/${sauce.id}`)
      .send({
        color: 'yellow', 
        type: 'mustard'
      });

    expect(response.body).toEqual({
      id: '1',
      color: 'red',
      type: 'garlic'
    });
  });



});
