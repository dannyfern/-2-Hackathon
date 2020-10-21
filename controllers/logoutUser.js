module.exports = (req, res) => {
      req.session.destroy(() => {
        res.redirect('/'),
        req.flash('You have been logged out')
        
      })
}