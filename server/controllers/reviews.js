import db from '../models';

const Review = db.Review;
const Recipe = db.Recipe;

const reviewsController = {
  create(req, res) {
    Recipe.findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            code: 404, message: 'This Recipe Does not exit'
          });
        }
        return Review.create({
          review_body: req.body.review_body,
          recipe_id: req.params.recipeId,
          user_id: req.decoded.id
        })
          .then((recipeFound) => {
            return res.status(201).json({
              code: 200, message: 'Review Posted ', data: recipeFound
            });
          })
          .catch(error => res.status(404).send(error));

      })
      .catch(error => res.status(400).send(error));
  },
};

export default reviewsController;
