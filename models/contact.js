const {Schema, model} = require("mongoose");
const Joi = require("Joi");

// const isbnRegexp = /^[0-9]{3}-[0-9]{1}-[0-9]{3}-[0-9]{5}-[0-9]{1}$/;

const contactSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
},
    { versionKey: false, timestamps: true }
);


const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required()
});

const schemas = {
    add: addSchema,
    updateFavorite: updateFavoriteSchema
};

const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required()
})

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas, favoriteJoiSchema };

