const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://'+process.env.USER+'@cluster0.od8qi.mongodb.net/test',
{
   useNewUrlParser : true,
   useUnifiedTopology : true,
   useCreateIndex : true,
   useFindAndModify : false, 
}
)
.then(()=>console.log('Connected to MongoDb'))
.catch((err)=>console.log("Connexion failed",err));