var db = require('../db');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const nodemon = require('nodemon');


const register = (req,res) => {

    const q = "SELECT * FROM users where username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json('Username is unavailable!');


        //Hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt)

        const q = "INSERT INTO users(`username`,`bio`,`password`,`img`,`firstname`,`lastname`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.bio,
            hash,
            req.body.img,
            req.body.firstName,
            req.body.lastName
        ]

        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json('User has been created!');
        })

    })
    
}

const login = (req,res) => {

    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q,[req.body.username],(err,data)=>{
        if (err) return res.json(err);
        if(data.length === 0) return res.status(404).json("User not found!");

        //Check Password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password,data[0].password);

        if(!isPasswordCorrect) return res.status(400).json('Incorrect username or password!');

        const token = jwt.sign({id:data[0].username},"jwtkey");

        console.log(token);

        const {password, ...other} = data[0]

        res.cookie('access_token',token,{
            httpOnly: true,
        }).status(200).json(other);

    })
}

const logout = (req,res) => {
    res.clearCookie("access_token",{
    }).status(200).json("User has been logged out.")
}

module.exports = {
    login: login,
    logout: logout,
    register: register
}