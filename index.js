const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const TYPE = 'utf8';
const REGEX = /^[\_a-zA-Z]+[\_a-zA-Z0-9]*((\+\+)|(\-\-))/gm;

const pythonFiles = [];

recursivelyReadFiles('python-src', pythonFiles, 'py');

console.log('pythonFiles:', pythonFiles);

pythonFiles.forEach((filePath) => {
    const resultText = parseFile(filePath, TYPE);
    const resultFilePath = `build/${filePath}`;
    const dirname = path.dirname(resultFilePath);

    // Check if dirname path exists, if it doesn't then create it
    mkdirp.sync(dirname);

    fs.writeFileSync(resultFilePath, resultText, TYPE);
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
        const textFound = match[0];
        const index = match.index;

        const varText = textFound.substring(0, textFound.length - 2);
        const operatorChar = textFound[textFound.length-1];
        const pythonIncrementText = `${varText} ${operatorChar}= 1`;

        // Replace ++ with += 1 in original text
        const modified = text.substring(0, index) + pythonIncrementText + text.substring(index + textFound.length);
        text = modified;
    }

    return text;
}
