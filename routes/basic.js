// NOTE: connecting the basic routes
var express = require ('express');
var router = express.Router();

// NOTE: home page route
router.get('/', function(request, response) {
    response.render ('home', {
        data: {
            user: request.session.user
        }
    });
});
// NOTE: contact page
router.get('/contact', function(request, response) {
    response.render ('contact', {
        data: {
            user: request.session.user
        }
    });
});
// NOTE:
router.get('/about', function(request, response) {
    response.render ('about', {
        data: {
            user: request.session.user
        }
    });
});
// NOTE: this is the route for the dashboard
router.get ('/dashboard', function(request,response) {
    response.render ('dashboard', {
        data: {
            user: request.session.user
        }
    })
    console.log(request.session.user);
})

//--------------------------------
//Route to load the Angular UI Frontend.
router.get ('/trainer', function (request, response) {
    // response.send ('This is the workout page with angular');

    // Grab GoogleApiKey
    var GoogleApiKey = require ('../Config.js');

    console.log('basic.js, API KEY: ' + GoogleApiKey);

    //Load the angular workout partial.
    response.render ('home', {
        layout: 'index-angular',
        data: {
            user: request.session.user,
            googleApiKey: GoogleApiKey
        }
    });
});

module.exports = router;
