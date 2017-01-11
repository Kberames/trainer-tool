// NOTE: bringing in express

var express = require ('express');

// NOTE: define server as express
var server = express ()
server.use (express.static ('public'));

// NOTE: body-parser
var bodyParser = require ('body-parser');
server.use (bodyParser.urlencoded ({ extended: true }));
server.use (bodyParser.json ());

// Load the method override so express can know what
// HTTP method other than GET & POST is being used.
var methodOverride = require ('method-override');

// Let express know that we are overriding the HTTP method
// and using the method sent in the form data.
server.use (methodOverride (function (request, response) {
    // Grab the request information and check to see
    // if the HTTP method was sent down as an _method value.

    // Check if the request has body content.
    if (request.body) {
        if (typeof request.body === 'object') {

            //Check if the body has an '_method' property on it.
            if (request.body._method) {

                // Grab the HTTP method from the body.
                var method = request.body._method;

                //Remove the _method property from the body.
                delete request.body._method;

                // Return the actual HTTP method.
                return method;
            }
        }
    }
}));


var methodOverride = require ('method-override');

server.use (methodOverride (function (request, response) {

    if (request.body) {
        if (typeof request.body === 'object') {
            if (request.body._method) {
                var method = request.body._method;
                delete request.body._method;
                return method;
            }
        }
    }
}));

// NOTE: bringing in session
var session = require ('express-session');

 server.use (session ({
     secret: "this is secret phrase",
     resave: false,
     saveUninitialized: true
 }));


// NOTE: bringing in flash
var flash = require ('connect-flash')
server.use (flash ());

server.use(function (request, response, next) {
    var user = request.session.user;
    if (user) {
        response.locals.user = user;

        // Check if we have an admin user.
        if (user && user.type == 'trainer') {
            user.trainer = true;
        }
        else if (user && user.type == 'admin') {
            user.admin = true;
        }
    }

    response.locals.message = request.flash ();

    var contentType = request.headers ['content-type'];
    // console.log('content type is: ', contentType);

    if (contentType == 'application/json') {
        request.sendJson = true;
    }
    next ();
})


// NOTE: The port.
var port = 3000;


var handlebars = require ('express-handlebars');
server.engine ('.hbs', handlebars ({
    // NOTE: this sets the defult lays out and directory.
    layoutsDir: 'templates',
    defaultLayout: 'index',
    extname: '.hbs'
}));

server.set('views', __dirname + '/templates/partials');

server.set('view engine', '.hbs');


// NOTE:set upserver to run
server.listen ( port, function (error) {
    if (error !== undefined) {
        console.log('***unable to connect');
        console.error(error);
    }
    else {
        console.log('the server is running on ', + port);
    }

});

var mongoose = require ('mongoose');
// connect mongoose
mongoose.connect ('mongodb://bobross:password@ds145828.mlab.com:45828/trainer_database')
// set the library to user

mongoose.Promise = require('bluebird');

// var GoogleMapsLoader = require('google-maps');
//
// GoogleMapsLoader.load(function(google) {
//     new google.maps.Map(el, options);
// });


// NOTE: -----------------------------------------------------------------------
// // NOTE: set up the first routes connetion
// server.get('/', function(request, response) {
//     // response.send('starting the project');
//     response.render ('home');
// })
var basicRoutes = require ('./routes/basic.js');
server.use ('/', basicRoutes);
 // NOTE: -------------user routes----------------------------------------------

 var userRoutes = require ('./routes/user/user.js');
 server.use('/user', userRoutes);

 var accessRoutes = require ('./routes/user/access.js');
 server.use('/', accessRoutes);

 // NOTE: ----------------------------------------------------------------------

 var workoutRoutes = require ('./routes/workout.js');
 server.use ('/workout', workoutRoutes);

 var scheduleRoutes = require ('./routes/schedule.js');
 server.use ('/schedule', scheduleRoutes);

 var videoRoutes = require ('./routes/video.js');
 server.use ('/video', videoRoutes);
