const parser = require("@babel/parser");
const generate = require("@babel/generator").default
const traverse = require("@babel/traverse").default
const types = require("@babel/types")
const evaluate = require('@babel/traverse').evaluate;
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "samples/cx/input.js")
code = fs.readFileSync(filePath, { encoding: "utf-8" });

const ast = parser.parse(code)
astPath = path.join(__dirname, "samples/cx/ast.json")
fs.writeFileSync(astPath, JSON.stringify(ast, null, 2))


const visitorHexUnicodeToString = {
  StringLiteral(path) {
    delete path.node.extra.raw;
  },
  NumericLiteral(path) {
    delete path.node.extra.raw;
  }
}

traverse(ast, visitorHexUnicodeToString)
const result = generate(ast)
console.log('code:')
console.log(result.code)

// outcodepath = path.join(__dirname, "data/pretty.char.1.js")
// fs.writeFileSync(outcodepath, result.code)

