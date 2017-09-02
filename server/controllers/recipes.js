const Recipe = require('../models').Recipe;

module.exports = {
	create(req, res){
		return Recipe
		.create({
			name: req.body.name,
			description: req.body.description,
			ingredients: req.body.ingredients,
			user_id: req.body.user_id
		})
		.then(recipe => res.status(201).send(recipe))
		.catch(error => res.status(404).send(error));
	},

	list(req, res) {
    return Recipe
      .findAll()
      .then(recipes => res.status(200).send({ message: 'All Recipes displayed', recipes }))
      .catch(error => res.status(400).send({ errors: error.message }));
  },

	update(req, res) {	
       return Recipe
      .findById(req.params.recipeId)
      .then( (recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return recipe
          .update({
            name: req.body.name || recipe.name,
			description: req.body.description || recipe.description,
			ingredients: req.body.ingredients || recipe.ingredients,
          })
          .then(() => res.status(200).send({ message: 'Recipe updated', recipe }))
          .catch(error => res.status(400).send({ message: 'Recipe not updated', errors: error.errors }));
      })
      .catch(error => res.status(400).send({ errors: error.errors }));
  },

  delete(req, res) {
	return Recipe
		.findById(req.params.recipeId)
		.then((recipe) => {
			if(!recipe) {
				return res.status(404).send({
					message: 'Recipe Not Found',
				});
			}
			return recipe
			.destroy()
			.then(() => res.status(200).send({
				message: 'Recipe deleted successfully'
			}))
			.catch((error) => res.status(400).send(error));
		})
		.catch((error) => res.status(400).send(error));
  },

};