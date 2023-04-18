'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { Users } = require('./models');
const basicAuth = require('./middleware/basic');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error.message);
  }
});

router.post('/signin', basicAuth, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
