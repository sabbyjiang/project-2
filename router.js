const router = require('express').Router();
const User = require('./models/user-model');
const passport = require('passport');

// Script in order to restrict access through login sessions
const AuthService = require('./services/auth');

// Planning is a restricted url
router.use('/planning', 
    AuthService.restrict, 
    require('./controllers/planning'));
router.use('/api', require('./controllers/api'));
router.use('/users', require('./controllers/users'));
router.use('/kitten', require('./controllers/kitten'));
router.get('/', (req, res) => res.render('index'));

module.exports = router;