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

exports.findOne = async (req, res) => {
    try {
        res.send(await Event.findById(req.params.id));
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.updateOne = async (req, res) => {
    try {
        res.send(await Event.findByIdAndUpdate(req.params.id, { $set: req.body }));
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.updateAttendee = async (req, res) => {
    try {
        if(Object.keys(await Event.find({'attendees._id': req.params.ticketnum})).length === 0) {
            res.status(404).send({message: "Attendee does not exist!"})
            return;
        }
        req.body._id = req.params.ticketnum;
        res.send(await Event.findOneAndUpdate({'attendees._id': req.params.ticketnum }, 
            { $set: {
                'attendees.$': req.body
                }
            }));
    } catch(err) {
        res.status(500).send(err);
    }
}

exports.createAttendee = async (req, res) => {
    try {
        res.send(await addAttendee(req.body, req.params.id));
    } catch (err) {
        res.status(500).send(err);
    }
}

async function addAttendee(attendee, event) {
    attendee._id = (await Event.findById(event)).sales;

    return await Event.findByIdAndUpdate(event, 
        { 
            $push: {attendees: attendee},
            $inc: {sales: 1}
        }, {new: true});
}

exports.deleteAttendee = async (req, res) => {
    try {
        res.send(await Event.findByIdAndUpdate(req.params.id, {$pull: { attendees: { _id: req.params.ticketnum }}}));
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        res.send(await Event.findByIdAndRemove(req.params.id));
    } catch (error) {
        res.status(500).send(error);
    }
}