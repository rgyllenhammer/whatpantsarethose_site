const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// matching on an empty query returns all documents
const emptyQuery = {};
const noPostsString = 'No posts yet unfortunately. Tag @whatpantsarethose and tell him to post '

router.get('/', async (req, res) => {
    res.render("index");
});

router.get('/find', async (req, res) => {
    try {

        posts = await Post.aggregate([
            { $match : emptyQuery },
            { $group : 
                {
                    _id :{ skater : '$Skater' },
                    postCount : { $sum : 1},
                    data: { $push : { pants: "$Pants", url: "$Post Url" } }
                }
            },
            { $sort : { _id : -1 }}
        ]);

        res.render("posts", { posts: posts });

    } catch (err) {
        console.log(err);
    }
});

router.get('/find/:skater', async (req, res) => {
    const params = req.params;
    const skater = '@' + params['skater'];

    posts = await Post.find({'Skater': skater});

    res.render("skater", { skaterName : skater, posts : posts, noPosts: posts.length == 0 ? (noPostsString + skater)  : '' });

});


module.exports = router