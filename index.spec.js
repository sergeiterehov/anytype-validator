const fs = require("fs");
const { Uses } = require("./index");
const { defaultTypes } = require("./defaultTypes");

const src = "../anytype/test/Widget.at.json" || "./test/sample.at.json";
const schema = JSON.parse(fs.readFileSync(src));

const target = JSON.parse(fs.readFileSync("./test/sample.json"));

const error = defaultTypes.$.validator({
    ...defaultTypes,
    ...schema.types,
}, "$", Uses.Required, "$", target, {});

console.log(error);
