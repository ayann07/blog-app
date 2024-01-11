import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const CreateBlog = () => {
  const id=localStorage.getItem('userId')
  const navigate=useNavigate(); 
  const [inputs,setInputs]=useState({
    title:'',
    description:'',
    image:''
  })
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try 
    {
      const {data}=await axios.post('http://localhost:5000/api/blog/create-blog',{
        title:inputs.title,
        description:inputs.description,
        image:inputs.image,
        user:id
      })
      if(data?.success)
      {
        toast.success('Blog created!')
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
      <Typography variant='h2' my={3} textAlign='center' fontFamily='times-new-roman'>Create a post</Typography>
      <form onSubmit={handleSubmit}>
       <Box padding={3} margin='auto' boxShadow='10px 10px 20px #ccc' display='flex' flexDirection='column'  maxWidth={450}>
       <TextField placeholder='title' value={inputs.title} onChange={handleChange} name='title' margin='normal' required />
       <TextField placeholder='description' value={inputs.description} onChange={handleChange} name='description' margin='normal' required />
       <TextField placeholder='image url' value={inputs.image} onChange={handleChange} name='image' margin='normal' required/>
       <Button variant='contained' type='submit' sx={{ marginY: 2,width:'20%',ml:'10rem' }}>Submit</Button>
       </Box>
      </form>
    </div>
  )
}

export default CreateBlog