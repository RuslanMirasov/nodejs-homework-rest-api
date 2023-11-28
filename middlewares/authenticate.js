const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { SECRET_KEY } = process.env;
const { HttpError } = require('../helpers');

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    next(HttpError(401, `You are not logged in ${bearer}`));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) {
      next(HttpError(401, 'User not found!'));
    }
    next();
  } catch {
    next(HttpError(401, 'You are not logged in'));
  }
};

module.exports = authenticate;