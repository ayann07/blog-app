import React, { useState } from 'react'
import {Box,Typography,TextField,Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({
    name:'',
    email:'',
    password:''
  })
  const handleChange=(e)=>{
    setInputs(prevState=>({
      ...prevState,[e.target.name]:e.target.value
    }))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
    const {data}=await axios.post('http://localhost:5000/api/user/register',{
      username:inputs.name,
      email:inputs.email,
      password:inputs.password
    })
    if(data.success)
    {
      navigate('/login')
      toast.success('registered successfully')
    }  
    } 
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <Box maxWidth={450} display="flex" flexDirection="column" alignItems="center" justifyContent="center" margin="auto" marginTop={3} boxShadow="10px 10px 20px #ccc" padding={3} borderRadius={5}>
        <Typography variant='h4' padding={3} textAlign="center" fontFamily="times-new-roman" >Register</Typography>
        <TextField placeholder='name' value={inputs.name} onChange={handleChange} name='name' margin='normal' type='text' required/>
        <TextField placeholder='email'value={inputs.email} onChange={handleChange} name='email' margin='normal' type='email' required/>
        <TextField placeholder='password'value={inputs.password} onChange={handleChange} name='password' margin='normal' type='password' required/>
        <Button variant='contained' type='submit' sx={{marginY:2}}>Submit</Button>
        <Button onClick={()=>navigate("/login")}>Already Registered? Please Login</Button>
      </Box>
      </form>
    </div>
  )
}

export default Register