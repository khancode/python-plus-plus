const fs = require('fs');

const FILE = 'test/index.py';
const TYPE = 'utf8';
const REGEX = new RegExp('[\\-]*[a-zA-z]+[a-zA-Z0-9]*\\+\\+', 'g');

const text = fs.readFileSync(FILE, TYPE);

let match;
while ((match = REGEX.exec(text)) != null) {
    console.log(match);
}