var express = require ('express');

var router = express.Router ();

var Message = require ('../model/message.js');

var moment = require ('moment');

//Create
router.post ('/', function (request, response) {
    var newMessage = Message (request.body);

    moment().format("MMM DD YY");
    newMessage.save (function (error) {
        if (error) {
            var errorMessage = 'Unable to save the message.';
            console.log ('***ERROR: ' + errorMessage);
        }
        else {
            response.json ({
                message: 'Message was saved.'
            });
        }
    });
}); // Create

// Read list
router.get ('/', function (request, response) {
    // console.log('*** GET MSG LIST, request.session.user: ' + JSON.stringify(request.session.user));
    Message.find ({to: request.session.user._id})
        .populate({
            path: 'to',
        })
        .populate({
            path: 'from',
        })
        .sort('date')
        .exec(function (error, result) {
            if (error) {
                var errorMessage = 'Unable to sort messages.';
                console.log ('**ERROR: ' + errorMessage);
            }
            else {
                response.json (result);
            }
        });
}); // Read list

router.get ('/:id', function (request, response) {
    var messageId = request.params.id;

    Message.findById (messageId)
        .populate({
            path: 'to',
        })
        .populate({
            path: 'from',
        })
        .exec (function (error, result) {
            if (error) {
                var errorMessage = 'Unable to find message by id: ' + messageId;
                console.error ('***ERROR: ' + errorMessage);
                response.send (errorMessage);
            }
            else {
                response.json (result);
            }
    });
});  // GET by id

// Delete
router.get ('/:id/delete', function (request, response) {
    // response.send ('Lesson was deleted');
    var messageId = request.params.id;

    Message.findByIdAndRemove (messageId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to delete message' + messageId;
            console.error ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'Message was deleted.'
                });
            }
            else {
                response.redirect ('/message/')
            }
        }
    }) // Message.findByIdAndRemove
}); // Delete

module.exports = router;
