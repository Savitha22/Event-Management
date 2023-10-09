const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema(
    {
        event_id:String,
        event_name:String,
        user_name:String,
        event_type:String,
        noOfSeats:Number,
        cost:Number,
      
        
    },
   
);
const eventSchema=new mongoose.Schema(
    {
        name:String,
        event_type:String,
        date_and_time:String,
        troop_name:String

        
    }
);

const userSchema=new mongoose.Schema(
    {
        name:String,
        email:String,
        password:String,
        phone:Number

        
    }
);

const booking=   mongoose.model("book",bookSchema)
const user=   mongoose.model("user",userSchema)
const eventdetails=mongoose.model("events",eventSchema)
module.exports={
    booking:booking,
    eventdetails:eventdetails,
    user:user
 
}