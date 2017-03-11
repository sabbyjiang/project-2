const router = require('express').Router();

router.use('/planning', require('./controllers/planning'));
router.use('/api', require('./controllers/api'));
router.use('/users', require('./controllers/users'));

module.exports = router;