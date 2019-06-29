const util = require("util");
const { Uses } = require("./index");

const validate = (types, typeName, uses, path, target, props) => {
    const type = types[typeName];

    if (! type) {
        return `Type "${typeName}" for ${path} not found`;
    }

    // Ref to other type
    if (undefined !== type.$) {
        return validate(types, type.$, uses, path, target, {...props, ...type});
    }

    if (undefined === type.validator) {
        return `Internal error (type "${typeName}" has not validation function) for ${path}`;
    }

    return type.validator(types, type, uses, path, target, props);
};

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

const validateArray = (types, type, uses, path, target, props) => {
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

const validateOneOf = (types, type, uses, path, target, props) => {
    if (target === undefined || target === null) {
        if (uses === Uses.Required) {
            return `${path} is required`;
        } else if (uses === Uses.Option) {
            return;
        }
    }

    const list = props.list;

    const error = list.reduce((error, typeName, i) => {
        if (error) {
            return error;
        }

        return validate(types, typeName, Uses.Required, `${path}(${i})`, target, {});
    }, undefined);

    if (error) {
        return error;
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

const defaultTypes = {
    $: { validator: validate },
    integer: { validator: validateInteger },
    object: { validator: validateObject },
    array: { validator: validateArray },
    one_of: { validator: validateOneOf },
};

module.exports = {
    defaultTypes,
};
