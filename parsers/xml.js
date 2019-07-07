const util = require("util");
const { parseString } = require('xml2js');

const mapIt = (data) => {
    if (util.isArray(data)) {
        return data.map(mapIt);
    } else if (util.isObject(data)) {
        const object = {};

        Object.entries(data).forEach(([key, value]) => {
            if (key === "$") {
                Object.entries(mapIt(value)).forEach(([key, value]) => {
                    object[key] = mapIt(value);
                });
            } else {
                object[key] = mapIt(value);
            }
        });

        return object;
    } else if (util.isString(data) && /^\-?\d+(\.\d+)?$/.test(data)) {
        return Number(data);
    }

    return data;
};

const xml = (xml) => {
    return new Promise((done, cancel) => {
        parseString(xml, (err, data) => {
            if (err) {
                return cancel(err);
            }

            done(mapIt(data));
        });
    });
};

module.exports = {
    xml,
};
