const Post = require('../DATABASE/models/Post')


module.exports = async (req, res) => {
    const posts = await Post.find({})
    console.log(posts)
    res.render('index', {
        posts
    });
}