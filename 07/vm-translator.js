const fs = require('fs')
const {parser} = require('./parser')
const {writeInit} = require('./code-writer')

const fileName = process.argv[2]

// The final string to enter the file
let assembleOut = ''
// The file name of the final output
let outputFileName


let tempArry = fileName.split('.')
tempArry.pop() 
let preName = tempArry.join('.')
outputFileName = preName
let data = fs.readFileSync(fileName, 'utf-8')


processFileData(data, preName)
setFileName()


// Process file data
function processFileData(data, preName) {
    data = data.split('\r\n')
    assembleOut += parser(data, preName)
    assembleOut += data;
}

// Output file
function setFileName() {
    fs.writeFile(outputFileName + '.asm', assembleOut, (err) => {
        if (err) {
            throw err
        }
    })
}