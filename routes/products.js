var express = require('express');
var router = express.Router();
let passport = require('../config/passport')

const { getProducts, getOneProduct, createProduct, updateProduct, deleteProduct, favorites } = require('../controllers/productController')

router.get('/', getProducts)
router.get('/:id', getOneProduct)
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/favorite/:id', passport.authenticate('jwt', {session:false}), favorites)
router.patch('/:id', updateProduct);

module.exports = router;