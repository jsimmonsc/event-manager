var controller = require('../controllers/event.controller');

module.exports = (app) => {
    app.post('/events', controller.create);
    app.get('/events', controller.findAll);
    app.get('/events/id/:id', controller.findOne);
    app.put('/events/id/:id', controller.updateOne);
    app.put('/events/id/:id/:ticketnum', controller.updateAttendee);
    app.post('/events/id/:id', controller.createAttendee);
    app.delete('/events/id/:id/:ticketnum', controller.deleteAttendee);
    app.delete('/events/id/:id', controller.deleteEvent);
}