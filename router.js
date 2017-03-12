const router = require('express').Router();
const User = require('./models/user-model');
const passport = require('passport');

const AuthService = require('./services/auth');

router.use('/planning', 
    // AuthService.restrict, 
    require('./controllers/planning'));
router.use('/api', require('./controllers/api'));
router.use('/users', require('./controllers/users'));
router.get('/', (req, res) => res.render('index'));

module.exports = router;