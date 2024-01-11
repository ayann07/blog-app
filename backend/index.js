const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const morgan=require('morgan');
const dotenv=require('dotenv');
const userRoutes=require('./routes/userRoutes');
const blogRoutes=require('./routes/blogRoutes');
dotenv.config();

const app=express();
const PORT=process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/user',userRoutes);
app.use('/api/blog',blogRoutes);

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("connected to database")).then(
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}!!`)
})
).catch(err=>console.log(err));
