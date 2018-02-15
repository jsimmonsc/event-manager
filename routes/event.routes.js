const controller = require('../controllers/event.controller');
const validateJWT = require('../auth/jwt-validator');

module.exports = (app) => {
    app.post('/events', validateJWT, controller.create);
    app.get('/events', controller.findAll);
    app.get('/events/id/:id', controller.findOne);
    app.put('/events/id/:id', controller.updateOne);
    app.put('/events/id/:id/:ticketnum', controller.updateAttendee);
    app.post('/events/id/:id', controller.createAttendee);
    app.delete('/events/id/:id/:ticketnum', controller.deleteAttendee);
    app.delete('/events/id/:id', controller.deleteEvent);
    app.get('/events/id/:id/:studentid', controller.findOneAttendee);
}