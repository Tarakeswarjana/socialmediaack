const { default: mongoose } = require("mongoose");

const friendRequestModel = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    friendId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    acceptStatus: {
        type: "string",
        required: true,
        default: "pending"
    }
})



const FriendRequest = new mongoose.model("friendRequest", friendRequestModel)
module.exports = FriendRequest