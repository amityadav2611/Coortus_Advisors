const mongoose = require('mongoose')


const todoSchema =  new mongoose.Schema({
    Title: {
        type: String,
        require: true,
        trim : true
    },
    Email: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
    Password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true
      },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

const todoModel = mongoose.model('todo', todoSchema)


module.exports = {todoModel}


