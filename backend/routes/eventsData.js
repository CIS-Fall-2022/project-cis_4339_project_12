const express = require("express");
const router = express.Router();
//allow using a .env file
require("dotenv").config();

// Ensures that ord ID is always capitalized
const ORG_ID = process.env.ORG_ID.toUpperCase();

//importing data model schemas
let { eventdata } = require("../models/models");

//GET all entries
router.get("/", (req, res, next) => {
    eventdata.find(
        // Filters event based on current org ID in the env file
        { organization_id: ORG_ID },
        (error, data) => {
            if (error) {
                return next(error);
                // TODO: Make note of this error code in the readme documentation
                // If no data is returned, either org does not exist or no events are found
            } else if (data.length == 0) {
                res.status(404).send(ORG_ID + " organization has no events or does not exist.")
            }
            else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    // Filters find based on event ID and organization ID 
    eventdata.find({ _id: req.params.id, organization_id: ORG_ID }, (error, data) => {
        if (error) {
            return next(error)
            // TODO: Make note of this error code in the readme documentation
            // If no data is returned, either org does not exist or event does not exist
        } else if (data.length == 0) {
            res.status(404).send("Event does not exist or organization does not exist.")
        }
        else {
            res.json(data)
        }
    })
});

//GET entries based on search query
//Ex: '...?eventName=Food&searchBy=name' 
router.get("/search/", (req, res, next) => {
    let dbQuery = "";
    // Variable to store type of query for error message; ie. Name or Date
    let queryType = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { eventName: { $regex: `^${req.query["eventName"]}`, $options: "i" } };
        queryType = "Event name";
    } else if (req.query["searchBy"] === 'date') {
        dbQuery = {
            date: req.query["eventDate"]
        };
        queryType = "Event date";
    };
    // Adding the organization ID to the dbQuery object for filtering
    dbQuery["organization_id"] = ORG_ID
    eventdata.find(
        dbQuery,
        (error, data) => {
            if (error) {
                return next(error);
                // TODO: Make note of this error code in the readme documentation
            } else if (data.length == 0) {
                res.status(404).send(queryType + " not found or organization does not exist.")
            }
            else {
                res.json(data);
            }
        }
    );
});

// This endpoint is not documented, we may want to consider removing it.
// TODO: What is the different between this end point and the get single client in the primaryData.js file
//GET events for which a client is signed up
router.get("/client/:id", (req, res, next) => { 
    eventdata.find( 
        { 
            attendees: req.params.id, 
            organization_id: ORG_ID
        }, 
        (error, data) => { 
            if (error) {
                return next(error);
                // TODO: Make note of this error code in the readme documentation
            } else if (data.length == 0) {
                res.status(404).send("Client is not signed up for an event in this organization or organization does not exist.")
            }
            else {
                res.json(data);
            }
        }
    );
});

// GET attendee count for specific event within last 2 months
// https://stackoverflow.com/questions/21387969/mongodb-count-the-number-of-items-in-an-array
router.get("/attendees", (req, res, next) => {
    let todayDate = new Date();
    // Sets month to two months ago
    todayDate.setMonth(todayDate.getMonth() - 2);
    let twoMonthsAgo = todayDate;
    eventdata.aggregate([
        {
            $match: { date: { $gte: twoMonthsAgo, $lte: new Date() }, organization_id: ORG_ID },
        },
        {
            $project:{eventName:1, attendees:1,date:1}
        },
        {
            $group:{
                _id:"$_id",
                eventName: {$first:"$eventName"},
                eventDate:{$last:"$date"},
                totalAttendees:{
                    $sum:{
                        $size:"$attendees"
                    }
                }
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error)
            // TODO: Make note of this error code in the readme documentation
        } else if (data.length == 0) {
            res.status(404).send("Organization has no events within the last two months or organization does not exist.")
        }
        else {
            res.json(data);
        }
    });
});

//POST
// Create new event
router.post("/", (req, res, next) => {
    eventdata.find({
        eventName: req.body.eventName,
        date: req.body.date,
        organization_id: ORG_ID
    }, (error, data) => {
        if (error) {
            return next(error);
        } else if (data.length == 0) {
            // Add organization ID to new event created
            req.body.organization_id = ORG_ID;
            eventdata.create(
                req.body,
                (error, data) => {
                    if (error) {
                        return next(error)
                    } else {
                        res.json(req.body.eventName + " has been successfully added.")
                    }
                }
            )
        } else {
            res.status(403).send("Event already exists.")
        }
    }
    )
});

//PUT
router.put("/:id", (req, res, next) => {
    eventdata.findOneAndUpdate(
        // Find and update event based on ID and organization ID
        { _id: req.params.id, organization_id: ORG_ID },
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
                res.send("Event has successfully been deleted.");
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

