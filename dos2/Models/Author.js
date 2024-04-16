const mongoose = require('mongoose');


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
    Author
} 