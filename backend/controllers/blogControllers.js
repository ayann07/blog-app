const mongoose = require('mongoose');
const blogModel = require('../models/blogModel');
const userModel = require('../models/userModel');
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find({}).populate('user')
        if (!blogs) {
            return res.status(500).send({
                success: false,
                message: "No blogs found!"
            })
        }
        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            message: "All blogs list",
            blogs
        })

    }
    catch (err) {
        console.log(err)
        return res.status(500).send({
            success: false,
            message: "Error in retreiving all blogs",
            err
        })
    }
}

exports.createBlog = async (req, res) => {
    try {
        const { title, description, image, user } = req.body;
        if (!title || !description || !image || !user) {
            return res.status(400).send({
                success: false,
                message: "please provide all the fields"
            })
        }
        const existingUser = await userModel.findById(user)
        if (!user) {
            res.status(404).send({
                success: false,
                message: 'Unable to find user'
            })
        }
        const newBlog = new blogModel({ title, description, image, user });
        const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({ session })
        existingUser.blogs.push(newBlog)
        await existingUser.save({ session })
        await session.commitTransaction()
        return res.status(201).send({
            success: true,
            message: "new blog created!",
            newBlog
        })
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in creating a blog",
            err
        })
    }

}

exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, image } = req.body;
        const blog = await blogModel.findByIdAndUpdate(id, { ...req.body }, { new: true });
        return res.status(200).send({
            success: true,
            message: "Blog updated",
            blog
        })
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in updating a blog",
            err
        })
    }
}



exports.getBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "blog not found with this ID",
            })
        }
        return res.status(200).send({
            success: true,
            message: "blog fetched successfully!",
            blog
        })
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in getting a blog",
            err
        })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
        await blog.user.blogs.pull(blog)
        await blog.user.save()
        return res.status(200).send({
            success: true,
            message: "blog deleted"
        })
    }
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in deleting a blog",
            err
        })
    }
}


exports.userBlog = async (req, res) => {
    try {
    const userBlog=await userModel.findById(req.params.id).populate("blogs")
    if(!userBlog)
    {
        return res.status(404).send({
            status:false,
            message:"blogs not found with this ID"
        })
    }
    return res.status(200).send({
        success:true,
        message:"user blogs",
        userBlog
    })
    } 
    catch (err) {
        return res.status(500).send({
            success: false,
            message: "Error in user blog",
            err
        })
    }
}