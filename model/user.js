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
    type : String,
    status : String,
    address2 : String,
    city2 : String,
    state2 : String,
    zipcode2 : String,
    certification: String,
    imageUrl : String,
    videoName: String,
    videoUrl: String
})

var User = mongoose.model ('User', userSchema);
module.exports = User;
