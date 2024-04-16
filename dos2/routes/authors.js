const express = require("express")
const router = express.Router()
const Joi = require("joi")
const {Author} = require("../Models/Author")




router.get("/",async (req,res)=>{
    const allAuthors = await Author.find();
    res.status(200).json(allAuthors)
})



router.post("/save",async (req,res)=>{



       const {error} = validate_input(req.body)
       if(error){
           return res.status(404).json({message:error.details[0].message})
       }

       try {

        const author = new Author({
            fullName:req.body.fullName,
            country:req.body.country
        })

        const result =  await  author.save();
        res.status(200).json(result)
    }

       
       catch(error){
        console.log(error)
        res.status(500).json({message:'Something went wrong'})
       }
}
    );
       




module.exports = router


//========================= Functions ==================================

function validate_input(obj) {
    const schema = Joi.object({
        fullName:Joi.string().trim().min(3).max(10).required(),
        country:Joi.string().trim().min(3).max(10).required()

       })

       return schema.validate(obj)
    
}