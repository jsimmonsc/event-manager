const controller = require('../controllers/auth.controller');
const validateJWT = require('../auth/jwt-validator');
const guards = require('../auth/auth-guards');

module.exports = (app) => {
  app.post("/authorize", validateJWT, controller.authorize);
  app.post("/users/create", validateJWT, guards.super, controller.create);
  app.get("/users", validateJWT, guards.super, controller.findAll);
  app.delete("/users", validateJWT, guards.super, controller.delete);
}