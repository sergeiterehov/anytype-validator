const { validate } = require("../validate");
const { xml: parseXml } = require("../parsers/xml");

const xml = async (schema, xml) => {
    const data = await parseXml(xml);

    return validate(schema, data);
};

module.exports = {
    xml,
};
