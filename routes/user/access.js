var express = require ('express');
var router = express.Router ();

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
        request.body.imageUrl = destination;
    }
    else {
        request.body.imageUrl = '/img/uploads/stitch.png'
    }
    request.body.type = "customer";
    var newUser = User (request.body);
    newUser.save(function (error) {
        if (error) {
            console.error('**** un able to save user');
            console.error(error);
        }
        else {
            console.log('user saved', request.body.firstname);
            response.redirect('/login')
        }
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
        request.body.imageUrl = '/img/uploads/stitch.png'
    }
    request.body.status = "pending";
    request.body.type = "trainer";
    var newUser = User (request.body);
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
               response.redirect ('/login');
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
    response.redirect ('/login')
})


module.exports = router
