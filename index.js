const express = require('express');
let ImportGrade = require('./grades.json');
const fs = require('fs');
const app = express();
const port = 3003;

const RoutPut = require('./routs/RoutEdit');
const RoutPost = require('./routs/RoutPost');
const RoutDelete = require('./routs/RoutDelet');
const RoutGet = require('./routs/RoutGet');
const RoutGetNota = require('./routs/RoutGetnota');
const RoutGetMedia = require('./routs/RoutGetMedia');
const Routtop3 = require('./routs/RoutTop3');

app.use(express.json());

app.use('/edit', RoutPut);
app.use('/add', RoutPost);
app.use('/delete', RoutDelete);
app.use('/find', RoutGet);
app.use('/nota', RoutGetNota);
app.use('/media', RoutGetMedia);
app.use('/ranking', Routtop3);
app.listen(port, () => {
  try {
    fs.readFile('Grade-Control-Api.json', 'utf8', (err, data) => {
      if (err) {
        fs.writeFile(
          'Grade-Control-Api.json',
          JSON.stringify(ImportGrade),
          (err) => {
            if (err) {
              console.log('erro na gravação do arquivo');
            } else {
              console.log('informações gravadas!');
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err);
  }
  console.log('App Started!');
});
