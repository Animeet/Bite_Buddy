const router = require('express').Router();
const { User, Business } = require('../models')



router.post('/auth/login', async (req, res) => {
    const formData = req.body;

    const user = await User.findOne({
        where: {
            username: formData.username
        }
    })
    if (!user) return res.redirect('/register')

    const valid_pass = await user.validatePassword(formData.password)
    if (!valid_pass) return res.redirect('/')

    req.session.user_id = user.id
    res.redirect('/')
});

router.post('/auth/register', async (req, res) => {
    const formData = req.body;

    try {
        const user = await User.create(formData);
        req.session.user_id = user.id
        res.redirect('/')
    } catch (err) {
        res.redirect('/')
    }
});

router.post('/auth/login', async (req, res) => {
    const formData = req.body;

    const user = await Business.findOne({
        where: {
            username: formData.username
        }
    })
    if (!user) return res.redirect('/register')

    const valid_pass = await user.validatePassword(formData.password)
    if (!valid_pass) return res.redirect('/')

    req.session.user_id = user.id
    res.redirect('/')
});

router.post('/auth/register', async (req, res) => {
    const formData = req.body;

    try {
        const user = await Business.create(formData);
        req.session.user_id = user.id
        res.redirect('/')
    } catch (err) {
        res.redirect('/')
    }
});

module.exports = router;