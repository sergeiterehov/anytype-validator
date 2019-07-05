const fs = require("fs");
const { Uses, validate } = require("./index");

const src = "./test/sample.at.json";
const schema = JSON.parse(fs.readFileSync(src));

const target = JSON.parse(fs.readFileSync("./test/sample.json"));

const error = validate(schema, target);

console.log(error);
