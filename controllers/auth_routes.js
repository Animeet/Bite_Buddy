const router = require('express').Router();
const { User, Business } = require('../models')


//User
router.post('/auth/login/user', async (req, res) => {
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


// Currently, if password is less than 6 or greater than 30, app crashes.
// Fix by sending a message back to the front end to provide an error message to the user to try again.
router.post('/auth/register/user', async (req, res) => {
    const formData = req.body;
    if(formData.password.length < 6 || formData.password.length > 30) {
        throw new Error('Password needs to be a minimum of 6 characters')
    }
    
    try {
        const user = await User.create(formData);
        req.session.user_id = user.id
        res.redirect('/')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
});


// // Business
// router.post('/auth/login', async (req, res) => {
//     const formData = req.body;

//     const user = await Business.findOne({
//         where: {
//             username: formData.username
//         }
//     })
//     if (!user) return res.redirect('/register')

//     const valid_pass = await user.validatePassword(formData.password)
//     if (!valid_pass) return res.redirect('/')

//     req.session.user_id = user.id
//     res.redirect('/')
// });

// router.post('/auth/register', async (req, res) => {
//     const formData = req.body;
//     console.log(req)

//     try {
//         const user = await Business.create(formData);
//         req.session.user_id = user.id
//         res.redirect('/')
//     } catch (err) {
//         res.redirect('/')
//     }
// });

module.exports = router;