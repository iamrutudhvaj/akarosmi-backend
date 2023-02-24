require("dotenv").config();
const jwt = require("jsonwebtoken");
const user = require("../model/user.model");

exports.verify = async (req, res, next) => {
    try {
        
        const Token = req.headers['authorization'];
        if (Token) {

            const decoded = jwt.verify(Token, process.env.USER_AUTH_TOKEN);
            console.log("decoded:::", decoded);
            const data = await user.findById({ _id: decoded._id });
            console.log("data::", data);

            if (data) {

                req.user = data;
                if (Token == data.token) {
                    next();
                }
                else {
                    res.status(401).json({
                        message: "UNAUTHORIZED",
                        status: 401
                    })
                }

            }
            else {

                res.status(404).json({
                    message: "DATA NOT FOUND!",
                    status: 404
                })

            }
        } else {

            res.status(403).json({
                message: "FORBIDEN",
                status: 403
            })

        }
    } catch (error) {

        console.log("ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })

    }
}

