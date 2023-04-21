const router = require('express').Router();
const routes = require('./controllers');

router.use('/controllers', routes);

module.exports = router;