const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },

    id: {
        type: String,
        required: false
    },

    url: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Note', noteSchema);