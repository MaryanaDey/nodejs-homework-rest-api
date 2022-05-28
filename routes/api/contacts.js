const express = require('express');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");


const { isValidObjectId } = require("mongoose");

const { createError } = require("../../helpers");

const router = express.Router();
const { schemas, Contact } = require("../../models/contact");

// const {SECRET_KEY} = process.env;
const {auth} = require("../../middlewares");

// POST /api/auth/signup
// POST /api/auth/register

router.get("/", auth, async (req, res, next) => {
    const { _id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    try {
        const result = await Contact.find(
            { owner: _id },
            "-createdAt -updatedAt",
        {skip, limit: Number(limit)})
            .populate("owner", "email");
        res.json(result);
    } catch (error) {
        next(error);
    }
});

router.get("/:contactId", auth, async (req, res, next) => {
    const {_id: owner} = req.user;
    try {
        const {contactId} = req.params;
        const isValid = isValidObjectId(contactId);
        if(!isValid){
            throw createError(404);
        }
        const result = await Contact.findOne({ _id: contactId, owner }, "-createdAt -updatedAt");
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    };
})

router.post("/", auth, async (req, res, next) => {
    const { _id } = req.user;
    console.log(_id);
    try {
        const { error } = schemas.add.validate(req.body);
        if(error){
            throw createError(400, error.message);
        }

        const result = await Contact.create({...req.body, owner: _id});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

router.put("/:contactId", auth, async(req, res, next) => {
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


router.delete("/:contactId", auth, async (req, res, next) => {
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


router.patch("/:contactId/favorite", auth,  async(req, res, next) => {
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
