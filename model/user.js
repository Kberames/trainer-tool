var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema ({
    email : String,
    password : String,
    firstname : String,
    lastname : String,
    gender : String,
    address : String,
    city : String,
    state : String,
    zipcode : String,
    phone : String,
    type : String

})

var User = mongoose.model ('User', userSchema);
module.exports = User;
