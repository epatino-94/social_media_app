var express = require("express");
var {getUsers,getUsersById} = require("../controllers/users");


const router = express.Router();

router.get('/:query',getUsers)
router.get('/profile/:query',getUsersById)


module.exports = router;
