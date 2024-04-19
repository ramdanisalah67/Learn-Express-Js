const asyncHandler = require("express-async-handler")
const {User} = require("../Models/User")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
/*

@desc => Forgot password
@route => /password/forgot
@method => GET
@access => public
*/


module.exports.forgetPasswordView= asyncHandler((req,res)=>{
    res.render('forgot-password')
})




        /*

        @desc => Forgot password
        @route => /password/reset-password
        @method => GET
        @access => public
        */



module.exports.sendForgetPasswordLink= asyncHandler(async (req,res)=>{
    console.log(req.body.email)

    //make sure that user exist
    const userFound = await User.findOne({email:req.body.email})

    if(!userFound){
      return res.status(400).send({message:"user not found !!"})
    }
    const secret = process.env.JWT_SEC_KEY + userFound.password ;
    const token = JWT.sign({email: userFound.email,id:userFound._id},secret,{expiresIn:'10m'});

    const link = `http://localhost:5000/password/reset-password/${userFound._id}/${token}`

    res.json({message:"Click On the Link",resetPasswordLink:link});



   
})



   /*

        @desc => Forgot password
        @route => /password/reset-password
        @method => GET
        @access => public
        */



module.exports.getResetPasswordView= asyncHandler(async (req,res)=>{
    console.log("reset password view")
    console.log(req.params.id)

    //make sure that user exist
    const userFound = await User.findById(req.params.id)
    if(!userFound){
      return res.status(400).send({message:"user not found !!"})
    }
    console.log(userFound.email)

    const secret = process.env.JWT_SEC_KEY + userFound.password ;

    try {
        JWT.verify(req.params.token,secret);
        
        res.render('reset-password',{email:userFound.email})
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error" });    }
    
    
    
    const link = `<a href='http://localhost:5000/password/reset-password/${user._id}/${token}>click here</a>`

    res.json({message:"Click On the Link",resetPasswordLink:link});


})


   /*

        @desc => change  password
        @route => /password/reset-password
        @method => POST
        @access => public
        */

module.exports.changePassword= asyncHandler(async (req,res)=>{

    //make sure that user exist
    const userFound = await User.findById(req.params.id)
    if(!userFound){
      return res.status(400).send({message:"user not found !!"})
    }
    
    const secret = process.env.JWT_SEC_KEY + userFound.password ;
    console.log(req.body.password)
    try {
        JWT.verify(req.params.token,secret);
        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password,salt) 
        userFound.password = req.body.password
        await userFound.save()
        res.render("success-password")
    } catch (error) {
        console.log-(error)
        res.json({message:"error"})
    }
    
    
    
    const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`

    res.json({message:"Click On the Link",resetPasswordLink:link});


})