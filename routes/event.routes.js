var controller = require('../controllers/event.controller');

module.exports = (app) => {
    app.post('/events', controller.create);
}