// NOTE: connecting the basic routes
var express = require ('express');
var router = express.Router();

// NOTE: home page route
router.get('/', function(request, response) {
    response.render ('home');
});
// NOTE: contact page
router.get('/contact', function(request, response) {
    response.render ('contact');
});
// NOTE:
router.get('/about', function(request, response) {
    response.render ('about');
});
module.exports = router
 
