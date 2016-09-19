var router = require('express').Router();
var controller = require('./experiment.controller');

router.route('/')
    .post(controller.create)
    .get(controller.getAll);

module.exports = router;
