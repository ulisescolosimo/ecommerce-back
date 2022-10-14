var express = require('express');
var router = express.Router();

const { readBuy, createBuy } = require('../Controllers/mercadoController')

router.get('/', readBuy)
router.post('/', createBuy)

module.exports = router;