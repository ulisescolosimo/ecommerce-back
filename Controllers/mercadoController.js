const Buy = require("../Models/Buy");

const mercadoController = {

  readBuy: async (req, res) => {

    try {
      let buy = await Buy.find();

      if (buy) {
        res.status(200).json({
          message: "You get one buy",
          response: buy,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "couldn't find buy",
          success: false,
        });
      }
    } catch (error) {
    console.log(error);
    res.status(400).json({
        message: "Error",
        success: false,
    });
    }
},

createBuy: async(req,res)=>{

    try {
        let cart = await new Buy(req.body).save()
        res.status(201).json({
            massage: 'cart created',
            success:true,
            response: cart
        })      
        
    }catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
            success: false
    })
    }},
};

module.exports = mercadoController;