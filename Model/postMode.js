const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Posts = mongoose.model("posts", schema);

module.exports = Posts;