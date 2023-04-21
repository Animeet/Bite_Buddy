const router = require('express').Router();
const path = require('path')

function isLoggedIn(req, res, next) {
  if (req.session.user_id) return res.redirect('/dashboard');
//  confirm path line 5
  next();
}

// Render the Homepage view
router.get('/', async (req, res) => {
  const user = await User.findOne({
    where: {
        id: req.session.user_id
    }
})
  res.render('index');
//   confirm path line 12
});


// Render the Register Page view
router.get('/register', (req, res) => {
  res.render('auth/register');
// confirm path line 23
});

router.get('/mapSandbox', (req, res) => {
  res.sendFile(path.join(__dirname, './../application.html'))
})

module.exports = router;