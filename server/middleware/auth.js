const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

const Auth = {
  verifyToken(req, res, next) {
    const token = req.headers.Authorization || req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
        .send({ message: 'No authorization token provided' });
    }

    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).send({ message: 'Invalid authorization token' });
      }
      req.decoded = decoded;
      next();
    });
  },
  verifyUser(req, res, next) {
    if (req.decoded && req.decoded.is_admin) return next();
    return res.status(401).send({ message: 'You must be a user to perform this operation' });
  }

};

module.exports = Auth;