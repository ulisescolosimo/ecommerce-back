const Product = require("../Models/Product");

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

  createProduct: async (req, res) => {
    try {
      let product = await new Product(req.body).save();
      res.status(201).json({
        message: "product created",
        success: true,
        response: product,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: error.message,
        success: false,
      });
    }
  },

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
          message: "deleted successfully",
          success: true,
        });
      } else {
        res.status(404).json({
          message: "deleted failed",
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
