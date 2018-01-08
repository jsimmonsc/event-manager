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

exports.findAll = async (req, res) => {
    try {
        res.send(await Event.find().select("-attendees"));
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.fineOne = async (req, res) => {
    try {
        res.send(await Event.findById(req.params.id));
    } catch(err) {
        res.status(500).send(err);
    }
}