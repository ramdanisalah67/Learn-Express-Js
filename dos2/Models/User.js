const mongoose = require('mongoose');
const Joi = require("joi")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim:true,
        unique:true,
        minLength:5,
        maxLength:100
    },
    username :{
        type: String,
        required: true,
        trim:true,
        unique:true,
        minLength:2,
        maxLength:100
    },
    password :{
        type: String,
        required: true,
        trim:true,
        unique:true,
        minLength:6,
    },
    isAdmin :{
        type: Boolean,
        default:false
    },
 }, {timestamps:true}

);

//User Model 
const User = mongoose.model("User",userSchema);



//========================Validate Register User=====================


function validateRegister(obj){
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        username:Joi.string().trim().min(2).max(100).required(),
        password:Joi.string().trim().min(6).required(),
        isAdmin:Joi.boolean().default(false)
    })

    return schema.validate(obj)
}


//========================Validate Login User=====================


function validateLogin(obj){
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).required().email(),
        password:Joi.string().trim().min(6).required(),
    })

    return schema.validate(obj)
}

//========================Validate Update User=====================


function validateUpdate(obj){
    const schema = Joi.object({
        email:Joi.string().trim().min(5).max(100).email(),
        username:Joi.string().trim().min(2).max(100),
        password:Joi.string().trim().min(6),
        isAdmin:Joi.boolean().default(false)
    })

    return schema.validate(obj)
}






module.exports = {
    User,
    validateRegister,
    validateLogin,
    validateUpdate

}

