const loginRouter = require('express').Router();
const UserPass = require('../models/UserPass');
const bcrypt = require('bcrypt');



loginRouter.get('/:username/:password/', async(request, response) => {
    console.log("this is the request");
    console.log("THis is the url username", request.params.username);
    const username = request.params.username;
    const password = request.params.password;
    console.log(password);

    UserPass.find({'username': username}).then(res => {
        console.log(res);
        if (res.length != 0){
            UserPass.find({'username': username}, 'username password').then(res => {
                console.log(res.length);
                console.log(res[0].username);
                const passwordCorrect = bcrypt.compare(password, res[0].password);
                console.log("jkjdkjs")
                bcrypt.compare(password, res[0].password).then(ress => {
                    if (ress) {
                        response.status(200).send({status: "200"});
                    }
                    else {
                        response.status(404).send({status: "404"});
                    }
                })

                /*
                console.log(password);
                console.log(res[0].password);
                console.log(passwordCorrect);
                if (passwordCorrect) {
                    response.status(200).send({status: "200"});
                    response.redirect('/LoggedHome');
                }
                else {
                    response.status(200).json({status: "400"});
                }
                */

            })
            .catch(err => {
                console.log("There was an error");
            });
        }else {
            response.status(404).send({status : "404"});
        }
    }).catch(err => {
        console.log(err);
    })    
} )


loginRouter.get('/', (request, response) => {
    console.log("This is it");
    const requestBody = request.body;    
    console.log(requestBody);

    UserPass.find({'username': requestBody.username}).then(res => {
        console.log(res);
        if (res.length != 0){
            UserPass.find({}, 'username password').then(res => {
                const data = res;
                console.log(res.length);
                console.log(data[0].username);
                const passwordCorrect = bcrypt.compare(requestBody.password, res[0].password)
                if (passwordCorrect) {
                    response.status(200).send({status: "200"});
                }
                else {
                    response.status(404).send({status: "404"});
                    console.log(requestBody);
                }
            })
            .catch(err => {
                console.log("There was an error");
            });
        }else {
            response.status(404).send({status: "404"})
        }
    }).catch(err => {
        console.log(err);
    })    
} )



loginRouter.get('/fake_login', (request, response) => {
    response.sendFile("C:/Users/user/Desktop/Final/my-app/backend/page/index.html");
})



module.exports = loginRouter;