import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import _ from 'lodash';

import db from '../models';

const User = db.User;

const secret = process.env.SECRET_TOKEN;

const regRules = {
  name: 'required|min:3',
  email: 'required|email',
  password: 'required|min:6',
  verify_password: 'required',
  telephone: 'required',
  username: 'required|min:3',
  user_image: 'required'
};

const usersController = {

  create(req, res) {
    const body = req.body;
    const validator = new Validator(body, regRules);
    if (validator.passes()) {
      if (body.verify_password !== body.password) {
        return res.status(401).send({ message: 'Password does not match' });
      }
      return User.findOne({
        where: { username: body.username }
      })
        .then((user) => {
          if (user) {
            if (user.email === body.email) {
              return res.status(400).json({ code: 404, message: `User with ${body.email} already exists` });
            }
            if (user.username === body.username) {
              return res.status(400).json({ code: 404, message: `User with ${body.username} already exists` });
            }
          }
          User.create(body)
            .then((savedUser) => {
              const data = _.pick(savedUser, ['id', 'name', 'email', 'telephone', 'username', 'user_image']);
              const myToken = jwt.sign(data, secret, { expiresIn: 24 * 60 * 60 });
              return res.status(200).json({
                code: 200,
                token: myToken,
                message: 'Registration Succesfull'
              });
            })
            .catch(error => res.status(500).send(error));
        })
        .catch((error) => {
          return res.status(500).send('An error occured while trying to create a user ', error.message);
        });
    } else return res.status(400).json({ message: validator.errors.all() });
  },

  login(req, res) {
    const body = _.pick(req.body, ['username', 'password']);
    const loginRules = {
      username: 'required',
      password: 'required'
    };
    const validator = new Validator(body, loginRules);
    if (validator.fails()) {
      return res.status(401).json({ message: validator.errors.all() });
    }
    User.findOne({
      where: {
        username: body.username
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: 'User with Username / Password does not exists'
          });
        }
        if (!user.comparePassword(user, req.body.password)) {
          return res.status(400).json({
            message: 'User with Username / Password does not exists'
          });
        }
        const data = _.pick(user, ['id', 'name', 'email', 'telephone', 'username', 'user_image']);
        const myToken = jwt.sign(data, secret, { expiresIn: 24 * 60 * 60 });
        return res.status(200).json({
          token: myToken,
          message: 'Login Successful'
        });
      })
      .catch(error => res.send(error));
  },
};
export default usersController;
