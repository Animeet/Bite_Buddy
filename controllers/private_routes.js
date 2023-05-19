const router = require('express').Router();
const { User, Business, Favorite } = require('../models');


function isAuthenticated(req, res, next) {
    if (!req.session.user_id) {
        return res.redirect('/');
    }
    next();
};

router.get('/application', isAuthenticated, async (req, res) => {
    const user = await User.findByPk(req.session.user_id, {
        attributes: {
            exclude: ['password']
        }
    });

    console.log(user);
    res.render('application', {
        user,
        logged_in: true
    });
});

// router.get('/application', isAuthenticated, async (req, res) => {
//     const business = await Business.findByPk(req.session.user_id);
//     res.render('application', {
//         business_name: business.business_name,
//         business_address: business.business_address,
//         phone_number: business.phone_number,
//         username: business.username,
//         email: business.email
//     });
// });


router.post('/favorite', isAuthenticated, async (req, res) => {
    const favoriteData = req.body;
    const user = await User.findByPk(req.session.user_id, {
        include: Favorite,
        attributes: {
            exclude: ['password']
        }
    });

    const fav_found = user.favorites.find(fav => fav.name === favoriteData.name);

    if (fav_found) return res.send(false);

    const fav = await user.createFavorite({
        name: favoriteData.name
    });
    console.log(fav);
    res.send(fav);
})


module.exports = router;