import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: {
        type: String,
        unique: true
    },
    activeEvents: {
        type: Number,
        default: 0
    },
});
const User = mongoose.model('User', userSchema);
export default User;