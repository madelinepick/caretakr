

module.exports = {
  function authorizedUser(req, res, next) {
    // console.log(req.session.passport.user.photos);
    if (req.session.passport) {
      next();
    } else {
      res.redirect('/');
    }
  }
}
