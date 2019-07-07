const fs = require("fs");
const validator = require("./");

const schemaFile = "./test/sample.at.json";
const targetDataFile = "./test/sample.json";

const jsonSchema = fs.readFileSync(schemaFile);
const jsonTarget = fs.readFileSync(targetDataFile);

const xmlTarget = fs.readFileSync("./test/sample.xml");

const schema = validator.parser.json(jsonSchema);

const errorJson = validator.validator.json(schema, jsonTarget);
console.log("JSON", errorJson);

const errorXml = validator.validator.xml(schema, xmlTarget);
errorXml.then((error) => console.log("XML", error));