import React from 'react';
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import { toast } from 'react-toastify';
const Header = () => {
    const navigate=useNavigate();
    let isLogin=useSelector(state=>state.isLogin)
    isLogin=isLogin || localStorage.getItem("userId")
    const dispatch=useDispatch()
    const handleLogout=()=>{
        try {
         dispatch(authActions.logout())
         toast.success("logout sucessful")
         localStorage.clear()
         navigate('/login')   
        } 
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <AppBar position='sticky' sx={{ width:{xs:'120%',md:'100%'},bgcolor:'#772233'}}>
                <Toolbar>
                <Typography variant='h6' fontFamily='Times-new-roman' sx={{ '@media (max-width:600px)': { display: 'none' } }}>Blogs App</Typography>
                    { isLogin &&
                    <Box display='flex' marginX='auto'>
                        <Tabs textColor='white' >
                            <Tab label="Blogs" LinkComponent={Link} to='/blogs' />
                            <Tab label="My Blogs" LinkComponent={Link} to='/my-blogs' />
                            <Tab label="Create" LinkComponent={Link} to='/create-blog' />
                        </Tabs>

                    </Box>
                    }
                    <Box display='flex' marginLeft='auto'>
                        {!isLogin &&(<>
                        <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/login">Login</Button>
                        <Button sx={{ margin: 1, color: 'white' }} LinkComponent={Link} to="/register" >Register</Button></>) 
                        }
                        {isLogin && <Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>Logout</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;








