// @ts-check
const { Uses } = require("./types");
const {
    validateFloat,
    validateInteger,
    validateString,
    validateAny,
} = require("./simpleTypes");
const { validate } = require("./validate");
const { validateObject } = require("./object");
const { validateArrayOf } = require("./arrayOf");
const { validateOneOf } = require("./oneOf");
const { validateValue } = require("./value");

const validators = {
    $: { validator: validate },
    integer: { validator: validateInteger },
    float: { validator: validateFloat },
    string: {validator: validateString },
    object: { validator: validateObject },
    array_of: { validator: validateArrayOf },
    one_of: { validator: validateOneOf },
    value: { validator: validateValue },
    any: { validator: validateAny },
};

module.exports = {
    validators,
    validator: validate,
    Uses,
};
