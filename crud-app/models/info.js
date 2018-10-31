const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const infoSchema = new Schema({
    Name: String,
    PhoneNumber: Number
})

mongoose.model('info', infoSchema)