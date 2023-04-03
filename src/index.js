const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '75mb' }));

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// conectar a la base datos 
let connection;

mysql
  .createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: '4467',
  })
  .then(conn => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log(`Conexión establecida con la base de datos (identificador=${connection.threadId})`);
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });

console.log(connection);
//petición al servidor
server.get('/movies', (req, res) => {
  console.log(req.query.gender)
  if (req.query.gender === 'Todas') {
    connection
      .query('SELECT * FROM movies')
  } else {
    connection
      .query('SELECT * FROM movies WHERE gender = ?', [req.query.gender])
  }
  connection
    .then(([results, fields]) => {
      console.log('Informacion recuperada');
      results.forEach((result) => {
        console.log(result);
      });
      res.json(results)
    })
    .catch((err) => {
      throw err;
    });
});