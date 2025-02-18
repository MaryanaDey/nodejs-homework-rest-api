const {createError} = require("../helpers");

const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(createError(400, error.message));
            return;
        }
        next()
    }
};

module.exports = validation;