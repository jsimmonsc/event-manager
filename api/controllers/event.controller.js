var Event = require('../models/event.model');

exports.create = async (req, res) => {
    try {
	delete req.body._id;
        res.send(await Event.create(req.body));
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.findAll = async (req, res) => {
    try {
        res.send(await Event.find().select("-attendees"));
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.findOne = async (req, res) => {
    try {
        var event = await Event.findById(req.params.id);
        if (event) {
            res.send(event);
        } else {
            res.status(404).send("Error: Event not found!");
        }
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.updateOne = async (req, res) => {
    try {
        if (!(await Event.findById(req.params.id))) {
            res.status(404).send("Error: Event does not exist!");
            return;
        }

        res.send(await Event.findByIdAndUpdate(req.params.id, { $set: req.body }, {new: true}));
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.updateAttendee = async (req, res) => {
    try {
        if(Object.keys(await Event.find({_id: req.params.id, 'attendees._id': req.params.ticketnum})).length === 0) {
            res.status(404).send("Error: Attendee does not exist!");
            return;
        }
        req.body._id = req.params.ticketnum;
        res.send(await Event.findOneAndUpdate({_id: req.params.id, 'attendees._id': req.params.ticketnum },
            { $set: {
                'attendees.$': req.body
                }
            }, {new: true}));
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.createAttendee = async (req, res) => {
    try {
        if(Object.keys(await Event.find({_id: req.params.id, 'attendees.student_number': req.body.student_number})).length > 0) {
            res.status(400).send("Error: Attendee already exists!");
            return;
        }

        res.send(await addAttendee(req.body, req.params.id));
    } catch (err) {
        console.error(err);
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
        res.send(await Event.findByIdAndUpdate(req.params.id, {$pull: { attendees: { _id: req.params.ticketnum }}}, {new: true}));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        res.send(await Event.findByIdAndRemove(req.params.id));
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

exports.findOneAttendee = async (req, res) => {
    try {
        var doc = await Event.findById(req.params.id, { attendees: { $elemMatch: { student_number: req.params.studentid } } });
        if (doc["attendees"][0]) {
            res.send(doc["attendees"][0]);
        } else {
            res.status(404).send("Error: Attendee not found in event!")
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}
