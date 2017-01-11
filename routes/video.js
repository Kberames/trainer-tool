var express = require ('express');

var router = express.Router ();

var Video = require ('../model/video.js');

router.get ('/', function (request, response) {
    console.log ('We made it!');
});

module.exports = router;
