const express = require('express');
const RoutMedia = express.Router();
const fs = require('fs');

RoutMedia.get('/:subject/:type', (req, res) => {
  fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
    try {
      let json = JSON.parse(data);
      const FindGrade = json.grades.filter((client) => {
        return client.subject === req.params.subject;
      });
      const FindSubject = FindGrade.filter((sub) => {
        return sub.type === req.params.type;
      });
      let contador = null;
      let contNota = null;

      let Mediatotal = FindSubject.forEach((count) => {
        contador += count.value;
        contNota += 1;
      });
      let conta = contador / contNota;
      let Media = conta.toFixed(1);

      res.send(
        `A média do Subject: ${req.params.subject} no Type: ${req.params.type} foi de ${Media}`
      );
    } catch (err) {
      res.status(400).send('Erro na leitura');
    }
  });
});
module.exports = RoutMedia;
