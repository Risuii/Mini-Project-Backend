// import express
const express = require('express');

const app = express();

// import passport
const passport = require('./lib/passport');

// get port from env, if env not set, use 3000
const port = process.env.port || 3000;

// eslint-disable-next-line import/order
const cors = require('cors');

// import routes
const router = require('./routes');

// use middleware for request parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use passport for jwt auth
app.use(passport.initialize());

app.use(cors());
// use route
app.use(router);

// run app in port specified
app.listen(port);
