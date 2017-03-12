const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/preferences', controller.findByDiet);

module.exports = router;