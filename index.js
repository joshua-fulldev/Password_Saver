const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const loginRouter = require('./controllers/loginRouter');
const signUpRouter = require('./controllers/signUpRouter');
const addNoteRouter = require('./controllers/addNoteRouter');
const getNoteRouter = require('./controllers/GetNotesRouter');
const { response } = require('express');

const config ={
    useNewUrlParser : true,
    useUnifiedTopology: true
}


mongoose.connect(process.env.MONGOURI, config).then(() =>{
    console.log("Succesfully connected to the MONGODB server");
})
.catch(err => {
    console.log("Something happened", err)
})

const PORT = process.env.PORT || 3000;

/*app.use(bodyParser.urlencoded({ extended: true }));*/
app.use(bodyParser());

app.use(express.static(path.join(__dirname, "build")));

app.use('/api/login', loginRouter);

app.use('/api/signUp', signUpRouter);

app.use('/api/addNote', addNoteRouter);

app.use('/api/getNotes', getNoteRouter);

app.get('/api/', (request, response) => {
    console.log("Hello world");
    response.send("Hello World");
})

app.listen(PORT, () => {
    console.log("Server is working");
})
