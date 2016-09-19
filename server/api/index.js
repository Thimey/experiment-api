var router = require('express').Router();

router.use('/user', require('./user'));
// router.use('/component', require('./component'));
// router.use('/component-instance', require('./component-instance'));
// router.use('/component-data', require('./component-data'));
router.use('/experiment', require('./experiment'));

module.exports = router;
