const router = require('express').Router();
const { User, Business } = require('../models');


function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/');
    }
    next();
};

router.get('/application', isAuthenticated, async (req, res) => {
    const user = await User.findByPk(req.session.user_id);
    res.render('application', {
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email
    });
});

router.get('/application', isAuthenticated, async (req, res) => {
    const business = await Business.findByPk(req.session.user_id);
    res.render('application', {
        business_name: business.business_name,
        business_address: business.business_address,
        phone_number: business.phone_number,
        username: business.username,
        email: business.email
    });
});


router.post('/favorite', async (req, res) => {
    console.log(req.body)
    const favoriteData = req.body
    const user = await User.findByPk(req.session.user_id, {
        include: Favorite
    });
    const fav_found = user.favorties.find(fav => fav.name === favoriteData.name)

    if (fav_found) return res.send(false);

    const fav = await user.createFavorite({
        name: favoriteData.name
    });

    res.send(fav);
})


module.exports = router;