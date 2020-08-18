// Initialize the symbol table
const table = {}
let ramAddress = 16
table.SP = 0
table.LCL = 1
table.ARG = 2
table.THIS = 3
table.THAT = 4
table.SCREEN = 16384
table.KBD = 24576

let num = 16
let key
// R0 - R15
while (num--) {
    key = `R${num}`
    table[key] = num
}

// Add symbol to table
function addEntry(symbol, address) {
    table[symbol] = address
}
// Does the table contain symbols
function contains(symbol) {
    return table[symbol] !== undefined? true : false
}

function getAddress(symbol) {
    return table[symbol]
}

module.exports = {
    table,
    ramAddress,
    addEntry,
    contains,
    getAddress,
}