var Student = require('../models/student.model');

exports.findOne = async function(req, res) {
  try {
    const student = await Student.findOne({student_number: req.params.id});
    if(student) {
        res.send(student);
    } else {
	res.status(404).send("Student does not exist!");
    }    
  } catch(err) {
    res.status(500).send(err);
  }
}
