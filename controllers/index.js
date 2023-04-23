const router = require('express').Router();
const auth_routes = require('./auth_routes')
const private_routes = require('./private_routes')
const public_routes = require('./public_routes')


// router.use([auth_routes, private_routes, public_routes]);
router.use('/', [auth_routes, private_routes, public_routes]);

module.exports = router