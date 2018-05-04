const controller = require('../controllers/student.controller');
const validateJWT = require('../auth/jwt-validator');
const guards = require('../auth/auth-guards');

module.exports = (app) => {
    app.get('/students/:id', validateJWT, guards.seller, controller.findOne);
}

