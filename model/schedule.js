var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var scheduleSchema = new Schema ({
    date: Date,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    trainer: {type: Schema.Types.ObjectId, ref: 'User'},
    workoutId: { type: Schema.Types.ObjectId, ref: 'Workout'}
});

var Schedule = mongoose.model ('Schedule', scheduleSchema);

module.exports = Schedule;
