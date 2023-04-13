const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '150mb' }));

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

//petición de las peliculas al servidor filtrando por genero y ordenando alfabéticamente por título

server.get('/movies', (req, res) => {
  const order = req.query.sort;
  let gender = req.query.gender;
  if (req.query.gender === '') {
    gender = '%';
  }
  connection
    .query(`SELECT * FROM movies WHERE gender LIKE ? ORDER BY title ${order}`, [gender])
    .then(([results]) => {
      res.json(results)
    })
    .catch((err) => {
      throw err
    });
});

// peticion al servidor para hacer login
server.post('/login', (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  connection
    .query('SELECT passwordUser, email FROM users WHERE passwordUser = ? AND email= ?', [password, email])
    .then(([results]) => {
      let response;
      if (results.length) {
        response = {
          "success": true,
          "userId": "id_de_la_usuaria_encontrada"
        }
      } else {
        response = {
          "success": false,
          "errorMessage": "Usuaria/o no encontrada/o"
        }
      }
      res.json(response)
    })
    .catch((err) => {
      throw err;
    });
})

// endpoint para ver el detalle de cada película
server.get('/movie/:movieId', (req, res) => {
  const movieId = parseInt(req.params.movieId);
  connection
    .query(`SELECT * FROM movies, actors, rel_movies_actors WHERE idMovie = ${movieId} AND fk_actors = idActor AND fk_movies = idMovie`)
    .then(([results]) => {
      res.render('template', results[0])
    })
    .catch((err) => {
      throw err
    });
})

//configurar el motor de plantillas

server.set('view engine', 'ejs')

// servidor de estáticos
server.use(express.static('./src/public-react'))
server.use(express.static('./src/public-movies-images'))




