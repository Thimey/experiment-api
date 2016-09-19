var router = require('express').Router();
var controller = require('./component.controller.js');

router.route('/')
    .post(controller.create);