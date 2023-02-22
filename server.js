require("dotenv").config();
require("./database/connection");
const express = require("express");
const cors = require("cors")
const app = express();

const port = process.env.PORT || 5000;

const userRouter = require("./router/user.router");
const bookRouter = require("./router/book.router");


app.use(express.json());
app.use(cors());



app.use(express.urlencoded({ extended: false }));


app.use("/user", userRouter);
app.use("/book", bookRouter);



app.listen(port, () => {
    console.log("===============================================");
    console.log(`Server is Running At PORT : ${process.env.PORT}`);
})
