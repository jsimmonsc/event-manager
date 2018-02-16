const controller = require('../controllers/event.controller');
const validateJWT = require('../auth/jwt-validator');

module.exports = (app) => {
    app.post('/events', validateJWT, controller.create);
    app.get('/events', validateJWT, controller.findAll);
    app.get('/events/id/:id', validateJWT, controller.findOne);
    app.put('/events/id/:id', validateJWT, controller.updateOne);
    app.put('/events/id/:id/:ticketnum', validateJWT, controller.updateAttendee);
    app.post('/events/id/:id', validateJWT, controller.createAttendee);
    app.delete('/events/id/:id/:ticketnum', validateJWT, controller.deleteAttendee);
    app.delete('/events/id/:id', validateJWT, controller.deleteEvent);
    app.get('/events/id/:id/:studentid', validateJWT, controller.findOneAttendee);
}