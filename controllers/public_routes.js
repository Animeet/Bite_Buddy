const router = require('express').Router();


function isLoggedIn(req, res, next) {
  if (req.session.user_id) return res.redirect('/application');
  next();
}

// Render the Homepage view
router.get('/', async (req, res) => {
  // const user = await User.findOne({
  //   where: {
  //       id: req.session.user_id
  //   }
// })
  res.render('home', {
    logged_in: req.session.logged_in
  });
});

// Render the Application view
router.get('/application', (req, res) => {
  res.render('application', {
    logged_in: req.session.logged_in
  });
});



router.get('/register', (req, res) => {
  res.render('register', {
    logged_in: req.session.logged_in
  });
});

router.get('/application1', (req, res) => {
  res.sendFile(path.join(__dirname, './../application.html'))
})

module.exports = router;