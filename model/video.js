var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var videoSchema = new Schema ({
    name: String,
    videoUrl: String
});

var Video = mongoose.model ('Video', videoSchema);

module.exports = Video;
