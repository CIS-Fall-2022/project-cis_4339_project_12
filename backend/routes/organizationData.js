// import express module
const express = require("express");
const router = express.Router();

// import organization schema
let {orgdata} = require("../models/models");

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