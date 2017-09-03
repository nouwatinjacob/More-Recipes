const User = require('../models').User;
const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_TOKEN;

const userDetails = (user) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    telephone: user.telephone,
    username: user.username,
    password: user.password,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    user_image: user.user_image
  };
};

const signUpRules = {
  name: 'required|min:3',
  email: 'required|email',
  password: 'required|min:6|confirmed',
  password_confirmation: 'required',
  telephone: 'required',
  username: 'required|min:3',
  user_image:'required' 
};

module.exports = {

  create(req, res) {
    const validation = new Validator(req.body, signUpRules);
    if (validation.passes()) {
      return User.create(req.body)
        .then((newUser) => {
          const token = jwt.sign(userDetails(newUser), secret, { expiresIn: '10h' });
          res.status(201).send({ message: 'User successfully created', token });
        })
        .catch(error => res.status(400).send({ message: 'User not created', error }));
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.errors.all()
    });
  },

  // create(req, res) {
  //   return User
  //     .create({
  //       name: req.body.name,
  //       email: req.body.email,
  //       telephone: req.body.telephone,
  //       username: req.body.username,
  //       user_image: req.body.user_image,
  //     })
  //     .then(user => res.status(201).send(user))
  //     .catch(error => res.status(400).send(error));
  // },
};