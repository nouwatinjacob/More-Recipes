import db from '../models';

const Review = db.Review;

module.exports = {
	create(req, res){
		return Review
		.create({
			review_body: req.body.review_body,
			user_id: req.body.user_id,
			recipe_id: req.params.recipeId
		})
		.then(review => res.status(201).send(review))
		.catch(error => res.status(404).send(error));
	},
};