const controller = require('../controllers/student.controller');
const validateJWT = require('../auth/jwt-validator');

module.exports = (app) => {

    app.get('/students/:id', validateJWT, controller.findOne);
}

