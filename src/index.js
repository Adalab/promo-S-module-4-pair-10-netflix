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

// console.log(connection);
//petición de las peliculas al servidor filtrando por genero

server.get('/movies', (req, res) => {
  console.log(req.query.gender)
  if (req.query.gender === 'Todas' ||req.query.gender === '' ) {
    connection
      .query('SELECT * FROM movies')
      .then(([results]) => {
      console.log('Informacion recuperada');
      results.forEach((result) => {
        console.log(result);
      });
      res.json(results)
    })
    .catch((err) => {
      throw err;
    });
  } else {
    connection
      .query('SELECT * FROM movies WHERE gender = ?', [req.query.gender])
      .then(([results]) => {
      console.log('Informacion recuperada');
      results.forEach((result) => {
        console.log(result);
      });
      res.json(results)
    })
    .catch((err) => {
      throw err;
    });
  }
});

// peticion al servidor para hacer login
server.post('/login', (req, res) => {
  console.log(req.body);
  connection
      .query('SELECT passwordUser, email FROM users WHERE passwordUser = ? AND email= ?', [req.body.password, req.body.email])
      .then(([results]) => {
        let response;
        if (results.length){
          response = {
            "success": true,
            "userId": "id_de_la_usuaria_encontrada"
          }
        } else {
         response=  {
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

// servidor de estáticos
server.use(express.static('./src/public-react'))
server.use(express.static('./src/public-movies-images'))



// server.get('/movies', (req, res) => {
//   console.log(req.query.gender)
 
//   let query;
//   if(req.querysort === 'asc'){
//     query='SELECT * FROM movies WHERE gender = ? ORDER BY title ASC'
//   } else{
//     'SELECT * FROM movies WHERE gender = ? ORDER BY title DESC'
//   } 
//   if (req.query.gender === '' || req.query.gender ==='Todas') {
//     connection
//       .query(query,[req.query.gender])
//       .then(([results, fields]) => {
//       console.log('Informacion recuperada');
//       results.forEach((result) => {
//       console.log(result);
//       });
//       res.json(results)
      
//     })
//     .catch((err) => {
//       throw err;
//     });
//   } else {
//     connection
//       .query(query, [req.query.gender])
//       .then(([results, fields]) => {
//       console.log('Informacion recuperada');
//       results.forEach((result) => {
//         console.log(result);
//       });
//       res.json(results)
//     })
//     .catch((err) => {
//       throw err;
//     });
//   }

  // if (req.query.sort === 'asc') {
    // connection
    // .query('SELECT * FROM movies ORDER BY title ?', [req.query.sort])
    // .then(([results, fields]) => {
    //   // console.log('Informacion recuperada');
    //   // results.forEach((result) => {
    //   //   console.log(result);
    //   // });
    //   console.log('holiis')
    //   res.json(results)
    // })
    // .catch((err) => {
    //   throw err;
    // });
//   // }
// });



