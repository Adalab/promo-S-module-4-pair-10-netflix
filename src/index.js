const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// conectar a la base datos 
mysql
  .createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: '4467',
  })
  .then(connection => {
    connection
      .connect()
      .then(() => {
        return connection.query('SELECT * FROM movies');
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });

//petición al servidor
server.get('/movies', (req, res) => {
  res.send({
    success: true,
    movies: mysql
  })
  console.log(mysql);
})