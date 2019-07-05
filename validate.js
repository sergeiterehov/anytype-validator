const { defaultTypes, Uses } = require("./defaultTypes");

const validate = (schema, target, additionalTypes = {}) => {
    return defaultTypes.$.validator({
        ...defaultTypes,
        ...schema.types,
        ...additionalTypes,
    }, "$", Uses.Required, "$", target, {});;
};

module.exports = {
    validate,
};
