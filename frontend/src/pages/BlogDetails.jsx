import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
const BlogDetails = () => {
    const [blog,setBlog]=useState({});
    const id=useParams().id;
    const navigate=useNavigate();
    const getBlogDetail=async()=>{
        try 
        {
          const {data}=await axios.get(`http://localhost:5000/api/blog/get-blog/${id}`)
          if(data?.success)
          {
            setBlog(data?.blog)
            setInputs({
                title:data?.blog.title,
                description:data?.blog.description,
                image:data?.blog.image
            })
          }    
        } 
        catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getBlogDetail()
    },[id])
    console.log(blog)
    const [inputs,setInputs]=useState({})
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try 
        {
          const {data}=await axios.put(`http://localhost:5000/api/blog/update-blog/${id}`,{
            title:inputs.title,
            description:inputs.description,
            image:inputs.image,
            user:id
          })
          if(data?.success)
          {
            toast.success('Blog updated')
            navigate('/my-blogs')
          }
        } 
        catch (error) {
          console.log(error)
        }
      }
      const handleChange=(e)=>{
       setInputs(prevState=>({
        ...prevState,[e.target.name]:e.target.value
       }))
      }
  return (
    <div>
        <Typography variant='h2' my={3} textAlign='center' fontFamily='times-new-roman'>Update your post</Typography>
        <form onSubmit={handleSubmit}>
       <Box padding={3} margin='auto' boxShadow='10px 10px 20px #ccc' display='flex' flexDirection='column'  maxWidth={450} >
       <TextField placeholder='title' value={inputs.title} onChange={handleChange} name='title' margin='normal' required />
       <TextField placeholder='description' value={inputs.description} onChange={handleChange} name='description' margin='normal' required />
       <TextField placeholder='image url' value={inputs.image} onChange={handleChange} name='image' margin='normal' required/>
       <Button variant='contained' type='submit' sx={{ marginY: 2,width:'20%',ml:'10rem' }}>Update</Button>
       </Box>
      </form>
    </div>
  )
}

export default BlogDetails
