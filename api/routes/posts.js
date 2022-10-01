var express = require("express");
var {getPosts, getPostAvatar, addPost, deletePost} = require("../controllers/posts");


const router = express.Router();


router.get('/avatar/:id',getPostAvatar)
router.get('/',getPosts)
router.post('/add',addPost)
router.post('/delete/:id',deletePost)




module.exports = router;
