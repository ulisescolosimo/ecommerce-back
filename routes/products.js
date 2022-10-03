var express = require('express');
var router = express.Router();

const { getProducts, getOneProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController')

router.get('/', getOneProduct)
router.get('/all', getProducts)
router.post('/', createProduct);
router.delete('/:id', deleteProduct);
router.patch('/:id', updateProduct);

module.exports = router;