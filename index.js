const fs = require('fs');

// const FILE = 'test/index.py';
const TYPE = 'utf8';
const REGEX = new RegExp('[\\-]*[a-zA-z]+[a-zA-Z0-9]*\\+\\+', 'g');

// let text = fs.readFileSync(FILE, TYPE);

const pythonFiles = [];

recursivelyReadFiles('python-src', pythonFiles, 'py');

console.log('pythonFiles:', pythonFiles);

pythonFiles.forEach((filePath) => {
    const resultText = parseFile(filePath, TYPE);
    fs.writeFileSync(`build/${filePath}`, resultText, TYPE);
});

function recursivelyReadFiles(dir, files, fileType) {
    // Read all files in a directory
    fs.readdirSync(dir).forEach(
        (file) => {
            const fullPath = `${dir}/${file}`;
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                return recursivelyReadFiles(fullPath, files, fileType);
            } else if (file.split('.').pop() === fileType) {
                return files.push(fullPath);
            }
        });
}

function parseFile(filePath, type) {
    let text = fs.readFileSync(filePath, type);

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

    return text;
}
