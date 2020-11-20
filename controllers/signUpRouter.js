const signUpRouter = require('express').Router();
const UserPass = require('../models/UserPass');
const bcrypt = require('bcrypt');
const saltRounds = 1;
var HashPassword;


signUpRouter.post('/', (request, response) => {
    const {username, password} = request.body;

    UserPass.find({'username': username}).then(res => {
        if (res.length != 0) {
            response.status(400).json({message: "Username is already in use..."})
        }else {
            bcrypt.genSalt(saltRounds, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    HashPassword = hash;
                    console.log(hash);
                });
            });

            const newUser = new UserPass({
                username: username,        
                password: HashPassword
            })
        
            newUser.save().then(res => {
                console.log(res);
                response.status(200).send(res);
            })
            .catch(err => {
                response.status(400).send(err);
            })
        }
    })    
})

module.exports = signUpRouter;