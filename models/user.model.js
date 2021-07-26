const mongoose = require('mongoose');

const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo:
        {
            type : String,
            required : true,
            minlength : 3,
            maxlength : 255,
            unique : true,
            trim : true
        },

        email : 
        {
            type:String,
            required : true,
            validate : [isEmail] ,
            lowercase : true,
            trimp : true
        },

        password : 
        {
            type : String,
            required : true,
            max : 1024,
            min : 6
        },
        
        picture : 
        {
          type : String,
          default  :"./uploads/profil/random_user.png"
        },

        bio : 
        {
            type : String,
            max : 4096
        },

        followers : 
        {
            type : [String]
        },

        following : 
        {
            type : [String]
        },

        likes : 
        {
            type : [String]
        }
    },
    {
        timestamps : true,
    }
)


//play function befoe save into DB
userSchema.pre("save",async function(next){
    
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt);
    next();
});


userSchema.statics.login = async function(email,password)
{
     user = await this.findOne({email});
     if(user)
     {
         const auth = await bcrypt.compare(password,user.password);
        console.log(user.password+" "+ password);
         if(auth)
         {
             return user;
         }
         throw Error('incorrect password');
     }
     throw Error('incorrect email');
}


const UserModel = mongoose.model('user' , userSchema);

module.exports = UserModel;