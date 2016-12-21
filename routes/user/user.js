var express = require ('express');
var router = express.Router ();

var User = require ('../../model/user.js');

router.get ('/register', function (request,response) {
    response.render ('user/register');
});

router.post ('/register', function(request, response){
    var newUser = User (request.body);
    newUser.save(function (error) {
        if (error) {
            console.error('**** un able to save user');
            console.error(error);
        }
        else {
            console.log('user saved', request.body.username);
            response.redirect('/user/login')
        }
    });
});


module.exports = router
