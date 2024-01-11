const mongoose=require('mongoose');
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

const blogModel=mongoose.model('Blog',blogSchema);
module.exports=blogModel;