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
};