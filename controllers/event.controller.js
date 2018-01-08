var Event = require('../models/event.model');

exports.create = async (req, res) => {
    try {
        res.send(await Event.create(req.body));
        console.log("Created event: " + req.body);
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// exports.findAll = async (req, res) => {

// }