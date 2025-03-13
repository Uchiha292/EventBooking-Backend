import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel',
    },
    eventId: Number,
    name: String,
    description: String,
    date: Date,
    time: String,
    category: String,
});
const Event = mongoose.model('Event', eventSchema);
export default Event;