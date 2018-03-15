const controller = require('../controllers/event.controller');
const validateJWT = require('../auth/jwt-validator');
const guards = require('../auth/auth-guards');

module.exports = (app) => {
    app.post('/events', validateJWT,                     guards.admin,   controller.create);
    app.get('/events', validateJWT,                      guards.all,     controller.findAll);
    app.get('/events/id/:id', validateJWT,               guards.admin,   controller.findOne);
    app.put('/events/id/:id', validateJWT,               guards.admin,   controller.updateOne);
    app.put('/events/id/:id/:ticketnum', validateJWT,    guards.checker, controller.updateAttendee);
    app.post('/events/id/:id', validateJWT,              guards.seller,  controller.createAttendee);
    app.delete('/events/id/:id/:ticketnum', validateJWT, guards.admin,   controller.deleteAttendee);
    app.delete('/events/id/:id', validateJWT,            guards.admin,   controller.deleteEvent);
    app.get('/events/id/:id/:studentid', validateJWT,    guards.all,     controller.findOneAttendee);
}
