const router = require('express').Router();
const { User, Business } = require('../models')


//User
router.post('/auth/login/user', async (req, res) => {
    console.log("LOGGIN IN!")
    const formData = req.body;

    const user = await User.findOne({
        where: {
            username: formData.username
        }
    })
    if (!user) return res.redirect('/register')

    const valid_pass = await user.validatePassword(formData.password)
    if (!valid_pass) return res.redirect('/')

    req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.email = user.email;
        req.session.logged_in = true;
        res.redirect('/')
    })
});


// Currently, if password is less than 6 or greater than 30, app crashes.
// Fix by sending a message back to the front end to provide an error message to the user to try again.
router.post('/auth/register/user', async (req, res) => {
    const formData = req.body;
    if (formData.password.length < 6 || formData.password.length > 30) {
        throw new Error('Password needs to be a minimum of 6 characters')
    }

    try {
        const user = await User.create(formData);

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.email = user.email;
            req.session.logged_in = true;
            res.redirect('/')
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
});

router.post('/auth/register/business', async (req, res) => {
    const formData = req.body;

    // if(formData.password.length < 6 || formData.password.length > 30) {
    //     throw new Error('Password needs to be a minimum of 6 characters')
    // }

    if (req.session.logged_in) {
        try {
            const business = await Business.create({
                ...formData,
                username: req.session.username,
                email: req.session.email,
                user_id: req.session.user_id
            });
            // req.session.user_id = user.id
            res.redirect('/')
        } catch (err) {
            console.log(err)
            res.redirect('/')
        }
    } else {
        res.status(400).send("Not logged in!")
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