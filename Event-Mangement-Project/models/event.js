const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({
    Hallname: String,
    HallLocation: String,
    TotalNoOfSeats: Number,
    TotalGoldenSeats: Number,
    TotalSilverSeats: Number

});

const hallmodel = mongoose.model("halls", hallSchema);

const eventSchema = new mongoose.Schema(
    {
        name: String,
        event_type: String,
        date_and_time: String,
        troop_name: String,
        contact_person: [{
            name: String,
            mobile: Number
        }],
        hall_details:[ hallSchema]

    }
);




const eventmodel = mongoose.model("Events", eventSchema);




module.exports = {
    eventmodel,
    hallmodel
}