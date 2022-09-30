var express = require("express");
var {getPosts, getPostAvatar} = require("../controllers/posts");


const router = express.Router();


router.get('/avatar/:id',getPostAvatar)
router.get('/',getPosts)




module.exports = router;
