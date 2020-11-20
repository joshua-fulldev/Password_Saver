const GetNotesRouter = require('express').Router();
const Note = require('../models/Notes');

GetNotesRouter.get('/:Logged_username', (request, response) => {
    const username = request.params.Logged_username;
    console.log(username);

    console.log("jsdjs");
    Note.find({'owner': username}, 'url username password').then(res => {
        if (res.length == 0) {
            response.status(200).json({message: "No Stored Data found"})
        }else {
            response.status(200).json(res);
        }
    }).catch(err => {
        console.log("Second", Username);
        response.send("Something bad happened");
})
})


GetNotesRouter.get('/:username/:id', (request, response) => {
    const id = request.params.id;

    Note.find({'id': id}, 'url username password').then(res => {
        if (res.length == 0) {
            response.status(200).json({message: "No Stored Data found associated with the ID"})
        }
        else {
            response.status(200).json(res);
        }
    }).catch(err => {
        console.log("Hello I am here");
        console.log(err);
    })
})

GetNotesRouter.get('/', (request, response) => {
    Note.find({}).then(res => {
        response.status(200).json(res)
    })
    .catch(err => {
        console.log("Hello");
        console.log(err);
    })
})


/*
GetNotesRouter.get('/search/:id_letter', (response, request) => {
    const letter = request.params.id_letter;

    Note.find({
        id : {
            $regex: new RegExp(letter),
        }
    }).then(res => {
        if (res.length != 0){
            response.json(res);
        }
        else {
            response.statusCode(400).send("Id not found");
        }        
    })
    .catch(err => {
        console.log(err);
    })

})

*/


module.exports = GetNotesRouter;