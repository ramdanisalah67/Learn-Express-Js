
const asyncHandler = require("express-async-handler")
const {Book,validate_input} = require("../Models/Book")

const allBook = asyncHandler(
    /*
    opertaors => visit mongodb operators website
    example :
            $eq , $ne, $lt,$lte,$gt,$gte,$in:[x,y],$nin[x,y]
    */

   async (req,res)=>{

    const books = await Book.find().populate("author",["_id","fullName"]);
    console.log(req.query)
    res.status(200).json(books)
})





const getBookById = asyncHandler(async(req,res)=>{
    
    const bookFound = await Book.findById(req.params.id).populate("author",["_id","fullName"]);
    if(bookFound) {
        res.status(200).json(bookFound);
    }
    else {
        res.status(404).json({message:"book not found"})    
    } 

})





const saveBook = asyncHandler(async(req,res)=>{


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




 const updateBook = asyncHandler(async(req,res)=>{
    const {error} = validate_input(req.body);

    if(error){
        return res.status(404).json({message:error.details[0].message}) ;

    }

    const book = await books.find(b=>b.name === req.body.name)
    if(book){   
        console.log(book);
        return res.status(200).json({message:'book has been updated'})
    }
    else {
        return res.status(404).json({message:'book not found'})
    }



})





const deleteBook = asyncHandler(async(req,res)=>{
   
    const book = await books.find(b=>b.id === parseInt(req.params.id))
    if(book){   
        console.log(book);
        return res.status(200).json({message:'book has been deleted'})
    }
    else {
        return res.status(404).json({message:'book not found'})
    }



})




module.exports = {
    allBook,
    getBookById,
    saveBook,
    updateBook,
    deleteBook
}
 