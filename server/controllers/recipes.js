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

	update(req, res) {
    return Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            message: 'Recipe Not Found',
          });
        }
        return recipe
          .update({
            name: req.body.name,
			description: req.body.description,
			ingredients: req.body.ingredients,
			user_id: req.body.user_id
          })
          .then(() => res.status(200).send({ message: 'Recipe updated', recipe }))
          .catch(error => res.status(400).send({ message: 'Recipe not updated', errors: error.errors }));
      })
      .catch(error => res.status(400).send({ errors: error.errors }));
  }
};