const express = require('express');
const Routtop3 = express.Router();
const fs = require('fs');

Routtop3.get('/:subject/:type', (req, res) => {
  fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
    try {
      let json = JSON.parse(data);
      const FindGrade = json.grades.filter((client) => {
        return client.subject === req.params.subject;
      });
      const FindSubject = FindGrade.filter((sub) => {
        return sub.type === req.params.type;
      });

      let Mediatotal = FindSubject.sort((a, b) => {
        return a.valeu - b.value;
      });

      res.send(Mediatotal);
    } catch (err) {
      res.status(400).send('Erro na leitura');
    }
  });
});
module.exports = Routtop3;
