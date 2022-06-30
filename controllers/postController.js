const db = require('../models')



// create main Model
const Post = db.posts

// main work

// 1. create product

const addPost = async (req, res) => {

    let info = {
        sender_nusocial_id: req.body.sender_nusocial_id,
        body: req.body.body 
    }

    const post = await Post.create(info)
    res.status(200).send(post)
    console.log(post)
}



// 2. get all products

const getAllPosts = async (req, res) => {

    let posts = await Post.findAll({})
    res.status(200).send(posts)
}

module.exports = {
    addPost,
    getAllPosts
}
