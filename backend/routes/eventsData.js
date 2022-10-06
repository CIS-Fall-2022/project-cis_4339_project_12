const express = require("express");
const router = express.Router();

//importing data model schemas
let { eventdata } = require("../models/models"); 
let { primarydata } = require("../models/models"); 

//GET all entries
router.get("/", (req, res, next) => { 
    eventdata.find( 
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => { 
    eventdata.find({ _id: req.params.id }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 

router.get("/search/", (req, res, next) => { 
    let dbQuery = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } }
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date:  req.query["eventDate"]
        }
    };
    eventdata.find( 
        dbQuery, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { attendees: req.params.id }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

// GET attendee count for specific event within last 2 months
// https://stackoverflow.com/questions/21387969/mongodb-count-the-number-of-items-in-an-array
router.get("/attendees",(req,res,next)=>{
    let todayDate = new Date();
    // Sets month to two months ago
    todayDate.setMonth(todayDate.getMonth() - 2);
    let twoMonthsAgo = todayDate;
    eventdata.aggregate([
        {
            $match: {date:{$gte: twoMonthsAgo}},
        },
        {
            $project:{eventName:1, attendees:1}
        },
        {
            $group:{
                _id:"$_id",
                eventName: {$first:"$eventName"},
                totalAttendees:{
                    $sum:{
                        $size:"$attendees"
                    }
                }
            }
        }
    ],(error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
        }
    });
});

//POST
router.post("/", (req, res, next) => { 
    eventdata.create( 
        req.body, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                res.send("Event has been successfully created.");
            }
        }
    );
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send("Event has been successfully updated.");
            }
        }
    );
});

//PUT add attendee to event
router.put("/attendee/:id", (req, res, next) => {
    //only add attendee if not yet signed up
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                // This line ensures that the attendee does not already exist
                if (data.length == 0) {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $push: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.send("Client has been successfully added to event.");
                            }
                        }
                    );
                }
                
            }
        }
    );
    
});

//DELETE event data
router.delete("/:id", (req, res, next) => {
    eventdata.findByIdAndDelete(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

router.delete("/attendee/:id", (req, res, next) => {
    eventdata.find( 
        { _id: req.params.id, attendees: req.body.attendee }, 
        (error, data) => { 
            if (error) {
                return next(error);
            } else {
                    eventdata.updateOne(
                        { _id: req.params.id }, 
                        { $pull: { attendees: req.body.attendee } },
                        (error, data) => {
                            if (error) {
                                return next(error);
                            } else {
                                res.send("Client has been successfully removed from event.");
                            }
                        }
                    );  
            }
        }
    );
    
});
module.exports = router;

