var express = require('express');
var router = express.Router();

const { getProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/', getProducts)
router.get('/:id', getOneProduct)
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);

module.exports = router;