const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/Akarosmi")
.then(() => {
    console.log("Database Connected Successfully");
    console.log("===============================================");
})
.catch((err) => {
    console.log("Database Not Connected");
    console.log("===============================================");
})