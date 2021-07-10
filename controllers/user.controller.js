const UserModel = require('../models/user.model');
const ObjectID= require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async(req,res)=>
{
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}


module.exports.userInfo = (req , res) =>
{
    
    
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }
  
    UserModel.findById(req.params.id , (err,data)=>{
        if(!err) res.send(data);
        else console.log('ID unknown : ' + err);
    }).select('-password');
};


module.exports.updateUser = async (req ,res) =>
{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }
  
    try {
        await UserModel.findByIdAndUpdate(
            
                {_id : req.params.id},
            {
               $set:{
                   bio : req.body.bio
               }
            },
            {
                new: true,
                upsert: true,
                setDefaltOnInsert: true
            },

            (err,data)=>
            {
                if(!err)
                {
                    return res.send(data);
                }
                else
                {
                   return res.status(500).json({message: err});
                }
            }
        )
    } catch(err)
    {
       return res.status(500).json({message : err});
    }

};