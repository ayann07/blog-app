import React, { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {authActions} from '../redux/store';
import { toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();

  const dispatch=useDispatch();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  })
  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState, [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/user/login', {
        email: inputs.email,
        password: inputs.password
      })
      if (data.success) {
        localStorage.setItem('userId',data?.user._id);
        dispatch(authActions.login());
        toast.success('user login successful')
        navigate('/blogs')
      }
    }
    catch (error) {
      console.log(error)
      if (error.response && error.response.status === 401) {
        toast.error('Invalid username or password. Please try again.');
      }
  }
}
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={450} display="flex" flexDirection="column" alignItems="center" justifyContent="center" margin="auto" marginTop={3} boxShadow="10px 10px 20px #ccc" padding={3} borderRadius={5}>
          <Typography variant='h4' padding={3} textAlign="center" fontFamily="times-new-roman" >Login</Typography>
          <TextField placeholder='email' value={inputs.email} onChange={handleChange} name='email' margin='normal' type='email' required />
          <TextField placeholder='password' value={inputs.password} onChange={handleChange} name='password' margin='normal' type='password' required />
          <Button variant='contained' type='submit' sx={{ marginY: 2 }}>Submit</Button>
          <Button onClick={() => navigate("/register")}>Not a registered user? Please Register</Button>
        </Box>
      </form>
    </div>
  )
}

export default Login