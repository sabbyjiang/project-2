const router = require('express').Router();
const controller = require('./controller');

router.get('/all', controller.findAll);
router.post('/preferences', controller.findByDiet);
router.post('/new', controller.create);
router.put('/edit', controller.edit);
router.delete('/delete/:id', controller.delete);
router.get('/:id', controller.findOne);

module.exports = router;