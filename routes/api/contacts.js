const express = require('express')
const Joi = require("joi");
const router = express.Router()

const { createError } = require("../../helpers");

const contacts = require("../../models/contacts");

const contactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})


router.get("/", async (req, res, next) => {
    try {
        const result = await contacts.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.get("/:contactId", async (req, res, next) => {

    try {
        const result = await contacts.listContacts();
        res.json(result);
    } catch (error) {
        next(error);
    }
})

router.post("/", async (req, res, next) => {
  try {
        const {error} = contactSchema.validate(req.body);
        if(error){
            throw createError(400, error.message);
        }
        const {name, email, phone} = req.body;

        const result = await contacts.addContact (name, email,phone);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
        const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        if(!result){
            throw createError(404);
        }
        res.json({
            message: "book deleted"
        });
    } catch (error) {
        next(error);
    }
})

router.put("/:contactId", async (req, res, next) => {
   try {
        const {error} = contactSchema.validate(req.body);
        if(error){
            throw createError(400, error.message);
        }
        const {contactId} = req.params;
        const {name, email, phone} = req.body;
        const result = await contacts.updateByContact(contactId, name, email, phone);
        if(!result){
            throw createError(404);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
})

module.exports = router
