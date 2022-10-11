const Review = require("../Models/Review");

const ReviewController = {
  read: async (req, res) => {
    const { id } = req.params;
    try {
      let ReviewOne = await Review.findOne({ _id: id });

      if (ReviewOne) {
        res.status(200).json({
          message: "You get one review",
          response: ReviewOne,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "couldn't find review",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "",
        success: false,
      });
    }
  },

  getReviews: async (req, res) => {
    let query = {};

    if (req.query.type) {
      query.type = req.query.type;
    }

    try {
      let reviews = await Review.find(query)
        .populate("user", { name: 1, photo: 1 })
        .populate("product", { brand: 1, model: 1, photo: 1 });

      if (reviews) {
        res.status(200).json({
          message: "you get all the reviews",
          response: reviews,
          success: true,
        });
      } else {
        res.status(404).json({
          message: "could't find all the reviews",
          success: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  createReview: async (req, res) => {
    try {
      let newReview = await new Review(req.body).save();
      if (newReview) {
        res.status(200).json({
          message: "The review was created",
          response: newReview,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  updateReview: async (req, res) => {
    let { id } = req.params;
    let newReview = req.body.review;
    try {
      let review = await Review.findOne({ _id: id });
      if (review) {
        review.review = newReview;


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
}
        await comment.save();
        res.status(200).json({
          message: "The review was updated",
          response: review,
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteReview: async (req, res) => {
    let { id } = req.params;

    try {
      let review = await Review.findByIdAndDelete({ _id: id });
      if (review) {
        res.status(200).json({
          message: "The review was deleted",
          success: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};


module.exports = ReviewController;
