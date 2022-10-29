// These endpoints will only be used for testing purposes of organizations and their data.

// import express module
const express = require("express");
const router = express.Router();
//allow using a .env file
require("dotenv").config(); 
// Ensures that ord ID is always capitalized
const ORG_ID = process.env.ORG_ID.toUpperCase();
// import organization schema
let {orgdata} = require("../models/models");

// GET active organization
// TODO: Write error code for if no active organization found
router.get("/active",(req,res,next) => {
    orgdata.find({_id: ORG_ID},(error,data) =>{
        if (error){
            return next(error);
        }else{
            res.json(data);
        }
    }
    )
}
)
// GET all organizations
router.get("/",(req,res,next) => {
    orgdata.find((error, data) => {
        if (error){
            return next(error);
        } else {
            res.json(data);
        }
    })
});

// POST new organizations
router.post("/",(req,res,next)=>{
    if (req.body._id) {
        orgdata.create(
            req.body,
            (error) => {
                if (error){
                    return next(error);
                } else {
                    res.send(req.body._id + " has been added successfully.");
                }
            }
        );
    } else {
        res.status(400).send("ERROR: No organization ID provided.");
    }
    
});

// PUT or Update organizations
router.put("/:id",(req, res,next) => {
    if (req.params.id){
        orgdata.findOneAndUpdate(
            {_id: req.params.id}, req.body,(error, data) => {
                if (error) {
                    return next(error);
                } else {
                    res.send(req.params.id + " has been updated successfully.");
                }
            }
        );
    } else {
        res.status(400).send("ERROR: No organization ID provided.")
    }
});

// DELETE organization
router.delete("/:id",(req,res,next)=>{
    if (req.params.id){
        orgdata.findByIdAndDelete(
            {_id:req.params.id}, req.body,(error,data) => {
                if (error) {
                    return next(error);
                } else {
                    res.send(req.params.id + " has been deleted successfully.")
                }
            }
        );
    } else{
        res.status(400).send("ERROR: No organization ID provided.")
    }
    
});

module.exports = router;