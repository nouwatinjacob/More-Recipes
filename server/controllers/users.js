const User = require('../models').User;

module.exports = {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        telephone: req.body.telephone,
        username: req.body.username,
        user_image: req.body.user_image,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
};