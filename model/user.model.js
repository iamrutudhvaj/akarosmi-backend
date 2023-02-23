const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    uid: {
        type: String
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    phone_code: {
        type: String,
        require: true
    },
    phone_number: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String
    },
    token: {
        type: String
    }

}, {
    timestamps: true
}, {
    collection: 'user'
});



userSchema.methods.generateauthtoken = async function (res) {
    try {
        const generateToken = jwt.sign({ _id: this._id.toString() }, process.env.USER_AUTH_TOKEN )
        this.token = generateToken;
        return generateToken;
    }
    catch (error) {
        console.log('ERROR_MODEL:::', error);
        res.status(403).json({ 
            message: "TOKEN NOT GENERATE",
            status: 403
        })
    }
}


userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model("user", userSchema);