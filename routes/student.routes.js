var controller = require('../controllers/student.controller');

module.exports = (app) => {

    app.get('/students/:id', controller.findOne);
}

