var express = require ('express');

var router = express.Router ();

var Video = require ('../model/video.js');

//Create
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

module.exports = router;
