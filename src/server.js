'use strict';

const express = require('express');
const notFound = require('./middleware/404');
const error = require('./middleware/500');
const authRouter = require('./auth/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRouter);

app.use('*', notFound);
app.use(error);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => console.log(`Server up on port ${port}`));
  },
};
