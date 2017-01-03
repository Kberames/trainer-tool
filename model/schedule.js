var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var scheduleSchema = new Schema ({
    date: Date
});

var Schedule = mongoose.model ('Schedule', scheduleSchema);

module.exports = Schedule;
