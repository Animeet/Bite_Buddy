const router = require('express').Router();
const path = require('path')

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

// // Render the Application view
// router.get('/application', (req, res) => {
//   res.render('application');
// });


// Render the Register Page view
router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.get('/mapSandbox', (req, res) => {
  res.sendFile(path.join(__dirname, './../application.html'))
})

module.exports = router;