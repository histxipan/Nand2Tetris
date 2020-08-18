const table = require('./symbol-table')
const fs = require('fs')
const parser = require('./parser')

let fileName = process.argv[2]

fs.readFile(fileName, 'utf-8', (err, data) => {
    if (err) {
        throw err
    }
    // Instruction per line
    data = data.split('\r\n')

    // Resolve collection symbols for the first time
    parser([...data], true)

    // Real parsing instructions
    const binaryOut = parser(data)

    fileName = fileName.split('.')[0]

    fs.writeFile(fileName + '.hack', binaryOut, (err) => {
        if (err) {
            throw err
        }
    })
})