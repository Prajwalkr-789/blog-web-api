const {User,Blog} = require('../models/module')
const jwt = require('jsonwebtoken')
const maxAge =  24 * 60 *60;
const createtoken = async (id) =>{
   return await jwt.sign({id},'Prajwal kr',{expiresIn : maxAge})
}

module.exports.sign_up = async (req,res) =>{
    const {username,password} = req.body
    try {
        const user = await User.create({
        username,password
    })
    if(user){
        const token = createtoken(user._id)
        res.cookie('jwt' , token,{httponly : true,maxAge : maxAge * 1000 })
        res.status(201).send({message : "Success"})
    }
    else{
        res.status(404).send({message : "Not scuccessful"})
    }
    } catch (error) {
        console.error(error)
        
    }
    
}

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const check = await User.checklogin(username, password);

        if (check) {
            const token = await createtoken(check._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).send("Success");
        } else {
            res.status(401).send({ error: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).send({ error: "Internal server error" });
    }
};

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
        res.status(404).send({message : "Fetching data failed..."})
    }
}

module.exports.authentication =async (req,res) =>{
    console.log("Hitt")
    try {
        // console.log("The request" , req.cookies.jwt)
        const token = await req.cookies.jwt; 
        console.log("I am auth token : " , token)
        if (token === ' ' || token === undefined) {
            return res.status(401).send({ message: 'Token not found' });
        }
        const verified = await jwt.verify(token, 'Prajwal kr');
        if (verified) {
            res.status(201).send({ message: 'Success' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}

