import {
  usersController,
  recipesController,
  reviewsController,
  favoritesController,
  ratingsController
} from '../controllers';

import authMiddleware from '../middleware/auth';

const routes = (router) => {
  router.route('/')
    .get((req, res) => res.status(200).json({
      message: 'Welcome to the More Recipe API!',
    }));

  router.route('/users/signup')
    .post(usersController.create);

  router.route('/users/signin')
    .post(usersController.login);

  // recipe add/ list and update
  router.route('/recipes')
    .post(authMiddleware.verifyToken, recipesController.create);

  router.route('/recipes')
    .get(authMiddleware.verifyToken, recipesController.list);

  router.route('/recipes/:recipeId')
    .put(authMiddleware.verifyToken, authMiddleware.VerifyUser, recipesController.update);

  router.route('/recipes/:recipeId')
    .delete(authMiddleware.verifyToken, authMiddleware.VerifyUser, recipesController.delete);

  // post review for recipe
  router.route('/recipes/:recipeId/reviews')
    .post(authMiddleware.verifyToken, reviewsController.create);

  // favorite recipe
  router.route('/users/:userId/recipes')
    .post(favoritesController.create);

  router.route('/users/:userId/recipes')
    .get(authMiddleware.verifyToken, favoritesController.list);

  // Recipe Vote
  router.route('/ratings/:userId/upVotes')
    .post(ratingsController.upVote);

  router.route('/ratings/:userId/downVotes')
    .post(authMiddleware.verifyToken, ratingsController.downVote);
};
export default routes;

