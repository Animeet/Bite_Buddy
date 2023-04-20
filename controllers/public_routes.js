const router = require('express').Router();


function isLoggedIn(req, res, next) {
  if (req.session.user_id) return res.redirect('/dashboard');
//  confirm path line 5
  next();
}

// Render the Homepage view
router.get('/', isLoggedIn, (req, res) => {
  res.render('index');
//   confirm path line 12
});

// Render the Login Page view
router.get('/login', isLoggedIn, (req, res) => {
  res.render('auth/login');
//   confirm path line 18
});
// Render the Register Page view
router.get('/register', isLoggedIn, (req, res) => {
  res.render('auth/register');
// confirm path line 23
});

module.exports = router;