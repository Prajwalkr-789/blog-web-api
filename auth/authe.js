const jwt = require('jsonwebtoken')

module.exports.checkuser = async (req,res) =>{
    const token = req.cookies.token
    try {
        const user = await jwt.verify(token,'Prajwal kr')
        if(user){
            res.status(201).send({message : "Successfull"})
        }
        else{
            res.status(401).send({message : "not Successfull"})
        }
    } catch (error) {
        res.status(401).send({message : "not Successfull"})
        console.log(error)
    }
   r
}
