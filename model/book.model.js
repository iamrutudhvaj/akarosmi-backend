const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
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
        default: 1 // 1-Available 2-Allocated 3-Away
    }
}, {
    timestamps: true
}, {
    collection: 'book'
});

module.exports = mongoose.model("book", bookSchema);