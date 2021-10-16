const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// matching on an empty query returns all documents
const emptyQuery = {};

router.get('/', async (req, res) => {
    try {

        posts = await Post.aggregate([
            { $match : emptyQuery },
            { $group : 
                {
                    _id :{ skater : '$Skater' },
                    postCount : { $sum : 1},
                    data: { $push : { pants: "$Pants", url: "$Post Url" } }
                }
            }
        ]);

        res.render("posts", { posts: posts });

    } catch (err) {
        console.log(err);
    }
});

router.get('/:skater', async (req, res) => {
    const params = req.params;
    const skater = '@' + params['skater'];

    posts = await Post.find({'Skater': skater});

    res.render("skater", { skaterName : skater, posts : posts });

});


module.exports = router