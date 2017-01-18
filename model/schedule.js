var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var scheduleSchema = new Schema ({
    date: Date,
    workoutId: { type: Schema.Types.ObjectId, ref: 'Workout'}
});

var Schedule = mongoose.model ('Schedule', scheduleSchema);

module.exports = Schedule;
