const mongoose = require('mongoose');
const Joi = require("joi")


const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength:3,
        maxLength:100
    },
    author :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        required: true
    },
    price: {
        type: Number,
        required: true,
        min:5
    },
    description: {
        type: String ,
        required:true,
        minLength:10,
        maxLength:200
    },
    cover: {
        type:String,
        required:true,
        enum :["soft cover","hard cover"]
    }
    
},
);


const Book = mongoose.model("Book",BookSchema);

module.exports = {
    Book,
    validate_input
} 


//========================= Functions ==================================


//========================= Functions ==================================

function validate_input(obj) {
    const schema = Joi.object({
        name:Joi.string().trim().min(3).max(10).required(),
        author:Joi.string().required(),
        price:Joi.number().integer().min(100).required(),
        description:Joi.string().trim().min(10).max(20).required(),
        cover:Joi.string().valid("soft cover","hard cover").required(),


       })

       return schema.validate(obj)
    
}