var express = require ('express');
var router = express.Router ();
var User = require ('../../model/user.js');

router.get ('/create', function (request, response) {
    // response.send ('****create page for users')
    response.render('user/edit', {
        data: {
            title:'Create new User',
            method: 'POST',
        }
    })
})

router.post('/', function(request,response) {
    var newUser = User (request.body);
    newUser.save(function (error) {
        if (error) {
            console.error('**** not able to save user');
            console.error(error);
        }
        else {
            console.log('user saved', request.body.username);
            response.redirect('/user')
        }
    });
})

// NOTE: this is to view the users
router.get("/", function (request,response) {
    User.find({}, function (error,result) {
        if (error) {
            console.log('***error finding users');
        }
        else{
            console.log('the users are: ', result);
            response.render ('user/list', {
                data: {
                    usersList: result,
                }
            })
        }
    })
})

// NOTE: This is where we will see one user
router.get("/:id", function (request,response) {
    // response.send('connected')
    var userId = request.params.id
    User.findById (userId, function(error,result) {
        if (error){
            console.log('***error finding the user', + userId);
            response.send('something went wrong getting the id')
        }
        else {
            response.render ('user/view', {
                data: {
                    user : result
                }
            })
        }
    })
})
// NOTE: This is where will go to edit the user
router.get('/:id/edit', function(request, response) {
    var userId = request.params.id
    User.findById (userId, function(error,result) {
        if (error){
            console.log('***error finding the ', + userId);
            response.send('something went wrong')
        }
        else {
            response.render ('user/edit', {
                data: {
                    title: 'Edit User',
                    method: 'PUT',
                    user : result
                }
            })
        }
    })
})
// NOTE: This is the the route to Put the edit in
router.put('/:id', function (request,response) {
    // response.send('save here')
    var userId = request.params.id
    User.findByIdAndUpdate(userId, request.body, function(error,resut) {
        if (error){
            console.log('cant update user');
            response.send('cant update user!!!!!!!!!!!')
        }
        else{
            response.redirect('/user/' + userId)
        }
    })
})
router.get('/:id/delete', function(request,response){
    var userId = request.params.id
    User.findByIdAndRemove(userId, function(error,result){
        if (error) {
            console.log('Id did not errase');
            response.send('Error removing id')
        }
        else{
            response.redirect('/user')
        }
    })
})


 module.exports = router
