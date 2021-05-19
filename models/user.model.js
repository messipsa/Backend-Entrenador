const mongoose = require('mongoose');

const {isEmail} = require('validator');

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

const UserModel = mongoose.model('user' , userSchema);

module.exports = UserModel;