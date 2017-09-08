import db from "../models";
const sequelize = db.sequelize;

const Recipe = db.Recipe;
const User = db.User;

const recipesController = {
    create(req, res){
        User.findById(req.decoded.user_id)
            .then((user) => {
                if (!user) {
                    return res.status(404).json({code: 404, message: 'This User Does not exit'});
                }
                return Recipe.create({
                    name: req.body.name,
                    description: req.body.description,
                    ingredients: req.body.ingredients,
                    user_id: req.decoded.user_id
                })
                    .then((recipe) => {
                        return res.status(201).json({code: 200, message: 'Recipe has been Added ', data: recipe});
                    })
                    .catch(error => res.status(404).send(error));

            })
            .catch(error => res.status(400).send(error));
    },

    listUpvote(req, res) {
        return sequelize.query(`
                          SELECT DISTINCT
                          (SELECT COUNT(id) FROM "Ratings" WHERE recipe_id=a.id AND vote=1) AS upvotes,
                          (SELECT COUNT(id) FROM "Ratings" WHERE recipe_id=a.id AND vote=0) AS downvotes,
                          a.* FROM "Recipes" a
                          LEFT JOIN "Ratings" b ON a.id = b.recipe_id ORDER BY upvotes DESC`, {type: sequelize.QueryTypes.SELECT})
            .then(recipes => res.status(200).json({message: 'All Recipes displayed', recipes}))
            .catch(error => res.status(400));
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
                        name: req.body.name || recipe.name,
                        description: req.body.description || recipe.description,
                        ingredients: req.body.ingredients || recipe.ingredients,
                    })
                    .then(() => res.status(200).send({message: 'Recipe updated', recipe}))
                    .catch(error => res.status(400).send({message: 'Recipe not updated', errors: error.errors}));
            })
            .catch(error => res.status(400).send({errors: error.errors}));
    },

    delete(req, res) {
        return Recipe
            .findById(req.params.recipeId)
            .then((recipe) => {
                if (!recipe) {
                    return res.status(404).send({
                        message: 'Recipe Not Found',
                    });
                }
                return recipe
                    .destroy()
                    .then(() => res.status(200).json({
                        message: 'Recipe deleted successfully'
                    }))
                    .catch((error) => res.status(400).json(error));
            })
            .catch((error) => res.status(400).json(error));
    },
  
  getUserRecipes(req, res) {
    return Recipe
      .findAll({
        where: {user_id: req.decoded.id},
        attributes: keys
      })
      .then((recipes) => {
        if (!recipes) {
          return res.status(404).json({
            message: 'No recipe found'
          });
        }
        return res.status(200).send(recipes);
      })
      .catch(error => res.status(400).json(error));
  },
};

export default recipesController;