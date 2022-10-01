var db  = require('../db.js');


const getUsers = (req, res) => {
    const q = "SELECT `username`, `firstname`, `lastname` FROM users WHERE users.username LIKE ? ";
    db.query(q,[req.params.query+'%'], (err, data) => {
        if (err) return res.status(500).send(err)
        return res.status(200).json(data);
    })
}

const getUsersById = (req, res) => {
    const q = "SELECT `username`, `firstname`, `lastname`,`bio` FROM users WHERE users.username = ?; ";
    const p = "SELECT * FROM posts where posts.uid = ?;";
    const param = req.params.query;
    db.query(q+p,[param,param], (err, data) => {
        if (err) return res.status(500).send('Error Retrieving User Profile')
        return res.status(200).json(data);
    })

}



module.exports = {
    getUsers: getUsers,
    getUsersById: getUsersById,
}