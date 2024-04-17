const express = require("express")
const router = express.Router()
const asyncHandler = require("express-async-handler")
const {User,validateRegister,validateLogin,validateUpdate} = require("../Models/User")
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken")
const {verifyToken} = require("../middlwares/verifyToken")

/*

@desc => Update User
@route => /api/users/:id
@method => PUT
@access => private
*/
router.put("/:id",verifyToken,asyncHandler(async(req,res)=>{



    if(req.params.id != req.user.id)
                {
                   return  res.status(403).json({message:"you are not authorized to update this user"})
                    
                }


    const {error} = validateUpdate(req.body)
    if(error){
        res.status(400).json({message:error.deatils[0].message})
    }

    if(req.body.password){
        const solt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password,solt)

    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: {
            email:req.body.email,
            password:req.body.password,
            username:req.body.username,
        }
    },{new:true}).select("-password")


    res.status(200).json(updatedUser)


}))



/*

@desc => get all Users
@route => /api/users/
@method => PUT
@access => private
*/
router.get("/",asyncHandler(async(req,res)=>{

 const allUsers = await User.find().select("email password");
  
    res.status(200).json(allUsers)


}))


module.exports = router ;