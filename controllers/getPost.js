const Post = require('../DATABASE/models/Post');

module.exports = async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
}