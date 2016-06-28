var router = require('express').Router();

// confiure passport middleware
require('./local/passport');

// mount local route
router.use('/local', require('./local'));

module.exports = router;