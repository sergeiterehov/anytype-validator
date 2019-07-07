// @ts-check
const util = require("util");
const { Uses } = require("./types");
const { validate } = require("./validate");

const validateOneOf = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    const list = props.types;

    const error = list.reduce((error, typeName, i) => {
        if (! error) {
            return false;
        }

        const baseTypeName = types[typeName].$;
        const baseType = types[baseTypeName];
        const key = baseType.defined ? baseTypeName : i;

        return validate(types, typeName, Uses.Required, `${path}(${key})`, target, {});
    }, "never compability");

    if (error) {
        return `${path} must implements one of defined types:\n${error}`;
    }
};

module.exports = {
    validateOneOf,
};
