const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    bookId: {
        type: String,
        ref: 'book'
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
        require: true
    }
}, {
    timestamps: true
}, {
    collection: 'transaction'
});

module.exports = mongoose.model('transaction', transactionSchema);