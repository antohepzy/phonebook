const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    work:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
    }},
    {
        timestamps:true
    } 
)

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;