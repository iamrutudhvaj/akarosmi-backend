const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    personId: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    mobileNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    reference: {
        type: String,
        require: true
    }

}, {
    timestamps: true
}, {
    collection: 'persons'
});

module.exports = mongoose.model('person', personSchema);