const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '150mb' }));

//conexión MongoDB

const dbConnect = require ('../config/connection');
dbConnect();
const Movies = require ('../models/movies');
const Actors = require ('../models/actors');
const Users = require ('../models/users');

// init express aplication
const serverPort = process.env.PORT || 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// // conectar a la base datos 
// let connection;

// mysql
//   .createConnection({
//     host: 'localhost',
//     database: 'netflix',
//     user: 'root',
//     password: 'Jul.4619',
//   })
//   .then(conn => {
//     connection = conn;
//     connection
//       .connect()
//       .then(() => {
//         console.log(`Conexión establecida con la base de datos (identificador=${connection.threadId})`);
//       })
//       .catch((err) => {
//         console.error('Error de conexion: ' + err.stack);
//       });
//   })
//   .catch((err) => {
//     console.error('Error de configuración: ' + err.stack);
//   });

// // console.log(connection);
// //petición de las peliculas al servidor filtrando por genero

// server.get('/movies', (req, res) => {
//   console.log(req.query.gender)
//   const order = req.query.sort
//   let gender = req.query.gender
//   console.log(order);

//   if (req.query.gender === '') {
//     gender = '%';

//   }
//   connection
//     .query(`SELECT * FROM movies WHERE gender LIKE ? ORDER BY title ${order}`, [gender])
//     .then(([results]) => {
//       console.log('Informacion recuperada');
//       results.forEach((result) => {
//         console.log(result);
//       });
//       res.json(results)
//     })
//     .catch((err) => {
//       throw err
//     });

// });

// // peticion al servidor para hacer login
// server.post('/login', (req, res) => {
//   console.log(req.body);
//   connection
//     .query('SELECT passwordUser, email FROM users WHERE passwordUser = ? AND email= ?', [req.body.password, req.body.email])
//     .then(([results]) => {
//       let response;
//       if (results.length) {
//         response = {
//           "success": true,
//           "userId": "id_de_la_usuaria_encontrada"
//         }
//       } else {
//         response = {
//           "success": false,
//           "errorMessage": "Usuaria/o no encontrada/o"
//         }
//       }
//       res.json(response)
//     })
//     .catch((err) => {
//       throw err;
//     });
// })

// server.get('/movie/:movieId', (req,res)=>{
//   const movieId = parseInt(req.params.movieId);
//   connection
//     .query(`SELECT * FROM movies, actors, rel_movies_actors WHERE idMovie = ${movieId} AND fk_actors = idActor AND fk_movies = idMovie`)
//     .then(([results]) => {
//       console.log(results)
//       res.render('template', results[0])
//     })
//     .catch((err) => {
//       throw err
//     });

// })

// Conexión listado de películas

server.get ('/movies_all_mongo', (req,res)=>{
  Movies.find({})
  .then(docs=>{
    console.log(docs)
    res.json({
      success: true,
      movies: docs,

    });
  })
  .catch((e)=>{
    throw e;
  })
})


//configurar el motor de plantillas

server.set('view engine', 'ejs')

// servidor de estáticos
server.use(express.static('./src/public-react'))
server.use(express.static('./src/public-movies-images'))
//ACTUALIZAR!!!!!!!!!!!



