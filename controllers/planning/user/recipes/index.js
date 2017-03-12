const router = require('express').Router();
const controller = require('./controller');
const User = require('../../../../models/user-model');
const passport = require('passport');
const AuthService = require('../../../../services/auth');

router.get('/all', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/preferences', controller.findByDiet);

module.exports = router;