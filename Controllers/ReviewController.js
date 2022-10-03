const Review = require('../Models/Review')

const ReviewController = {

    create: async (req, res) => {
        const {
            user,
            product,
            commentary,
            star
        } = req.body

        try {
        await new Review({user, product, commentary, star})
        
        res.status(201).json({
            message: 'Review created',
            success: true
        })
        } catch (error) {
            res.status(400).json({
                message: "couldn't create review",
                success: false 
            })
        }
    },

    read: async (req, res) => {
        const {id} = req.params 
        try {
            let ReviewOne = await Review.findOne({ _id: id },)

            if (ReviewOne) {

                res.status(200).json({
                    message: 'You get one review',
                    response: ReviewOne,
                    success: true
                })
             } else {
                res.status(404).json({
                    message: "couldn't find review",
                    success: false
                })
             }
        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "",
                success: false
            })   
        }
    },
    reviews: async (res,req) => {
        let {id} = req.params
        let query={}

        if (req.query.user) {
            query.user = req.query.user
        } 
        if (req.query.product) {
        query.product = req.query.product
        }

    try {
        let reviewNew = await Review.find(query)
        .populate("user", {name:1, photo:1, _id:1})
        .populate("product", {name:1, photo:1, _id:1})
        if (reviewNew) {
            res.status(200).json({
                message: 'You get reviews',
                response: reviewNew,
                success: true
            })
        } else{
            res.status(404).json({
                message: "Could't find reviews",
                success: false
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "error, try again",
            success: false
        })
    }
},

    createReview: async (req, res) => {
        let user = req.user.id
        let product = req.body.product
        let commentary = req.body.commentary
        let star = req.body.star

        try {
            let newReview = await new Review({user, product, commentary, star}).save()
            if (newReview){
                res.status(200).json({
                    message: "The review was created",
                    response: newReview,
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    updateReview : async (req,res) => {
        let {id} = req.params
        let newReview = req.body.review
        try {
            let review = await Review.findOne({_id:id})
            if (review){
                review.review= newReview

                await comment.save()
                res.status(200).json({
                    message: "The review was updated",
                    response: review,
                    success: true
                })
            }
        } catch (error) {
            console.log(error)
        }
    },
    deleteReview : async (req, res) => {
        let {id} = req.params

        let newReview = req.body.review

        try {
            let review = await Review.findByIdAndDelete({_id:id})
            if (Review){
                
                review.review= newReview
                await comment.save()
                res.status(200).json({
                    message: "The review was deleted",
                    response: review,
                    success: true
                })
            }
        } catch (error) {
         console.log(error)   
        }
    },
    
  /*  destroy: async (req, res) => {
        const Revieww = req.body
        let { id } = req.params
        try {
            let deleteReview = await Review.findOneAndDelete({ _id: id }, Revieww,)
            res.status(200).json({
                message: "Review deleted",
                success: true
            })

        } catch (error) {
            console.log(error)
            res.status(400).json({
                message: "Review not found",
                success: false
            })
        }
    }*/
}

module.exports = ReviewController