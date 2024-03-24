const flashMessages = (req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
};

module.exports = flashMessages;
