const express = require("express");
const router = express.Router();
//allow using a .env file
require("dotenv").config();

// Ensures that ord ID is always capitalized
const ORG_ID = process.env.ORG_ID.toUpperCase();

//importing data model schemas
let { primarydata } = require("../models/models");
let { eventdata } = require("../models/models");

//GET all entries
router.get("/", (req, res, next) => {
    primarydata.find(
        // Filters event based on current org ID in the env file
        { organization_id: ORG_ID },
        (error, data) => {
            if (error) {
                return next(error);
                // If no data is returned, either org does not exist or no clients are found
            } else if (data.length == 0) {
                res.status(404).send(ORG_ID + " organization has no clients or does not exist.")
            } else {
                res.json(data);
            }
        }
    ).sort({ 'updatedAt': -1 }).limit(10);
});

//GET single entry by ID
router.get("/id/:id", (req, res, next) => {
    primarydata.find(
        { _id: req.params.id, organization_id: ORG_ID },
        (error, data) => {
            if (error) {
                return next(error);
                // If no data is returned, either org does not exist or client does not exist
            } else if (data.length == 0) {
                res.status(404).send("Client does not exist or organization does not exist.")
            }
            else {
                res.json(data);
            }
        }
    );
});

//GET entries based on search query
//Ex: '...?firstName=Bob&lastName=&searchBy=name' 
router.get("/search/", (req, res, next) => {
    let dbQuery = "";
    // Variable to store type of query for error message; ie. Name or Date
    let queryType = "";
    if (req.query["searchBy"] === 'name') {
        dbQuery = { firstName: { $regex: `^${req.query["firstName"]}`, $options: "i" }, lastName: { $regex: `^${req.query["lastName"]}`, $options: "i" } }
        queryType = "Client name";
    } else if (req.query["searchBy"] === 'number') {
        dbQuery = {
            "phoneNumbers.primaryPhone": { $regex: `^${req.query["phoneNumbers.primaryPhone"]}`, $options: "i" }
        }
        queryType = "Client number";
    };
    // Adding the organization ID to the dbQuery object for filtering
    dbQuery["organization_id"] = ORG_ID
    primarydata.find(
        dbQuery,
        (error, data) => {
            if (error) {
                return next(error);
            } else if (data.length == 0) {
                res.status(404).send(queryType + " not found or organization does not exist.")
            }
            else {
                res.status(404).send("Client could not be found.");
            }
        }
    );
});

//GET events for a single client
router.get("/events/:id", (req, res, next) => {
    eventdata.find(
        {
            attendees: req.params.id,
            organization_id: ORG_ID
        },
        (error, data) => {
            if (error) {
                return next(error);
            }else if (data.length == 0) {
                res.status(404).send("Client is not signed up for an event in this organization or organization does not exist.")
            } 
            else {
                res.json(data);
            }
        }
    );
});

//POST
router.post("/", (req, res, next) => {
    // Check if client exists first
    primarydata.find({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        "phoneNumbers.primaryPhone":req.body.phoneNumbers.primaryPhone,
        organization_id: ORG_ID
    },(error,data)=>{
        if(error){
            return next(error);
        }else if(data.length == 0){
            // Add organization ID to new event created
                req.body.organization_id = ORG_ID;
                primarydata.create(
                    req.body,
                    (error, data) => {
                        if (error) {
                            return next(error);
                        } else {
                            res.json(req.body.firstName + " has been added successfully.");
                        }
                    }
                );
                primarydata.createdAt;
                primarydata.updatedAt;
                primarydata.createdAt instanceof Date;
        } else{
            res.status(403).send("Client already exists.");
        }
    })
    
});

//PUT update (make sure req body doesn't have the id)
router.put("/:id", (req, res, next) => {
    if (req.params.id) {
        primarydata.findOneAndUpdate(
             // Find and update event based on ID and organization ID
            { _id: req.params.id, organization_id: ORG_ID},
            req.body,
            (error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.json(data);
                }
            }
        );
    } else {
        res.status(400).send("ERROR: No client ID provided.");
    }
});

//DELETE a client by id
// https://www.kindsonthegenius.com/nodejs/node-js-rest-api-with-typescript-part-3-post-put-delete/
router.delete("/:id", (req, res, next) => {
    primarydata.findOneAndDelete(
        { _id: req.params.id },
        req.body,
        (error, data) => {
            if (error) {
                return next(error);
            } else {
                res.send("Client has successfully been deleted.");
            }
        }
    );
});

module.exports = router;