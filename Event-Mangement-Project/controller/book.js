const { Router}=require("express");
const router=Router({strict:true});
const eventServices=require("../services/book.js");
 router.get("/book",eventServices.getallbooks);
// router.get("/book/:id",eventServices.getbook);
router.get("/event",eventServices.getevent);
router.get("/event/:id",eventServices.getSpecificEvent);
router.post("/book",eventServices.book);
router.get("/book/:id",eventServices.getbookdetailsbyId);
// router.put("/book/:id",eventServices.updatebook);
router.delete("/book/:id",eventServices.deletebook);
router.get("/name",eventServices.getnamebook)
module.exports=router;