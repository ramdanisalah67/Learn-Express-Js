const express = require("express")
const router = express.Router()
const {Author,validate_input} = require("../Models/Author")
const asyncHandler = require("express-async-handler")


//===========================================API Author================================================




//===========GET

router.get("/",

        asyncHandler(
                async (req,res)=>{

                    //== Pagination
                    const page = parseInt(req.query.page) || 1;
                    const limit = parseInt(req.query.limit) || 10;
                    const skip = (page - 1) * limit;

                    const authors = await Author.find().skip(skip).limit(limit);

                    res.status(200).json(authors)

               /*     console.log(req.query)
                    const allAuthors = await Author.find();
                //  const allAuthors2 = await Author.find().sort({country:1}).select("country -_id"); //ordred by fullName and get just countrues of author
                    res.status(200).json(allAuthors)*/


                }))


//========POST

router.post("/save",asyncHandler(async (req,res)=>{



       const {error} = validate_input(req.body)
       if(error){
           return res.status(404).json({message:error.details[0].message})
       }


        const author = new Author({
            fullName:req.body.fullName,
            country:req.body.country
        })

        const result =  await  author.save();
        res.status(200).json(result)
    

       
      
})
    );
       


//============Get Author By id
 router.get("/:id",asyncHandler(async (req,res)=>{

    const author = await Author.findById(req.params.id);

    if(author) {
        res.status(200).json(author)
    }
    else {
        res.status(404).json({message:"author not found !! "})
    }

 }))



//==================== PUT =================


router.put("/:id",asyncHandler(async (req,res)=>{

    const author = await Author.findByIdAndUpdate(req.params.id,{
        $set: {
            fullName: req.body.fullName,
            country: req.body.country
        }
    },{new:true})

    res.status(200).json(author);



}))



//==================== DELETE =================


router.delete("/:id",async (req,res)=>{

 try {
    const author = await Author.findById(req.params.id);

    if(author) {
        await  Author.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"author has been deleted !!"})
    }
    else {
            res.status(404).json({message:"author not found"})
    }
 }
 catch(error){
    console.log(error); 
    res.status(404).json({message:"Something went wrong !! "})
 }


})

module.exports = router


