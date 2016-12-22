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

router.get('/login', function(request,response) {
    if (request.session.user) {
        response.redirect ('/')
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
               response.redirect ('/user/login');
            }
            else{
                console.log('this is the fund user', result);
                // NOTE: 12f birng in express-sessions in server.js
                request.session.user = result
                console.log('this is the session data', request.session);
                response.redirect ('/');
            }
        }
    )
});

router.get ('/logout', function (request, response) {
    request.session.destroy ();
    console.log('session destroyed', request.session);
    response.redirect ('/user/login')
})


module.exports = router
