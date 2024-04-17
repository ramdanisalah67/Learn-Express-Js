const express = require("express");
const router = express.Router()
const asyncHandler = require("express-async-handler")
const {Book,validate_input} = require("../Models/Book")
//==Variables :


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
router.get("/",asyncHandler(

   async (req,res)=>{

    const books = await Book.find().populate("author",["_id","fullName"]);
    console.log(books)
    res.status(200).json(books)
}))


/*

@desc => Get book by id
@route => /api/books/:id
@method => Get
@access => public
*/

router.get("/:id",asyncHandler(async(req,res)=>{
    
    const bookFound = await Book.findById(req.params.id).populate("author",["_id","fullName"]);
    if(bookFound) {
        res.status(200).json(bookFound);
    }
    else {
        res.status(404).json({message:"book not found"})    
    } 

}))

/*

@desc => save a book
@route => /api/books/save
@method => POST
@access => public
*/

router.post("/save",asyncHandler(async(req,res)=>{


   const {error} = validate_input(req.body);

   if(error) {
    return res.status(404).json({message:error.details[0].message}) ;
   }

    const book = new Book({
        name:req.body.name,
        author:req.body.author,
        price:req.body.price,
        description:req.body.description,
        cover:req.body.cover
    })
   const bookSaved = await book.save();
   
    res.status(200).json({message:'book saved succesfully !!'+bookSaved.title})
})

)


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

