const fs = require("fs");
const { xmlToObject } = require("./xmlToObject");

const xml = fs.readFileSync("./test/sample.xml");

xmlToObject(xml).then((data) => console.log(util.inspect(data, { colors: true, depth: 1000 })));
