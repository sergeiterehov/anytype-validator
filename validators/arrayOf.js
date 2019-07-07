// @ts-check
const util = require("util");
const { Uses } = require("./types");
const { validate } = require("./validate");

const validateArrayOf = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required array`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    if (! util.isArray(target)) {
        return `${path} must be array`;
    }

    if (props.limits) {
        const [min, max] = props.limits;

        if (target.length < min || target.length > max) {
            return `${path} must contains no more then ${max} and more less ${min} elements`;
        }
    }

    const error = target.reduce((error, item, i) => {
        if (error) {
            return error;
        }

        return validate(types, props.type, Uses.Required, `${path}[${i}]`, item, props);
    }, undefined);

    if (error) {
        return error;
    }
};

module.exports = {
    validateArrayOf,
};
