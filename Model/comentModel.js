
const { Mongoose, default: mongoose } = require("mongoose");


const Comentschema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    postId: { type: "string", required: true },
    comment: {
        type: "string"
    }
})


const Comments = new mongoose.model("Coments", Comentschema)
module.exports = Comments;
