var express = require ('express');

var router = express.Router ();

var Schedule = require ('../model/schedule.js');

var moment = require ('moment');

//Create
router.post ('/', function (request, response) {
    var newSchedule = Schedule (request.body);

    moment().format("MMM Do YY");
    newSchedule.save (function (error) {
        if (error) {
            var errorMessage = 'Unable to save the schedule.';
            console.log ('***ERROR: ' + errorMessage);
        }
        else {
            response.json ({
                message: 'New schedule was saved.'
            });
        }
    });
});

//Read
router.get ('/', function (request, response) {
    Schedule.find ().sort('date').exec(function (error, result) {
        if (error) {
            var errorMessage = 'Unable to sort schedule.';
            console.log ('**ERROR: ' + errorMessage);
        }
        else {
            response.json (result);
        }
    });
});

router.get ('/:id', function (request, response) {
    var scheduleId = request.params.id;

    Schedule.findById (scheduleId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find schedule by id: ' + scheduleId;
            console.error ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.json (result);
        }
    });
});

//Update
router.get ('/:id/edit', function (request, response) {
    var scheduleId = request.params.id;

    Schedule.findById (scheduleId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find schedule by id: ' + scheduleId;
            console.log ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.render ('schedule/edit', {
                data: {
                    schedule: result,
                    title: 'Edit',
                    method: 'PUT'
                }
            });
        }
    });
});

router.put ('/:id', function (request, response) {
    var scheduleId = request.params.id;

    Schedule.findByIdAndUpdate (scheduleId, request.body, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to update schedule: ' + scheduleId;
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
    var scheduleId = request.params.id;

    Schedule.findByIdAndRemove (scheduleId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to delete schedule' + scheduleId;
            console.error ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'Schedule was deleted.'
                });
            }
            else {
                response.redirect ('/schedule/')
            }
        }
    })
});

router.delete ('/:id', function (request, response) {
    var scheduleId = request.params.id;

    Schedule.findByIdAndRemove (scheduleId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to delete schedule.' + scheduleId;
                console.error ('***ERROR: ' + errorMessage);
                response.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'Schedule was deleted.'
                });
            }
            else {
                response.redirect ('/schedule/');
            }
        }
    });
});

module.exports = router;
