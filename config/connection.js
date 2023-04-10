const mongoose = require ('mongoose');
const dbConnect= () =>{
    const db = 'netflixDB';
    const user = 'dbUser';
    const pass = 'c6NfFnwdP2nnDbHA';
    const URI= `mongodb+srv://${user}:${pass}@cluster0.h7kdq8a.mongodb.net/${db}?retryWrites=true&w=majority`

    mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log('conectado a MongoDB'))
    .catch ((e)=> console.log('error:', e));
};

module.exports = dbConnect; 


