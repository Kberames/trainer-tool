//Pull in express to make use of the framework.
var express = require ('express');

//Grab the url router from express.
var router = express.Router ();

//Load in the workout schema object
var Workout = require ('../model/workout.js')


//Create
router.post ('/', function (request, response) {
    var newWorkout = Workout (request.body);

    newWorkout.save (function (error) {
        if (error) {
            var errorMessage = 'Unable to save the workout';
            console.log ('***ERROR: ' + errorMessage);
        }
        else {
            response.json ({
                message: 'New lesson was saved.'
            });

        }
    });
});

//Read
router.get ('/', function (request, response) {
    Workout.find (function (error, result) {
        if (error) {
            var errorMessage = 'Unable to sort workouts.';
            console.log ('**ERROR: ' + errorMessage);
        }
        else {
            response.json (result);
        }
    });
});

module.exports = router;
