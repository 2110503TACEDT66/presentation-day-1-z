const mongoose =require('mongoose') ;

const BookingSchema = new mongoose.Schema({
    apptData: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId ,
        ref: 'User' ,
        required: true,
    },
    Company: {
        type: mongoose.Schema.ObjectId ,
        ref: 'Company' ,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Booking',BookingSchema);
