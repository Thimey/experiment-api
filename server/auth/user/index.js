var router = require('express').Router();
var controller = require('./user.controller')

router.param('id', controller.params);
router.get('/me', controller.me);

router.route('/')
	.get(controller.index)
	.post(controller.create)

router.route('/:id')
	.get(controller.getOne)
	.put(controller.edit)
	.delete(controller.delete)

module.exports = router;