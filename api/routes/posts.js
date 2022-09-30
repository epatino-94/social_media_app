var express = require("express");
var {getPosts, getPostAvatar, addPost} = require("../controllers/posts");


const router = express.Router();


router.get('/avatar/:id',getPostAvatar)
router.get('/',getPosts)
router.post('/add',addPost)




module.exports = router;
