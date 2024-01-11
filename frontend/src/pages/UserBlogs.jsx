import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../components/BlogCard';
import { Typography } from '@mui/material';

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem('userId');
      const { data } = await axios.get(`http://localhost:5000/api/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        <>
          <Typography variant='h2' my={3} textAlign='center' fontFamily='times-new-roman'>
            My Blogs
          </Typography>
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={blog.createdAt}
            />
          ))}
        </>
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography variant='h4' fontFamily='times-new-roman' sx={{ textAlign: 'center' }}>
            You have not created any blog yet.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
