const express = require('express');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


const { isValidObjectId } = require("mongoose");

const { createError } = require("../../helpers");

const router = express.Router();
const { schemas, Contact } = require("../../models/contact");

// const {SECRET_KEY} = process.env;
// const {auth} = require("../../middlewares");

// POST /api/auth/signup
// POST /api/auth/register

router.get("/", async (req, res, next) => {
    try {
        const result = await Contact.find({}, "-createdAt -updatedAt");
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/:contactId", async(req, res, next)=> {
    try {
        const {contactId} = req.params;
        const isValid = isValidObjectId(contactId);
        if(!isValid){
            throw createError(404);
        }
        const result = await Contact.findById(contactId, "-createdAt -updatedAt");
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    };
})

router.post("/", async(req, res, next)=> {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error){
            throw createError(400, error.message);
        }
        const result = await Contact.create(req.body);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

router.put("/:contactId", async(req, res, next) => {
    try {
        const {error} = schemas.add.validate(req.body);
        if(error){
            throw createError(400, error.message);
        }
        const {contactId} = req.params;
        const isValid = isValidObjectId(contactId);
        if(!isValid){
            throw createError(404);
        }
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
});


router.delete("/:contactId", async (req, res, next) => {
    try {
        const {contactId} = req.params;
        const isValid = isValidObjectId(contactId);
        if(!isValid){
            throw createError(404);
        }
        const result = await Contact.findByIdAndRemove(contactId);
        if(!result){
            throw createError(404);
        }
        res.json({
            message: "contact deleted"
        });
    } catch (error) {
        next(error);
    }
})


router.patch("/:contactId/favorite", async(req, res, next) => {
    try {
        const {error} = schemas.updateFavorite.validate(req.body);
        if(error){
            throw createError(400, error.message);
        }
        const {contactId} = req.params;
        const isValid = isValidObjectId(contactId);
        if(!isValid){
            throw createError(404);
        }
        const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
