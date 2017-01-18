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
            response.json (result);
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

//Update
router.get ('/:id/edit', function (request, response) {
    var videoId = request.params.id;

    Video.findById (videoId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to find video by Id: ' + videoId;
            console.log ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            response.render ('video/edit', {
                data: {
                    video: result,
                    title: 'Edit',
                    method: 'PUT'
                }
            });
        }
    });
});

router.put ('/:id', function (request, response) {
    var videoId = request.params.id;

    Video.findByIdAndUpdate (videoId, request.body, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to update video: ' + videoId;
            console.log ('**ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            if (request.sendJson == true) {
                response.json (result);
            }
            else {
                response.redirect ('/video/view')
            }
        }
    });
});

//Delete
router.get ('/:id/delete', function (request, response) {
    var videoId = request.params.id;

    Video.findByIdAndRemove (videoId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to delete video' + videoId;
            console.error ('***ERROR: ' + errorMessage);
            response.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'Video was deleted'
                })
            }
            else {
                response.redirect ('/video/')
            }
        }
    });
});

router.delete ('/:id', function (request, response) {
    var videoId = request.parmas.id;

    Video.findByIdAndRemove (videoId, function (error, result) {
        if (error) {
            var errorMessage = 'Unable to delete video' + videoId;
            console.error ('***ERROR: ' + errorMessage);
            resposne.send (errorMessage);
        }
        else {
            if (request.sendJson) {
                response.json ({
                    message: 'Video was deleted'
                });
            }
            else {
                response.redirect ('/video/');
            }
        }
    });
});

module.exports = router;
