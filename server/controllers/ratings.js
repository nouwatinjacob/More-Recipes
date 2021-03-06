import db from '../models';

const Rating = db.Rating;
const User = db.User;
const Recipe = db.Recipe;

const ratingsController = {
  upVote(req, res) {
    vote(req, res, 1);
  },

  downVote(req, res) {
    vote(req, res, 0);
  },

};

let vote = (req, res, status) => {
  const promises = [];
  const findUser = User.findOne({
    where: {
      id: req.decoded.user_id
    }
  });
  const findRecipe = Recipe.findOne({
    where: {
      id: req.body.recipe_id
    }
  });
  const findRating = Rating.findOne({
    where: {
      recipe_id: req.body.recipe_id,
      user_id: req.decoded.user_id
    }
  });

  promises.push(findUser);
  promises.push(findRecipe);
  promises.push(findRating);

  Promise.all(promises)
    .then((results) => {
      const user = results[0];
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          message: 'This user does not exit'
        });
      }

      const recipe = results[1];
      if (!recipe) {
        return res.status(404).json({
          statusCode: 404,
          message: 'This Recipe does not exit'
        });
      }

      const rating = results[2];
      if (rating) {
        return rating.update({
          vote: status,
        });
      }
      return Rating.create({
        vote: status,
        recipe_id: req.body.recipe_id,
        user_id: req.decoded.id
      });
    })
    .then((updated) => {
      return res.status(201).json({
        statusCode: 201,
        message: 'A new vote has been inserted ',
        data: updated
      });
    })
    .catch(error => res.status(400).json({
      message: 'Recipe not picked as your favorite',
      errors: error.errors
    }));
};

export default ratingsController;
