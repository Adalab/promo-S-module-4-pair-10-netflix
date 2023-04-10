const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const moviesSchema = new Schema ({
    title : String,
    gender: String,
    image: String,
    category: String,
    yearMovie: Number
},
{
    collection: 'movies'
});

const Movies = mongoose.model('movies', moviesSchema);
module.exports = Movies;