const addNoteRouter = require('express').Router();
const Note = require('../models/Notes');
var Present_username;

addNoteRouter.post('/:username', (request, response) => {
    console.log("Entered the first middleware function");
    const Active_username = request.params.username;
    Present_username = Active_username;
    const requestBody = request.body;
    console.log("This is the request body", requestBody);
    const url = requestBody.url;
    const username = requestBody.username;
    const password = requestBody.password;
    
    const newNote = new Note({
        owner: Active_username,
        url: url,
        username: username,
        password: password
    })

    newNote.save().then(() => {
        response.sendFile( __dirname + '/build/index.html');
        /*response.redirect('../../../loggedhome')*/
        /*response.redirect('/api/getNotes/' + Present_username);*/
        /*response.sendFile("C:/Users/user/Desktop/Final/my-app/backend/build/index.html")*/
    })

    .catch(err => {
        response.status(400).send(err);
        console.log(requestBody);
    })
})


/*
addNoteRouter.get('/:username', async(request, response) => {
    Request_User =  await request.params.username;

    Note.find({ 'owner': 'Tennis' }, 'name age', function (err, athletes) {
        if (err) return handleError(err);
        // 'athletes' contains the list of athletes that match the criteria.
      })

    Note.find({'owner': Request_User}, 'url username password').then(res => {
        console.log(Request_User);
        response.json(res);
        console.log(res);
        console.log("I am here");
    })
    .catch(err => {
        response.send(err);
    })
})

*/

module.exports = addNoteRouter;
