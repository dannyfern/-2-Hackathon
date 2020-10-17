module.exports = (req, res, next) => {
    if (!(req.files && req.files.image)) {
        
        return res.redirect('/posts/new')
    } 

    next()
}

// if (!req.body.username || !req.body.title || !req.bodysubtitle || !req.body.content) {
//     return res.redirect('/posts/new')
// }
