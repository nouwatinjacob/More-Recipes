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

    list(req, res) {
	    Rating.findAll({
        where: {recipe_id: re},
        attribute: [{
	        
        }]
    }).then((recipesVoteCount) => {
        console.log(recipesVoteCount);
        })
    .catch(error => res.status(400).send({
	        errors: error.message
        }));
    },
    };

let vote = (req, res, status) => {
    let promises = [];
    let findUser = User.findOne({where: {id: req.decoded.user_id}});
    let findRecipe = Recipe.findOne({where: {id: req.body.recipe_id}});
    let findRating = Rating.findOne({where: {recipe_id: req.body.recipe_id, user_id: req.decoded.user_id}});

    promises.push(findUser);
    promises.push(findRecipe);
    promises.push(findRating);

    Promise.all(promises)
    .then((results) => {
        let user = results[0];
        if (!user) {
            return res.status(401).json({
	            code: 401,
	            message: 'This user does not exit'});
        }

        let recipe = results[1];
        if (!recipe) {
            return res.status(401).json({
	            code: 401,
	            message: 'This Recipe does not exit'});
        }

        let rating = results[2];
        if (rating) {
            return rating.update({
                vote: status,
            })
        }
        else {
            return Rating.create({
                vote: status,
                recipe_id: req.body.recipe_id,
                user_id: req.decoded.user_id
    })
        }
    })
    .then((updated) => {
        return res.status(200).json({
	        code: 200,
	        message: 'A new vote has been inserted ', data: updated});
    })
    .catch(error => res.status(400).json({
        message: 'Recipe not picked as your favorite',
        errors: error.errors
    }));
    }


export default ratingsController;