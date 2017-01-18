var mongoose = require ('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema ({
    date: Date,
    content: String,
    to: { type: Schema.Types.ObjectId, ref: 'User'},
    from: { type: Schema.Types.ObjectId, ref: 'User'},
    // Message can possibly be linked to a specific workout.
    workout: { type: Schema.Types.ObjectId, ref: 'Workout'}
})

var Message = mongoose.model ('Message', messageSchema);
module.exports = Message;
