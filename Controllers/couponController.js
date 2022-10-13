const Coupon = require('../Models/Coupon')

const couponController = {

    createCoupon: async (req, res) => {
        try {
            let coupons = await Coupon.find();
            if (coupons.length > 0) {
                res.status(400).json({
                    message: 'cannot be created because there is an active coupon',
                    success: false,
                })
            } else {
                let coupon = await new Coupon(req.body).save()
                res.status(201).json({
                    message: 'coupon created',
                    success: true,
                    response: coupon
                })
            }


        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "error.message",
                success: false
            })
        }
    },

    getAllCoupons: async (req, res) => {

        let coupons = await Coupon.find();

        try {
            if (coupons.length > 0) {
                res.status(200).json({
                    message: "you get the coupon",
                    response: coupons,
                    success: true,
                });
            } else {
                res.status(404).json({
                    message: "could't find all the Coupons",
                    success: false,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getCoupon: async (req, res) => {
        const id = req.params.id;
        let coupon;
        let error = null;
        try {
            coupon = await Coupon.findOne({ _id: id });
        } catch (err) {
            error = err;
            console.error(error);
        }
        res.json({
            response: error ? "Coupon not found" : coupon,
            success: error ? false : true,
            error: error,
        });
    },

    deleteCoupon: async (req, res) => {
        const id = req.params.id;

        try {
            let deleted = await Coupon.findByIdAndDelete({ _id: id });
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
module.exports = couponController;
