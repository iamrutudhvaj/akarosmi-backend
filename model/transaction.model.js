const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    bookId: {
        type: String,
        ref: 'book'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
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
        ref: 'book'
    }
}, {
    timestamps: true
}, {
    collection: 'transaction'
});

module.exports = mongoose.model('transaction', transactionSchema);