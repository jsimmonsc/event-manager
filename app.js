var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dbConfig = require('./config/db.config');
var RestClient = require('node-rest-client').Client;
var app = express();
var Student = require('./models/student.model');

var restClient = new RestClient();

mongoose.connect(dbConfig.uri, () => {
  useMongoClient: true
});
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log("Connected to mongodb.");
  if(dbConfig.restURL) {
    console.log("PowerSchool api url must be supplied to update student collection.");
    runPowerSchoolUpdate();
  }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

require('./routes/student.routes')(app);
require('./routes/event.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  })
});



function runPowerSchoolUpdate() {
  restClient.get(dbConfig.restURL, function (data, response) {
    console.log('Updating powerschool student info.');
    data.items.forEach(function (element) {
      var student = {
        schoolid: element.schoolid,
        first_name: element.first_name,
        last_name: element.last_name,
        student_number: element.student_number,
        grade_level: element.grade_level,
        fines: !!element.fines
      };
      Student.update({ student_number: element.student_number }, student, { upsert: true }, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  });
  setTimeout(runPowerSchoolUpdate, 60*1000*10)
}

module.exports = app;
