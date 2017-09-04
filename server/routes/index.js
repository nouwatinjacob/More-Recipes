const usersController = require('../controllers').users;
const recipesController = require('../controllers').recipes;
const reviewsController = require('../controllers').reviews;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Todos API!',
  }));

 

  app.post('/api/users/signup', usersController.create);//register user
  app.post('/api/users/signin', usersController.login);// login user

  app.post('/api/recipes', recipesController.create);//create recipe
  app.get('/api/recipes', recipesController.list);// all recipe
  app.put('/api/recipes/:recipeId', recipesController.update); //modify recipe

  app.post('/api/recipes/:recipeId/reviews', reviewsController.create);//post review
};