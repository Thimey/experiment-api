var router = require('express').Router();
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var checkUser = auth.isAuthenticated;

router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
	.get(controller.index)
	.post(controller.create)

router.route('/:id')
	.get(controller.getOne)
	.put(checkUser, controller.edit)
	.delete(checkUser, controller.delete);

module.exports = router;