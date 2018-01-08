var controller = require('../controllers/event.controller');

module.exports = (app) => {
    app.post('/events', controller.create);
    app.get('/events', controller.findAll);
    app.get('/events/id/:id', controller.fineOne);
}