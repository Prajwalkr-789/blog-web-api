const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000;
const routes = require('./routes/route');
const cors = require('cors')
const blogroute = require('./routes/blogroute')
const  mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(express.json({limit : '2mb'}))
app.use(cookieParser({limit : '2mb'}))
app.use(cors())
app.use('/user',routes)
app.use('/blog',blogroute)
app.get('/',(req,res)=>{
    res.json('Jai shree ram')
})
const dburl = 'mongodb+srv://prajwalkrp07:SVOzVfzrl7mJiUyA@cluster0.jpkht3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dburl)
        .then(()=>{
            app.listen(PORT,()=>{console.log("Server started and connected to database...")})
        })
        .catch(()=>{
            console.log("Something happened...")
        })


