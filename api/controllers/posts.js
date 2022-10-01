var db  = require('../db.js');
var jwt = require('jsonwebtoken');





const getPostAvatar = (req,res) => {
    const q = "SELECT `img` FROM users where users.username = ?";
    db.query(q,[req.params.id],(err,data)=>{
        if (err) return res.status(500).json('Error Retrieving Avatar Image');
        return res.status(200).json(data[0]);
    })
}

const getPosts = (req, res) => {
    const q = "SELECT * FROM posts";
    db.query(q, (err, data) => {
        if (err) return res.status(500).send('Error Retrieving Posts.')
        return res.status(200).json(data);
    })
}

const addPost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");

        const q = "INSERT INTO posts(`caption`,`imgurl`,`date`,`uid`) VALUES (?)"
        const values = [
            req.body.caption,
            req.body.imgurl,
            req.body.date,
            req.body.username,
        ]
        db.query(q,[values], (err,data)=>{
            if(err) return res.status(500).json(err);

            return res.json("Post has been created.")
        })
    })
}

const deletePost = (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not Authenticated!")

    jwt.verify(token,"jwtkey",(err,userInfo)=>{
        if(err) return res.status(403).json("Token is not valid!");


        console.log(userInfo);

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return res.status(403).json("You can delete only your posts!")

            return res.json("Post has been deleted");
        })
    })

}

module.exports = {
    getPosts: getPosts,
    getPostAvatar: getPostAvatar,
    addPost: addPost,
    deletePost: deletePost
}