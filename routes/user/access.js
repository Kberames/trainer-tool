var express = require ('express');
var router = express.Router ();

// Grab GoogleApiKey
var GoogleApiKey = require ('../../Config.js');

// Node wrapper for google maps geocoder.
var nodeGeocoder = require ('node-geocoder');
var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: GoogleApiKey,
  formatter: null
};
var geocoder = nodeGeocoder(options);

var User = require ('../../model/user.js');
// NOTE: adding multer to use to upload picture
var multer = require ('multer');
var processUploadFile = multer({ dest: './temp'});
// NOTE: adding multer to use to upload picture

router.get ('/register', function (request,response) {
    response.render ('user/register/register');
});

router.get ('/register/trainer', function(request,response) {
    response.render ('user/register/trainer')
})

router.get ('/register/customer', function(request, response) {
    response.render ('user/register/customer')
})

router.post ('/register', processUploadFile.single ('imageFile'), function(request, response){

    if (request.file) {

        console.log('file: ', request.file);
        console.log('path: ', request.file.path);

        var fs = require ('fs-extra');
        var source = request.file.path;
        var basePath = './public';
        var destination = '/img/uploads/' + request.file.originalname;

        fs.move (source, (basePath + destination), function (error) {
            fs.remove (source, function (error) {
            })
        })
        request.body.imageUrl = destination
    }
    else {
        request.body.imageUrl = '/images/bee.png'
    }
    request.body.type = "client";

    var address = request.body.address + ', ' +
        request.body.city + ', ' +
        request.body.state + ', ' +
        request.body.zipcode;

    // Call to get geocode.
    geocoder.geocode(address)
        .then (function(results){
            if (results.length > 0) {
                console.log('geocode address: ' + address);
                console.log('geocode results: ' + JSON.stringify(results.length));
                let loc = {
                    lat: results[0].latitude,
                    lng: results[0].longitude
                };
                console.log('lat: ' + loc.lat);
                console.log('lng: ' + loc.lng);

                var newUser = User (request.body);
                newUser.location = loc;

                newUser.save(function (error) {
                    if (error) {
                        console.error('**** un able to save user');
                        console.error(error);
                    }
                    else {
                        console.log('user saved', request.body.username);
                        response.redirect('/login')
                    }
                });
            } //if (results.length > 0)
            else {
                error = 'Unable to geocode address.'
            }
        })
        .catch (function(error) {
            console.log('geocode error: ' + error);
        });
});

router.post ('/register/trainer', processUploadFile.single ('imageFile'), function(request, response){

    if (request.file){
        console.log('file: ', request.file);
        console.log('body: ', request.body);
        console.log('path: ', request.file.path);

        var fs = require ('fs-extra');
        var source = request.file.path;
        var basePath = './public';
        var destination = '/img/uploads/' + request.file.originalname;

        fs.move (source, (basePath + destination), function (error) {
            fs.remove (source, function (error) {
            })
        })
        request.body.imageUrl = destination
    }
    else {
        request.body.imageUrl = '/images/bee.png'
    }
    request.body.status = "pending";
    request.body.type = "trainer";

    var address = request.body.address + ', ' +
        request.body.city + ', ' +
        request.body.state + ', ' +
        request.body.zipcode;

    var address2 = request.body.address2 + ', ' +
        request.body.city2 + ', ' +
        request.body.state2 + ', ' +
        request.body.zipcode2;

    // Call to get geocodes for multilple addresses.
    geocoder.batchGeocode([address, address2])
        .then (function(results){
            // console.log('batchGeocode results: ' + JSON.stringify(results[0]));
            // console.log('results[0].value[0].latitude: ' + results[0].value[0].latitude);
            let loc = {
                lat: results[0].value[0].latitude,
                lng: results[0].value[0].longitude
            };
            console.log('lat: ' + loc.lat);
            console.log('lng: ' + loc.lng);

            let loc2 = {
                lat: results[1].value[0].latitude,
                lng: results[1].value[0].longitude
            };
            console.log('lat2: ' + loc2.lat);
            console.log('lng2: ' + loc2.lng);

            var newUser = User (request.body);

            newUser.location = loc;
            newUser.location2 = loc2;

            newUser.save(function (error) {
                if (error) {
                    console.error('**** un able to save user');
                    console.error(error);
                }
                else {
                    console.log('user saved', request.body.username);
                    console.log('user status', request.body.status);
                    response.redirect('/login')
                }
            });
        })
        .catch (function(error) {
            console.log('geocode error: ' + error);
        });
    });

router.get('/login', function(request,response) {
    if (request.session.user) {
        response.redirect ('/dashboard')
    }
    else {
        response.render ('user/login')
    }
});


router.post ('/login', function (request, response){

    User.findOne (request.body,
        function (error,result){
            if (error) {
                console.error('UNABLE TO FIND USER!!!!!!!');
                console.error(error);
            }
            else if (!result) {
               request.flash ('error', ' Your user name and pasword did not match');
               response.redirect ('/login');
            }
            else{
                if (request.session.user.trainer) {
                    console.log('this is the fund user', result);
                    // NOTE: 12f birng in express-sessions in server.js
                    request.session.user = result
                    console.log('this is the session data', request.session);
                    response.redirect ('/dashboard');
                    data: {
                        user: request.session.user
                    }
                }
                else {
                    console.log('this is the fund user', result);
                    request.session.user = result
                    console.log('this is the session data', request.session);
                    console.log('this is the trainer', request.trainer);
                    response.redirect ('/')
                }
            }
        }
    )
});

router.get ('/logout', function (request, response) {
    request.session.destroy ();
    console.log('session destroyed', request.session);
    response.redirect ('/login');
})

module.exports = router;
