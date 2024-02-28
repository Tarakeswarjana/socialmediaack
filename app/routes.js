const express = require("express")
const router = express.Router()
const UserController = require("../app/controler")
const PostControler = require("./PostControler")








//...............Authentication......//

// router.post('/create', UserController.create);
// router.post('/login', UserController.userLogin);





//..................................................................users........//

router.get('/getAllUsers', UserController.getAllUsers)
// router.get('/findAll', UserController.findAll);
// // router.get('/findOne/:id', UserController.findOne);
// router.post('/findOne', UserController.findOne);
router.post('/UpdateOne/:id', UserController.UpdateOne);
router.delete('/DeleteOne/:id', UserController.DeleteOne);

// //.......................................................... todo app
// router.post('/Addtodo', UserController.Addtodo);

// router.get('/alltodo', UserController.allTodo)
// router.get('/findonetodo/:id', UserController.findonetodo)
// router.post('/updateonetodo/:id', UserController.updateonetodo)
// router.post('/findtodo', UserController.findbytodos)

//...................posts..............
router.post('/CreatePost/:id', PostControler.createPosts)
router.get('/getAllPosts', PostControler.getAllPosts)


router.post('/Comment/:postId', PostControler.CommentPost)
router.post('/likes/:postId', PostControler.likesPost)
router.post('/friendRequest/:userID', PostControler.SendfriendRequest)
router.post('/friendRequestAccept/:requestId', PostControler.acceptfriendRequest)









module.exports = router