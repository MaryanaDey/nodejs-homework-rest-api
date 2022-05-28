const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    required: true,
  },
}, { versionKey: false, timestamps: true });

const registerJoiSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    subscription: Joi.string().valid("starter", "pro", "business"),
    token: Joi.string(),
});


const subscriptionJoiSchema = Joi.object({
      subscription: Joi.string().valid("starter", "pro", "business").required()

})

const schemas = {
    register: registerJoiSchema,
    login: registerJoiSchema
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
    subscriptionJoiSchema
}