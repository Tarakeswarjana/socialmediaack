const FriendRequest = require("../Model/FriendRequestModel");
const UserModel = require('../Model/User')
const Likes = require("../Model/likeModel");
const Posts = require("../Model/postMode");

const Comments = require("../Model/postMode");




exports.createPosts = async (req, res) => {

    const post = new Posts({
        userId: req.params.id,
        content: req.body.content,

    });

    await post.save().then(data => {
        res.send({
            message: "User created successfully!!",
            posts: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user"
        });
    });


}

exports.getAllPosts = async (req, res) => {


    try {
        const allposts = await Posts.aggregate([
            // {
            //     $match: {
            //         __v: 0
            //     }
            // },

            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $project: {
                    _id: 0,
                    postContent: '$content',
                    userEmail: '$userDetails.email',
                    userFirstName: '$userDetails.firstname',
                },
            },

        ]);

        res.status(200).send({ msg: "data fetched sucsessfully", data: allposts })
    } catch (err) {
        console.error(err);
        // Handle the error as needed
    }



}


exports.CommentPost = async (req, res) => {

    const comments = new Comments
        ({
            userId: req.body.userId,
            postId: req.params.postId,
            comment: req.body.comment
        })

    await comments.save().then((data) => {
        res.send({
            message: "commented successfully!!",
            coments: data
        }).catch(err => {
            res.status(500).send({ msg: err.message || "Server Error" })
        })

    })

}

exports.likesPost = async (req, res) => {
    const likes = new Likes({
        userId: req.body.userId,
        postId: req.params.id,
        likeCount: req.body.likeCount,
        icon: req.body.icon
    })
    await likes.save().then((data) => {
        res.send({
            message: "liked successfully!!",
            coments: data
        }).catch(err => {
            res.status(500).send({ msg: err.message || "Server Error" })
        })
    })
}

exports.SendfriendRequest = async (req, res) => {

    const friendRequest = new FriendRequest({
        userId: req.params.userID,
        friendId: req.body.friendId,
        acceptStatus: "pending"
    })
    await friendRequest.save().then((data) => {
        res.send({
            message: "Friend Request Send Succsessfuly",
            data: data
        }).catch((err) => { res.status(500).send({ msg: err.message || "Server Error" }) })
    })

}

exports.acceptfriendRequest = async (req, res) => {


    const updatedata = await FriendRequest.findByIdAndUpdate({ _id: req.params.requestId }, { acceptStatus: "done1" }, { new: true })


    res.status(500).json(updatedata)


}
