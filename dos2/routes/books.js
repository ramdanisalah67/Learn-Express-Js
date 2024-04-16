const express = require("express");
const router = express.Router()

//==Variables :

const books=[
    {id:1,name:"book1"},
    {id:2,name:"book2"},
    {id:3,name:"book3"},
    {id:4,name:"book4"},
    {id:5,name:"book5"},
    {id:6,name:"book6"},

]
//==Http Methods /Verbs



router.get("/welcome",(req,res)=>{
    res.send("welcome salah-eddine To Express Js")
});



/*

@desc => Get all books
@route => /api/books
@method => Get
@access => public
*/
router.get("",(req,res)=>{
    res.status(200).json(books)
})


/*

@desc => Get book by id
@route => /api/books/:id
@method => Get
@access => public
*/

router.get("/:id",(req,res)=>{
    const bookFound = books.find(b=>b.id === parseInt(req.params.id)) 
    if(bookFound){
        res.status(200).json(bookFound)
    }
    else res.status(404).json({message:'book not found'})
})

//Post Method & validation of request ==> in scearion that we have request contains many input it makes hard to handle validation with our hand so we need 'joi'

const Joi = require('joi')


/*

@desc => save a book
@route => /api/books/save
@method => POST
@access => public
*/

router.post("/save",(req,res)=>{
    console.log(req.body)

 /*   if(!req.body.name){
        return res.status(404).json({message:'name is required'}); //we dont need this anymore we will use joi
    } 
    */
   const {error} = validate_input(req.body);

   if(error) {
    return res.status(404).json({message:error.details[0].message}) ;
   }

    const book = {
        id:books.length+1,
        name:req.body.name
    }
    books.push(book)
    res.status(200).json({message:'book saved succesfully !!'})
})


/*

@desc => update book
@route => /api/books/:id
@method => PUT
@access => public
*/

router.put("/:id",(req,res)=>{
    const {error} = validate_input(req.body);

    if(error){
        return res.status(404).json({message:error.details[0].message}) ;

    }

    const book = books.find(b=>b.name === req.body.name)
    if(book){   
        console.log(book);
        return res.status(200).json({message:'book has been updated'})
    }
    else {
        return res.status(404).json({message:'book not found'})
    }



})




/*

@desc => delete book
@route => /api/books/:id
@method => Get
@access => public
*/



router.delete("/:id",(req,res)=>{
   
    const book = books.find(b=>b.id === parseInt(req.params.id))
    if(book){   
        console.log(book);
        return res.status(200).json({message:'book has been deleted'})
    }
    else {
        return res.status(404).json({message:'book not found'})
    }



})
















module.exports = router


//========================= Functions ==================================

function validate_input(obj) {
    const schema = Joi.object({
        name:Joi.string().trim().min(3).max(10).required()
       })

       return schema.validate(obj)
    
}