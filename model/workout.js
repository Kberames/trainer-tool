//Load in the mongoose nodejs package.
var mongoose = require ('mongoose');

//grab the schema object from mongoose.
var Schema = mongoose.Schema;

//Create the schema for the workout.
var workoutSchema = new Schema ({
    name: String,
    workout: String
});

//Create the model object
var Workout = mongoose.model ('Workout', workoutSchema);

//Make the model object available to other NodeJs modules.
module.exports = Workout;
