import db from '../models';

const Favorite = db.Favorite;
module.exports = {
    create(req, res) {
        Favorite.findOne({
            where: {recipe_id: req.body.recipe_id, user_id: req.params.userId}
        }).then((favorite) => {
            if (favorite) {
                return res.status(404).json({code: 404, message: 'This Recipe exist in your Favorite'});
            }else{
                return Favorite.create({
                    recipe_id: req.body.recipe_id,
                    user_id: req.params.userId
                });
            }
        }).then((newFavorite) => {
            return res.status(200).json({code: 200, message: 'A new Favorite has been inserted ', data : newFavorite});
            console.log(" favorite : ", newFavorite);
        }).catch(error => res.status(400).send({
            message: 'Recipe not picked as your favorite',
            errors: error.errors
        }));
    },

    list(req, res) {
        return Favorite
        Favorite.findAll({
            where: {user_id: req.params.userId}
        }).then(favorites => res.status(200).send({message:'user\'s all Favorite Displayed', favorites}))
            .catch(error => res.status(400).send({ errors: error.message }));
    },
};