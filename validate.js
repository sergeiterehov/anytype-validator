// @ts-check
const { validators, validator, Uses } = require("./validators");

const validate = (schema, target, additionalTypes = {}) => {
    return validator({
        ...validators,
        ...schema.types,
        ...additionalTypes,
    }, "$", Uses.Required, "$", target, {});;
};

module.exports = {
    validate,
};
