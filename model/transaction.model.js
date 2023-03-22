const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    bookId: {
        type: String,
        ref: 'book'
    },
    userId: {
        type: String,
        require: true
    },
    personId: {
        type: String,
        ref: 'person'
    },
    borrowedDate: {
        type: String,
        require: true
    },
    returnDate: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 2
    }
}, {
    timestamps: true
}, {
    collection: 'transaction'
});

module.exports = mongoose.model('transaction', transactionSchema);