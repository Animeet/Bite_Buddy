const router = require('express').Router();


function isLoggedIn(req, res, next) {
  if (req.session.user_id) return res.redirect('/application');
  next();
}

// Render the Homepage view
router.get('/', async (req, res) => {
  const user = await User.findOne({
    where: {
        id: req.session.user_id
    }
})
  res.render('home');
});


// Render the Register Page view
router.get('/register', (req, res) => {
  res.render('auth/register');
});

module.exports = router;