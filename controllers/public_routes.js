const router = require('express').Router();


function isLoggedIn(req, res, next) {
  if (req.session.user_id) return res.redirect('/home');
//  confirm route line 5 - home.hbs
  next();
}

// Render the Homepage view
router.get('/', isLoggedIn, (req, res) => {
  res.render('/home');
//   confirm route line 12 - home.hbs
});

// Render the Login Page view
router.get('/login', isLoggedIn, (req, res) => {
  res.render('auth/login');
//   confirm route line 18 - need login page
});
// Render the Register Page view
router.get('/register', isLoggedIn, (req, res) => {
  res.render('auth/register');
// confirm route line 23- register.hbs
});

module.exports = router;