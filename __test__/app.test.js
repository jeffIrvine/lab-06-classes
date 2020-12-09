const request = require('supertest');
const fs = require('fs').promises;
const app = require('../lib/app');
const pool = require('../lib/utils/pool');
const Sauce = require('../lib/models/Sauce');

describe('', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./data/setup.sql', 'utf-8'));
  });
  it('', async() => {
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

    
    it('', async() => {
      const sauce = await Sauce.insert({ color: 'red', type: 'mustard' });
    });
  });


});
