const Event=require("../models/book")

exports.getbookdetailsbyId=async(req,res,next)=>{
  const _id=req.params.id;
  // const us=users_id.toString();
        try{
          //db.books.findOne({user_name:"which one"})
          // db.books.findOne({user_id:"651f0d12b7dfcc563ea02927"});
          return res.status(200).json(await Event.booking.findById(_id));
        }catch(err){
          return res.status(500).send(err.message);
        }
}
exports.getallbooks=async (req, res, next) => {
  try {
      const k = await Event.booking.find().lean();
      console.log(k);
      return res.status(200).json(k);
  }
  catch (error) {
      return res.status(500).json(error);
  }
};
exports.getevent=async(req,res,next)=>{
  try{
            return res.status(200).json(await Event.eventdetails.find());l
        }catch(err){
            return res.status(500).send(err.message);
            //console.log(err);
    
        }
}
exports.getbook=async(req,res,next)=>{
        const _id=req.params.id;
        try{
          return res.status(200).json(await Event.booking.findById({_id}));
        }catch(err){
          return res.status(500).send(err.message);
        }
}
exports.getSpecificEvent=async(req,res,next)=>{
  const _id=req.params.id;
  try{
    return res.status(200).json(await Event.eventdetails.findById({_id}));
  }catch(err){
    return res.status(500).send(err.message);
  }
}

exports.book=async(req,res,next)=>{
    //const{name, description,price,category,stock_quantity,manufacturer,rating,release_date}=req.body;
      try{
          //const details={name, description,price,category,stock_quantity,manufacturer,rating,release_date};
          const BookingDetails=await new Event.booking(req.body).save();
          return res.status(200).json(BookingDetails);
      }catch(err){
        return res.status(500).send(err.message); 
      }
}

exports.updatebook=async(req,res,next)=>{
  const _id=req.params.id;

  try{
   
  const proObj={...req.body};
   const updateProduct=await Event.findByIdAndUpdate({_id},{...req.body},{new:true});
   return res.status(200).json(updateProduct);
  }catch(err){
    res.status(500).send(err.message);
  }
}
exports.getnamebook=async (req,res)=>{
  try{
    //db.books.find({user_name:"Akila"})
    var me=await Event.booking.aggregate({$match:[{user_name:"Akila"}]});
    return res.status(200).send(me);
  }catch(err){
    return res.status(500).send(err.message);
  }
}

exports.deletebook=async(req,res,next)=>{
const id=req.params.id;

try{
    const del= await Event.booking.findByIdAndDelete(id);
    res.status(200).send("DELETED");
}catch(err){
    return res.status(500).send(err.message);
}
}

