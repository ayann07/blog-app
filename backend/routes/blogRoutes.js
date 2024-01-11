const express=require('express');
const { getAllBlogs, createBlog, updateBlog, deleteBlog, getBlog, userBlog } = require('../controllers/blogControllers');

const router=express.Router();

router.get('/all-blog',getAllBlogs);
router.post('/create-blog',createBlog);
router.put('/update-blog/:id',updateBlog);
router.delete('/delete-blog/:id',deleteBlog);
router.get('/get-blog/:id',getBlog);
router.get('/user-blog/:id',userBlog);
module.exports=router;