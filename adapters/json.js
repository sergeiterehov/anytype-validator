const { validate } = require("../validate");

const json = (schema, json) => {
    const data = JSON.parse(json);

    return validate(schema, data);
};

module.exports = {
    json,
};
