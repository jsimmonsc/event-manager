const User = require('../models/user.model');

exports.checker = async (req, res, next) => {
  const user = await User.findOne({ currentToken: req.headers.authorization.split(" ")[1] });
  const roles = ['admin', 'super', 'checker'];

  if (user && roles.includes(user.role)) {
    return next();
  }

  res.status(401).send('Access denied.');
};

exports.admin = async (req, res, next) => {
  const user = await User.findOne({ currentToken: req.headers.authorization.split(" ")[1] });
  const roles = ['admin', 'super'];

  if (user && roles.includes(user.role)) {
    return next();
  }

  res.status(401).send('Access denied.');
};

exports.super = async (req, res, next) => {
  const user = await User.findOne({ currentToken: req.headers.authorization.split(" ")[1] });
  const roles = ['super'];

  if (user && roles.includes(user.role)) {
    return next();
  }

  res.status(401).send('Access denied.');
};

exports.seller = async (req, res, next) => {
  const user = await User.findOne({ currentToken: req.headers.authorization.split(" ")[1] });
  const roles = ['admin', 'super', 'seller'];

  if (user && roles.includes(user.role)) {
    return next();
  }

  res.status(401).send('Access denied.');
};

exports.all = async (req, res, next) => {
  const user = await User.findOne({ currentToken: req.headers.authorization.split(" ")[1] });
  const roles = ['admin', 'super', 'seller', 'checker'];

  if (user && roles.includes(user.role)) {
    return next();
  }

  res.status(401).send('Access denied.');
};