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

module.exports.deleteUser = async (req , res) =>
{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    try
    {
     await UserModel.remove({_id: req.params.id}).exec();
     res.status(200).json({message : "Successfully deleted"});
    } catch (err)
    {
       return res.status(500).json({message : err});
    }
}

module.exports.follow = async(req , res) =>
{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }
    
    try
    {

    }
    catch(err)
    {
        return res.status(500).json({message : err});
    }
}


module.exports.follow = async(req , res) =>
{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    if(!ObjectID.isValid(req.body.idToFollow))
    {
        return res.status(400).send('ID To Follow Unknown : ' + req.body.idToFollow);
    }
    
    try
    {
       await UserModel.findByIdAndUpdate(
           req.params.id,
           {$addToSet : {following : req.body.idToFollow} },
            {
                new : true,
            upsert : true 
            },
        (err,data)=>
        {
            if(!err)
            {
                 res.status(201).json(data);
            }
            else
            {
                return res.status(400).json({message : err});
            }
        }    
           );

           await UserModel.findByIdAndUpdate(
               req.body.idToFollow,
               {$addToSet : {followers : req.params.id}},
               {
                new : true,
               upsert : true 
               },

               (err ,data)=>
               {
                   if(err) return res.status(400).json(err);
               }
           )
    }
    catch(err)
    {
        return res.status(500).json({message : err});
    }
}



module.exports.unfollow = async(req , res) =>
{
    if(!ObjectID.isValid(req.params.id))
    {
        return res.status(400).send('ID Unknown : ' + req.params.id);
    }

    if(!ObjectID.isValid(req.body.idToUnFollow))
    {
        return res.status(400).send('ID To Unfollow Unknown : ' + req.body.idToUnFollow);
    }
    
    try
    {
       await UserModel.findByIdAndUpdate(
           req.params.id,
           {$pull : {following : req.body.idToUnFollow} },
            {
                new : true,
            upsert : true 
            },
        (err,data)=>
        {
            if(!err)
            {
                 res.status(201).json(data);
            }
            else
            {
                return res.status(400).json({message : err});
            }
        }    
           );

           await UserModel.findByIdAndUpdate(
               req.body.idToUnFollow,
               {$pull : {followers : req.params.id}},
               {
                new : true,
               upsert : true 
               },

               (err ,data)=>
               {
                   if(err) return res.status(400).json(err);
               }
           )
    }
    catch(err)
    {
        return res.status(500).json({message : err});
    }
}


