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
mongoose.connect ('mongodb://localhost:27017/trainer_database')
// set the library to user

mongoose.Promise = require('bluebird');


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

 // NOTE: ----------------------------------------------------------------------

 var workoutRoutes = require ('./routes/workout.js');
 server.use ('/workout', workoutRoutes);
