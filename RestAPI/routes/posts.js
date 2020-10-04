const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Getting all posts
router.get('/', async (req, res) => {
   try {
       const posts = await Post.find();
       res.json(posts);
   } catch (err) {
       res.json({message:err});
   }
}); 

// Getting latest post
router.get('/latest', async (req, res) => {
    try {
        const posts = await Post.find().sort({amount: -1});
        res.json(posts);
    } catch (err) {
        res.json({message:err});
    }
 }); 

// Get specific post
router.get('/:postId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

// Submitting post
router.post('/', async (req, res) => {
    const post = new Post({
        date: req.body.date,
        type: req.body.type,
        description: req.body.description,
        transaction_amount: req.body.transaction_amount,
        previous_balance: req.body.previous_balance,
        current_balance: req.body.current_balance
    });

    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });       
    }
});

// Update post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: {
                    date: req.body.date,
                    type: req.body.type,
                    description: req.body.description,
                    transaction_amount: req.body.transaction_amount,
                    previous_balance: req.body.previous_balance,
                    current_balance: req.body.current_balance
                } 
            }   
            
        );
        res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });       
    }
});

module.exports = router;