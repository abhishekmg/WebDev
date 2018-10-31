const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
   
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('users', UserSchema)