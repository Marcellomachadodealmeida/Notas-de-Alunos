const express = require('express');
const routGet = express.Router();
const fs = require('fs');

routGet.get('/:id', (req, res) => {
  fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
    let json = JSON.parse(data);
    const FindGrade = json.grades.find((client) => {
      return client.id === parseInt(req.params.id);
    });
    res.send(FindGrade);
  });
});

module.exports = routGet;
