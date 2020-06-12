const express = require('express');
const fs = require('fs');
const Edit = express.Router();

Edit.put('/:id', (req, res, err) => {
  let ReqBody = req.body;
  fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
    try {
      if (err) throw err;
      let json = JSON.parse(data);
      let idparams = parseInt(req.params.id);
      let changeOld = json.grades.findIndex((gradeid) => {
        return gradeid.id === idparams;
      });
      let QuantGrad = json.grades.length;

      if (idparams <= QuantGrad) {
        json.grades[changeOld] = {
          id: idparams,
          ...ReqBody,
          timestamp: new Date(),
        };

        fs.writeFile('Grade-Control-Api.json', JSON.stringify(json), (err) => {
          if (err) {
            res.status(400).send('Erro Na atualização');
          } else {
            res.send('Atualizado!');
          }
        });
      } else {
        res.status(400).send('ID não Existe!');
      }
    } catch (err) {
      res.status(400).send('Erro na leitura');
    }
  });
});

module.exports = Edit;
