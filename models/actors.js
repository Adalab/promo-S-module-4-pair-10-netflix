const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const actorsSchema = new Schema ({
    nameActor : String,
    lastName: String,
    country: String,
    birthday: Date
},
{
    collection: 'actors'
});

const Actors = mongoose.model('actors', actorsSchema);
module.exports = Actors;