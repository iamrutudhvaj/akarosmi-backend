const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    bookId :{
        type : String,
        ref : 'book'
    },
    personId : {
        type : String,
        ref : 'person'
    },
    borrowedDate : {
        type : String,
        require : true
    },
    returnDate :{

    },
    status : {

    }
},{
    timestamps: true
},{
    collection : 'transaction'
});

module.exports = mongoose.model('transaction', transactionSchema);