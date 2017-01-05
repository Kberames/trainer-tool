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

//--------------------------------
//Route to load the Angular UI Frontend.
router.get ('/trainer', function (request, response) {
    // response.send ('This is the workout page with angular');

    //Load the angular workout partial.
    response.render ('home', {
        layout: 'index-angular',
        data: {
            user: request.session.user
        }
    });
});

module.exports = router;
