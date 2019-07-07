// @ts-check

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

module.exports = {
    validate,
};
