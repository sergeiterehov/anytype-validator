const fs = require("fs");
const { Uses } = require("./index");
const { defaultTypes } = require("./defaultTypes");

const src = "./test/sample.at.json";
const schema = JSON.parse(fs.readFileSync(src));

const target = JSON.parse(fs.readFileSync("./test/sample.json"));

const error = defaultTypes.$.validator({
    ...defaultTypes,
    ...schema.types,
}, "document", Uses.Required, "document", target, {});

console.log(error);
