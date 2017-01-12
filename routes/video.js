var express = require ('express');

var router = express.Router ();

var Video = require ('../model/video.js');

//Create
// router.get ('/create', function (request, response) {
    // response.send ('You are on the create page!');
//     response.render ('video/create');
// });

router.post ('/', function (request, response) {
    var newVideo = Video (request.body);

    newVideo.save (function (error) {
        if (error) {
            var errorMessage = 'Unable to save video';
            console.log ('**ERROR: ' + errorMessage);
        }
        else {
            if (request.sendJson == true) {
                response.json ({
                    message: 'New video was saved.'
                });
            }
            else {
                response.redirect ('/video');
            }
            // response.json ({
            //     message: 'New video was saved.'
            // });
        }
    })

});

//Read
router.get ('/', function (request, response) {
    Video.find (function (error, result) {
        if (error) {
            var errorMessage = 'Unable to sort videos';
            console.log ('***ERRROR: ' + errorMessage);
        }
        else {
            if (request.sendJson == true) {
                response.json (result);
            }
            else {
                response.render ('/', {
                    data: {
                        video: result
                    }
                });
            }
        }
    });
});

router.get ('/:id', function (request, response) {
    var videoId = request.params.id;

    Video.findById (videoId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find video by id: ' + videoId;
            console.error ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            if (request.sendJson == true) {
                response.json (result);
            }
            else {
                response.render ('/', {
                    data: {
                        video: result
                    }
                });
            }
        }
    });
});

module.exports = router;
