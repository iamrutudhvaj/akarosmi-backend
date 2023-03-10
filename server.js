const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
require("./database/connection");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res) => {
    res.send("WelCome! Akarosmi World")
})

const userRouter = require("./router/user.router");
const bookRouter = require("./router/book.router");
const personRouter = require("./router/person.router");
const transactionRouter = require("./router/transaction.router");
const aseetRouter = require("./router/asset.router");
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/person", personRouter);
app.use("/transaction", transactionRouter);
app.use("/asset", aseetRouter);

app.listen(port, () => {
    console.log("===============================================");
    console.log(`Server is Running At PORT : ${process.env.PORT}`);
})
