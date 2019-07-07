module.exports = {
    ...require("./validate"),

    validator: {
        ...require("./adapters/json"),
        ...require("./adapters/xml"),
    },

    parser: {
        ...require("./parsers/json"),
        ...require("./parsers/xml"),
    },
};
