const express = require('express');
const app = express();
const Sauce = require('./models/Sauce');

app.use(express.json());

app.post('/api/v1/sauce', (req, res) => {
  Sauce
    .insert(req.body)
    .then(sauce => res.send(sauce));
});

app.get('/api/v1/sauce', (req, res) => {
  Sauce
    .returnAll()
    .then(sauce => res.send(sauce));
});

app.get('/api/v1/sauce/:id', (req, res) => {
  Sauce
    .findById(req.params.id)
    .then(sauce => res.send(sauce));
});

app.put('/api/v1/sauce/:id', (req, res) => {
  Sauce
    .update(req.params.id, req.body)
    .then(sauce => res.send(sauce));
});

app.delete('/api/v1/sauce/:id', (req, res) => {
  Sauce
    .delete(req.params.id)
    .then(sauce => res.send(sauce));
});

module.exports = app;
