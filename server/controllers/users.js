import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';
import db from '../models';
import _ from 'lodash';

const User = db.User;

const secret = 'iloveeatingpizza';

const regRules = {
  name: 'required|min:3',
  email: 'required|email',
  password: 'required|min:6',
  verify_password: 'required',
  telephone: 'required',
  username: 'required|min:3',
  user_image:'required'
};

module.exports = {

    create(req, res, next) {
        const body = req.body;
        const validator = new Validator(body, regRules);
        if (validator.passes()) {
            if (body.verify_password !== body.password) {
                return res.status(401).send({message: 'Password does not match'});
            }

            User.findOne({
                where: {email: body.email}
            })
                .then((user) => {
                    if (user) {
                        return res.status(404).json({code: 404, message: 'User already exists'});
                    }
                    User.create(body)
                        .then((savedUser) => {
                            const data = _.pick(savedUser, ['id', 'name', 'email', 'telephone', 'username', 'user_image']);
                            const myToken = jwt.sign(data, secret, {expiresIn: 24 * 60 * 60});
                            return res.status(200).send({token: myToken, message: 'Registration Succesful'});
                        })
                        .catch(error => res.status(500).send(error));
                })
                .catch((error) => {
                    return res.status(500).send('An error occured while trying to create a user ', error.message);
                });

        } else {
            return res.status(401).json({message: validator.errors.all()});
        }
    },

    login (req, res) {
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
                    return Promise.reject({ code: 404, message: 'User not found' });
                }
                if (!user.comparePassword(user, body.password)) {
                    return res.status(400).send({ message: 'Password does not match' });
                }
                const data = _.pick(user, ['id', 'name', 'email', 'telephone', 'username', 'user_image']);
                const myToken = jwt.sign(data, secret, { expiresIn: 24 * 60 * 60 });
                return res.status(200).json({ token: myToken, message: 'Login Successful' });
            })
            .catch(error => res.send(error));
    },
};