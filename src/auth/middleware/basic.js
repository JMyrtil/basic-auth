'use strict';

const base64 = require('base-64');
const { Users } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
    return;
  }

  const encoded = req.headers.authorization.split(' ').pop();
  const decoded = base64.decode(encoded);
  const [username, password] = decoded.split(':');

  try {
    const user = await Users.findOne({ where: { username: username } });
    const valid = await user.authenticate(password);

    if (valid) {
      req.user = user;
      next();
      return;
    }

    throw new Error('Invalid Login');
  } catch (error) {
    next('Invalid Login');
  }
};
