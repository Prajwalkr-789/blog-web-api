const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required: true,
        minLength : [6,"Minimum 6 chracter required"]
    }
});

userSchema.pre('save',async function(next){

        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password,salt)
        next()
})
userSchema.post('save',async function(next){
    console.log("New user created",this)
})


userSchema.statics.checklogin = async function (username, password, res) {
    const user = await this.findOne({ username });
    if (user) {
      const checkpass = await bcrypt.compare(password, user.password);
      if (checkpass) {
        return user;
      } else {
        throw Error('Password is wrong')
      }
    } else {
    //   return res.status(401).send({ message: 'The username is not found' });
    throw Error('Username not found')
    }
  };

const User = mongoose.model('User', userSchema);


const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type : Date,
        default : Date.now,
        required: true
    }
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = { User, Blog };
