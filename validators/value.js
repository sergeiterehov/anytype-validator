// @ts-check
const util = require("util");
const { Uses } = require("./types");

const validateValue = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required value`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    const valueType = props.type;
    const value = props.value;

    if (target !== value) {
        const valueView = valueType === "string" ? `"${value}"` : value;

        return `${path} must be equal to ${valueType} ${valueView}`;
    }
};

module.exports = {
    validateValue,
};
