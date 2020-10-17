const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/jsHackathon", { useUnifiedTopology: true, useNewUrlParser: true });


const postSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,  
    username: String,
    image: String,

    createdAt: {
        type: Date,
        default: new Date(),
    }
});

const Post = mongoose.model("Post", postSchema);

// Post.save();

module.exports = Post
