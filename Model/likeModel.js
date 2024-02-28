
const { Mongoose, default: mongoose } = require("mongoose");



const likeSChema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    postId: { type: mongoose.Types.ObjectId, required: true },
    likeCount: {
        type: "string",
    },
    icon: { type: "string" }
})






const Likes = new mongoose.model("likes", likeSChema)
module.exports = Likes;