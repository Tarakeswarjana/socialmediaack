const { Mongoose, default: mongoose } = require("mongoose");
const schema = new mongoose.Schema({
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },

    firstname: { type: "string", default: "tarak" },

    lastName: { type: "string", default: "jana" },
    profilePic: { type: "string", }
})
var user = new mongoose.model("user", schema);
module.exports = user;
