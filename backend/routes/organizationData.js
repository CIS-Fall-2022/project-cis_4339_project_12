// TODO: ADD BETTER ERROR HANDLING WITH STATUS CODES

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
    orgdata.create(
        req.body,
        (error, data) => {
            if (error){
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

// PUT or Update organizations
router.put("/:id",(req, res,next) => {
    orgdata.findOneAndUpdate(
        {_id: req.params.id}, req.body,(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

// DELETE organization
router.delete("/:id",(req,res,next)=>{
    orgdata.findByIdAndDelete(
        {_id:req.params.id}, req.body,(error,data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data);
            }
        }
    );
});

module.exports = router;