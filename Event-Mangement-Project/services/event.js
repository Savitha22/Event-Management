const Event = require("../models/event");

exports.getAllEvents = async (req, res, next) => {
    try {
        const k = await Event.eventmodel.find().lean();
        console.log(k);
        return res.status(200).json(k);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

exports.getAllhalls = async (req, res, next) => {
    try {
        const k = await Event.hallmodel.find().lean();
        console.log(k);
        return res.status(200).json(k);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};

exports.addEvents = async (req, res, next) => {
    const eventObj = req.body;
    try {
        var moviess = await new Event.eventmodel(eventObj).save();
        return res.status(201).json(moviess);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}
exports.addHalls = async (req, res, next) => {
    const eventObj = req.body;
    try {
        var moviess = await new Event.hallmodel(eventObj).save();
        return res.status(201).json(moviess);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
}



exports.getEventsById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const getid = await Event.eventmodel.findById(id).lean();
        res.status(200).json(getid);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};
exports.getByHall=async (req, res, next) => {
    const id = req.params.id;
    try {
        const getid = await Event.hallmodel.findById(id).lean();
        res.status(200).json(getid);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateEvents = async (req, res) => {
    const id = req.params.id;
    const bd = req.body;
    try {
        const updatemovie = await Event.eventmodel.findByIdAndUpdate(id, bd, { new: true });
        res.status(200).json(updatemovie);
    }
    catch (error) {
        res.status(500).send(error.message);

    }
};

exports.deleteEvents = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteid = await Event.eventmodel.findByIdAndDelete(id);
        res.status(200).send("Event Deleted successfully")
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}
