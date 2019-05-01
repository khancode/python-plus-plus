const fs = require('fs');

const FILE = 'test/index.py';
const TYPE = 'utf8';
const REGEX = new RegExp('[\\-]*[a-zA-z]+[a-zA-Z0-9]*\\+\\+', 'g');

let text = fs.readFileSync(FILE, TYPE);

let match;
while ((match = REGEX.exec(text)) != null) {
    // console.log('match:', match);
    const textFound = match[0];
    const index = match.index;
    // console.log('textFound:', textFound);
    // console.log('index:', index);

    const varText = textFound.substring(0, textFound.length - 2);
    const pythonIncrementText = `${varText} += 1`;

    // Replace ++ with += 1 in original text
    const modified = text.substring(0, index) + pythonIncrementText + text.substring(index + textFound.length);
    // console.log('modified:', modified);

    text = modified;
}

// console.log(text);

fs.writeFileSync(`./build/test/index.bundle.py`, text, TYPE);
