const router = require('express').Router();
const { User } = require('../models');

function isLoggedIn(req, res, next) {
  console.log(req.session.user_id);
  if (req.session.user_id) return res.redirect('/');
  next();
}

// Render the Homepage view
router.get('/', async (req, res) => {
  if (req.session.user_id) {
    const user = await User.findOne({
      where: {
        id: req.session.user_id
      },
      attributes: ['username']
    });

    return res.render('home', {
      logged_in: true,
      user
    });
  }

  res.render('home');
});

// Render the Application view
router.get('/application', (req, res) => {
  res.render('application', {
    logged_in: req.session.user_id && true
  });
});



router.get('/register', isLoggedIn, (req, res) => {
  console.log('register');
  res.render('register');
});

router.get('/application1', (req, res) => {
  res.sendFile(path.join(__dirname, './../application.html'))
})

module.exports = router;