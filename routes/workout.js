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
                message: 'New workout was saved.'
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

router.get ('/:id', function (request, response) {
    var workoutId = request.params.id;

    Workout.findById (workoutId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find workout by id: ' + workoutId;
            console.error ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.json (result);

        }
    });
});

//Update
router.get ('/:id/edit', function (request, resposne) {
    var workoutId = request.params.id;

    Workout.findById (workoutId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find workout by id: ' + workoutId;
            console.log ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.render ('workout/edit', {
                data: {
                    workout: result,
                    title: 'Edit',
                    method: 'PUT'
                }
            });
        }
    });
});

router.put ('/:id', function (request, response) {
    var workoutId = request.params.id;

    Workout.findByIdAndUpdate (workoutId, request.body, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to update workout: ' + workoutId;
            console.log ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.json (result);
        }
    });
});

//Delete
router.get ('/:id/delete', function (request, response) {
    // response.send ('Lesson was deleted');
    var workoutId = request.params.id;

    Workout.findByIdAndRemove (workoutId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to delete workout' + workoutId;
            console.error ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'Workout was deleted.'
                });
            }
            else {
                response.redirect ('/workout/')
            }
        }
    });
});

router.delete ('/:id', function (request, response) {
    var workoutId = request.params.id;

    Workout.findByIdAndRemove (workoutId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to delete workout.' + workoutId;
                console.error ('***ERROR: ' + errorMessage);
                response.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'Workout was deleted.'
                });
            }
            else {
                response.redirect ('/workout/');
            }
        }
    });
});

module.exports = router;
