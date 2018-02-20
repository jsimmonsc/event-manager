var User = require('../models/user.model');

exports.authorize = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate({ email: req.body.email }, { $set: { currentToken: req.body.token } }, {new: true});
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(401).send("Authentication failed, user not found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

exports.create = async (req, res) => {
  try {
    res.send(await User.create(req.body));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

exports.findAll = async (req, res) => {
  try {
    res.send(await User.find());
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

exports.delete = async (req, res) => {
  try {
    res.send(User.findOneAndRemove({ email: req.body.email }));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

exports.updateRole = async (req, res) => {
  try {
    res.send(User.findOneAndUpdate({ email: req.body.email }, { $set: { role: req.body.role } }));
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}