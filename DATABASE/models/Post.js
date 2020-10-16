const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/jsHackathon", { useUnifiedTopology: true, useNewUrlParser: true });


const postSchema = new mongoose.Schema({
    title: String,
    description: String,
    content:String,  
});

const Post = mongoose.model("Post", postSchema);

// Post.save();

module.exports = Post
