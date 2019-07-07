// @ts-check
const util = require("util");
const { Uses } = require("./types");

const validateAny = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required any`;
        } else if (uses === Uses.Option) {
            return;
        }
    }
};

const validateInteger = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required integer`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    if (! Number.isInteger(target)) {
        return `${path} must be integer`;
    }
};

const validateFloat = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required float`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    if (! Number.isFinite(target)) {
        return `${path} must be float`;
    }
};

const validateString = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required string`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    if (! util.isString(target)) {
        return `${path} must be string`;
    }
};

module.exports = {
    validateFloat,
    validateInteger,
    validateString,
    validateAny,
};
