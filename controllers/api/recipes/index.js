const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.findAll);
router.get('/:id', controller.findOne);
router.post('/preferences', controller.findByDiet);
router.post('/new', controller.create);
router.delete('/:id', controller.delete);

module.exports = router;