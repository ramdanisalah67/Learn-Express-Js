const JWT = require("jsonwebtoken")

function verifyToken(req,res,next){
      const token = req.headers.token ;

      if(token){
            try {
                const decoded =  JWT.verify(token,process.env.JWT_SEC_KEY)
                req.user = decoded;
                next()
            } catch (error) {
                res.status(401).json({message:"invalid Token"})
            }
      }
      else {
        res.status(401).json({message:'no Token Provided'});
      }

}


module.exports = {
    verifyToken
}