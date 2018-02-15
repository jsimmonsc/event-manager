const controller = require('../controllers/auth.controller');
const validateJWT = require('../auth/jwt-validator');

module.exports = (app) => {
  app.post("/authorize", validateJWT, controller.authorize);
  app.post("/users/create", validateJWT, controller.create);
}