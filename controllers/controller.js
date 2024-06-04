const {User,Blog} = require('../models/module')
const jwt = require('jsonwebtoken')

const createtoken = async (id) =>{
   return await jwt.sign({id},'Prajwal kr',()=>{
        console.log("Error occured")
    })
}

module.exports.sign_up = async (req,res) =>{
    const {username,password} = req.body
    try {
        const user = await User.create({
        username,password
    })
    if(user){
        const token = createtoken(user._id)
        res.cookie('jwt' , token,{httponly : true,maxAge : 24 *24 *60*60*12})
        res.status(201).send({message : "Success"})
    }
    else{
        res.status(404).send({message : "Not scuccessful"})
    }
    } catch (error) {
        console.error(error)
    }
    
}

module.exports.login = (req,res)=>{
    const {username,password} = req.body;
   const check =  User.checklogin(username,password)
   if(check){
        const token = createtoken(check._id)
        res.cookie('jwt',token,{httponly : true})
        res.status(201).send("Success")
   }
   else{
    res.status(404).send("Not an user")
   }
}

module.exports.logout = (req,res) =>{
    res.clearCookie('jwt');
    res.status(201).send({status : "Logged out successfully"})
}

module.exports.createblog = (req,res) =>{
    const {title,image,description,category,content,author} = req.body
    try {
        const blogu = Blog.create({title,image,description,category,content,author})
        if(blogu){
            res.status(201).send({message : "Blog Created"})
        }
        else{
            res.status(401).send({message : "Blog not Created"})
        }
    } catch (error) {
        res.status(401).send({message : "Something happened while Creating the blog"})
    }
}

module.exports.fetchdata =async (req,res) =>{
    try {
        const data = await Blog.find({});
        if(data){
            res.json(data).status(201)
        }
        else{
            res.status(401).send({message : "Not succesful"})
        }
        
    } catch (error) {
        console.error(error)
    }
}