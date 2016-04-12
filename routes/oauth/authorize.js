module.exports = {
  authorizedUser: function(req, res, next) {
    // console.log(req.session.passport.user.photos);
    if (req.session.passport) {
      next();
    } else {
      res.redirect('/');
    }
  }
}
