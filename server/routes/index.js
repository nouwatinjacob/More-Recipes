const usersController = require('../controllers').users;
const recipesController = require('../controllers').recipes;
const reviewsController = require('../controllers').reviews;

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

  app.post('/api/users/signup', usersController.create);

  app.post('/api/recipes', recipesController.create);
  app.get('/api/recipes', recipesController.list);
  app.put('/api/recipes/:recipeId', recipesController.update);

  app.post('/api/recipes/:recipeId/reviews', reviewsController.create);
};