const express = require('express');
const GetnotaTotal = express.Router();
const fs = require('fs');

GetnotaTotal.get('/:student/:subject', (req, res) => {
  fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
    let json = JSON.parse(data);
    const FindGrade = json.grades.filter((client) => {
      return client.student === req.params.student;
    });
    const FindSubject = FindGrade.filter((sub) => {
      return sub.subject === req.params.subject;
    });
    let contador = null;
    let contNota = null;
    let Notatotal = FindSubject.forEach((count) => {
      contador += count.value;
      contNota += 1;
    });
    let calculaMedia = contador / contNota;
    let MediaTotal = calculaMedia.toFixed(1);

    res.send(
      ` A nota total de ${req.params.student} na matéria ${req.params.subject} foi ${contador} com Média total de ${MediaTotal}`
    );
  });
});
module.exports = GetnotaTotal;
