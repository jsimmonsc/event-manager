var Event = require('../models/event.model');

exports.create = async (req, res) => {
    try {
        res.send(await Event.create(req.body));
        console.log("Created event: " + JSON.stringify(req.body));
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
        res.send(await Event.findById(req.params.id));
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.updateOne = async (req, res) => {
    try {
        res.send(await Event.findByIdAndUpdate(req.params.id, { $set: req.body }));
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

exports.updateAttendee = async (req, res) => {
    try {
        if(Object.keys(await Event.find({_id: req.params.id, 'attendees._id': req.params.ticketnum})).length === 0) {
            res.status(404).send({message: "Attendee does not exist!"})
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
        res.send(await Event.findByIdAndUpdate(req.params.id, {$pull: { attendees: { _id: req.params.ticketnum }}}));
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
        var doc = await Event.findById(req.params.id, { attendees: { $elemMatch: { student_number: req.params.studentid }}});
        res.send(doc["attendees"][0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}