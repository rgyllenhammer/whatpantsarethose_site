const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    "_id": String,
    "Post Url": String,
    "Raw Caption": String,
    "Skater": String,
    "Pants": String
});

module.exports = mongoose.model('Post', PostSchema, 'full_data_set');