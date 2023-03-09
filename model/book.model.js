const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    publisher: {
        type: String,
        require: true
    },
    images: {
        type: mongoose.Schema.Types.Array,
        require: true
    },
    thumbnail: {
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
    collection: 'book'
});

module.exports = mongoose.model("book", bookSchema);