// @ts-check
const util = require("util");
const { Uses } = require("./types");
const { validate } = require("./validate");

const validateObject = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required object`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    if (util.isArray(target) || ! util.isObject(target)) {
        return `${path} must be object`;
    }

    const fields = props.fields;

    const error = fields.reduce((error, field) => {
        if (error) {
            return error;
        }

        return validate(types, field.type, field.uses, `${path}.${field.name}`, target[field.name], {})
    }, undefined);

    if (error) {
        return error;
    }
};

module.exports = {
    validateObject,
};
