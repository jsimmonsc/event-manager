var Student = require('../models/student.model');

exports.findOne = async function(req, res) {
  try {
    res.send(await Student.findOne({student_number: req.params.id}));
  } catch(err) {
    res.status(500).send(err);
  }
}