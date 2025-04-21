const router = require('express').Router();
const virtuosoController = require('../Controllers/Virtuoso/VirtuosoController');

const uri = "/virtuoso"

router
    .get(uri, virtuosoController.getVirtuoso)

module.exports = router;