const router = require('express').Router();
const User = require('../models/User');
const Business = require('../models/Business');


function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/login');
        // confirm route line 8
    }
    next();
};


router.get('/home', isAuthenticated, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    res.render('/home');
});


router.get('/home', isAuthenticated, async (req, res) => {
    const business = await Business.findByPk(req.session.user_id);
    res.render('/home');
});



module.exports = router;