const util = require("util");
const { Uses } = require("./index");

const validate = (types, typeName, uses, path, target, props) => {
    const type = types[typeName];

    // console.log(path, type, target, props)

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

const defaultTypes = {
    $: { validator: validate },
    integer: { validator: validateInteger },
    float: { validator: validateFloat },
    string: {validator: validateString },
    object: { validator: validateObject },
    array_of: { validator: validateArrayOf },
    one_of: { validator: validateOneOf },
    value: { validator: validateValue },
};

module.exports = {
    defaultTypes,
};
