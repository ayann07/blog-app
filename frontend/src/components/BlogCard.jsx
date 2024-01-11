import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BlogCard({ title, description, image, username, time, id, isUser }) {
     
  var createdAt =time;
  var date = new Date(createdAt);
  var formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
  });
     
     const navigate=useNavigate();
    const handleEdit=()=>{
     navigate(`/blog-details/${id}`)
    }
    const handleDelete=async()=>{
      try {
       const {data}=await axios.delete(`http://localhost:5000/api/blog/delete-blog/${id}`)
       window.location.reload();
      } 
      catch (err)
      {
        console.log(err)
      }
    }
  return (
    <Card sx={{
      width: { xs: '100%', md: '40%' }, 
      margin: { xs: 2, md: '4rem auto' }, 
      padding: 2,
      boxShadow: { xs: 'none', md: '5px 5px 10px #ccc' }, 
      ':hover': { boxShadow: { xs: 'none', md: '10px 10px 20px #ccc' } },
    }}>

      {isUser && (
        <Box display='flex'>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon color='info'/>
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color='error' />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="name">
            {username?.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={username?.toUpperCase()}
        subheader={formattedDate}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="image not found"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Title : {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description : {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
