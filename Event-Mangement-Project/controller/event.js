const express=require("express");
const { Router } = require("express");
const eventController=require("../services/event");
const { eventmodel } = require("../models/event");
const router = Router({ strict: true });


router.get("/events",eventController.getAllEvents);
router.get("/halls",eventController.getAllhalls);
router.get("/halls/:id",eventController.getByHall);
router.post("/halls",eventController.addHalls)
router.get("/events/:id",eventController.getEventsById);
router.post("/events",eventController.addEvents);
router.put("/events/:id",eventController.updateEvents);
router.delete("/events/:id",eventController.deleteEvents);


module.exports=router;