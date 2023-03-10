const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://akarosmi:4rUQ5lmUPEd2hzLw@cluster0.ego7r98.mongodb.net/test")
.then(() => {
    console.log("Database Connected Successfully");
    console.log("===============================================");
})
.catch((err) => {
    console.log("Database Not Connected");
    console.log("===============================================");
})