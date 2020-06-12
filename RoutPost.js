const express = require('express');
const routPost = express.Router();
const fs = require('fs');

routPost.post('/', (req, res) => {
  let Reqbody = req.body;
  fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        let json = JSON.parse(data);
        newGrade = { id: json.nextId++, ...Reqbody, timestamp: new Date() };

        json.grades.push(newGrade);

        fs.writeFile('Grade-Control-Api.json', JSON.stringify(json), (err) => {
          if (err) {
            console.log('falha na gravação da account');
          } else {
            console.log('gravação OK');
          }
        });

        res.send('post new grade');
      } catch (err) {
        res.send('erro');
      }
    } else {
      res.send('erro de Leitura');
    }
  });
});
module.exports = routPost;
