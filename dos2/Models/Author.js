const mongoose = require('mongoose');
const Joi = require("joi")


const AuthorSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength:3,
        maxLength:10
    },
    country: {
        type: String,
        required: true,
        minLength:3,
        maxLength:10
    },
    
},{
    timestamps:true
}
);


const Author = mongoose.model("Author",AuthorSchema);

module.exports = {
    Author,
    validate_input
} 


//========================= Functions ==================================

function validate_input(obj) {
    const schema = Joi.object({
        fullName:Joi.string().trim().min(3).max(10).required(),
        country:Joi.string().trim().min(3).max(10).required()

       })

       return schema.validate(obj)
    
}