//importar módulos NPM
const express = require('express');
const cors = require('cors');

//conexión MongoDB, importamos los módulos

const dbConnect = require('../config/connection');
dbConnect();
const Movies = require('../models/movies');
const Actors = require('../models/actors');
const Users = require('../models/users');
const Favorites = require('../models/favorites');

// create and config server
const server = express();
server.use(cors());
server.use(express.json({ limit: '150mb' }));

// init express aplication
const serverPort = process.env.PORT || 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Conexión listado de películas con filtro de género y orden alfabético por título

server.get('/movies_all_mongo/', (req, res) => {
  let genderQuery = req.query.gender.toLocaleLowerCase();
  const orderQuery = req.query.sort === 'asc' ? 1 : -1;
  console.log(req.query);
  if (genderQuery !== '') {
    Movies.find({ gender: genderQuery }).sort({ title: orderQuery })
      .then(docs => {
        console.log(docs)
        res.json({
          success: true,
          movies: docs,
        });
      })
      .catch((e) => {
        throw e;
      })
  } else {
    Movies.find({}).sort({ title: orderQuery })
      .then(docs => {
        console.log(docs)
        res.json({
          success: true,
          movies: docs,
        });
      })
      .catch((e) => {
        throw e;
      })
  }
});


// Añadir peli a favoritos (manualmente)
server.post('/favorites-add', (req, res) => {
  let movie = '64343512fc13dba6575b56e9';
  let user = '64343731fc13dba6575b56ee';
  Favorites.create({
    idUser: user,
    idMovie: movie,
    score: req.body.score
  })
    .then((response) => res.json(response))
    .catch((e) => {
      console.log(e);
    })
});


// obtener favoritos (no funciona)
server.get('/favorites-list', (req, res) => {
  console.log('Karlins viajera');
  query = Favorites.find()
    .populate({
      path: 'users',
      select: 'userNetflix'
    })
    .then((result) => {
      console.log(result);
      res.json(result)
    })
    .catch((err) => { 'Error', err })
})

// endpoint para registrarse en la app
server.post('/signup', (req, res) => {
  const newUser = req.body;
  Users.create(newUser)
    .then((docs) => {
      res.json({
        "success": true,
        "userId": "nuevo-id-añadido"
      })
    })
    .catch((e) => {
      throw (e)
    })

})

//configurar el motor de plantillas

server.set('view engine', 'ejs')

// servidor de estáticos
server.use(express.static('./src/public-react'))
server.use(express.static('./src/public-movies-images'))
//ACTUALIZAR!!!!!!!!!!!





