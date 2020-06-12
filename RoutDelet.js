const express = require('express');
const RoutDelete = express.Router();
const fs = require('fs');

RoutDelete.delete('/:id', (req, res) => {
  fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
    try {
      let json = JSON.parse(data);
      let DeleteAcc = json.grades.filter((acc) => {
        return acc.id !== parseInt(req.params.id);
      });
      json.grades = DeleteAcc;
      json.nextId -= 1;
      fs.writeFile('Grade-Control-Api.json', JSON.stringify(json), (err) => {
        if (!err) {
          res.send('Accounts Atualizadas');
        } else {
          res.send('Erro na Atualização');
        }
      });
    } catch (err) {
      res.send('Erro na exclusão');
    }
  });
});
module.exports = RoutDelete;
