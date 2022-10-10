const Product = require('../Models/Product')
const Joi = require('joi')


const validator = Joi.object({
	brand: Joi.string()
	.required(),

	model: Joi.string()
	.required(),

	type: Joi.string()
	.required(),

	photo: Joi.array()
	.required(),

	description: Joi.string()
	.required()
	.min(5)
	.max(300)
	.messages({
		'string.min': 'Description: min 5 characters',
		'string.max': 'Description: max 300 characters'
	  }),

	price: Joi.number()
	.min(1)
	.integer()
	.required()
	.messages({
	    'number.integer' : 'Price: enter an integer',
	}),

	stock: Joi.number()
	.integer()
	.required()
	.messages({
	    'number.integer' : 'Stock: enter an integer',
	}),

})

const productsControllers = {
  getProducts: async (req, res) => {
    
    let query = {};

    if (req.query.type) {
      query.type = req.query.type;
    }

    let products = await Product.find(query);

    try {
      if (products) {
        res.status(200).json({
          message: "you get all the products",
          response: products,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "could't find all the products",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  getOneProduct: async (req, res) => {
    const id = req.params.id;
    let product;
    let error = null;
    try {
      product = await Product.findOne({ _id: id });
    } catch (err) {
      error = err;
      console.error(error);
    }
    res.json({
      response: error ? "Product not found" : product,
      success: error ? false : true,
      error: error,
    });
  },
	
	createProduct: async(req,res)=>{
		
		try {
			let result = await validator.validateAsync(req.body)
			console.log(result);

			let product = await new Product(req.body).save()
			res.status(201).json({
				massage: 'product created',
				success:true,
				response: product
			})      
			
		}catch (error) {
			console.log(error)
			res.status(400).json({
				message: error.message,
				success: false
		})
  }},

  updateProduct: async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    let productUp;

    try {
      productUp = await Product.findByIdAndUpdate(id, product);

      if (productUp) {
        res.status(200).json({
          message: "update successfully",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "update failed",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "error",
        success: false,
      });
    }
  },

  deleteProduct: async (req, res) => {
    const id = req.params.id;

    try {
      let deleted = await Product.findByIdAndDelete({ _id: id });
      if (deleted) {
        res.status(200).json({
          message: "Item deleted successfully",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "Item deleted failed",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "error",
        success: false,
      });
    }
  },
};

module.exports = productsControllers;
