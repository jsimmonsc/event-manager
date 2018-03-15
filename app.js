const request = require('request');
const mongoose = require('mongoose');
const config = require('./config/config');
const Student = require('./models/student.model');
const RestClient = require('node-rest-client').Client;

const restClient = new RestClient()

let students = [];

mongoose.connect(config.dbURI, () => {
  useMongoClient: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log("Connected to mongodb.");
  if(!config.finesURI) {
    console.log("PowerSchool api url must be supplied to update student collection.");
  } else {
    runPowerSchoolUpdate();
  }
});

function runPowerSchoolUpdate() {
  restClient.get(config.finesURI, function (data, response) {
    console.log('Updating powerschool student info.');
    students = data.items;
    request(config.attendanceURI, (err, res, body) => {
      let att = res.body.split('\n').map(Number).filter(Boolean);
      for (let i = 0; i < students.length; i++) {
	students[i].attendance = att.includes(students[i].student_number);
      }
      
      students.forEach((element) => {
        var student = {
          schoolid: element.schoolid,
          first_name: element.first_name,
          last_name: element.last_name,
          student_number: element.student_number,
          grade_level: element.grade_level,
          fines: !!element.fines,
          attendance: element.attendance
        };
        Student.update({ student_number: element.student_number }, student, { upsert: true }, function (err) {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  });
  setTimeout(runPowerSchoolUpdate, 60*1000*10)
}
