const table = require('./symbol-table')
const {addEntry, contains, getAddress} = table
let {ramAddress} = table
const code = require('./code')
const {dest, comp, jump} = code

// Program counter +1 every time A or C instruction is encountered 
let pc = -1

function parser(instructions, isFirst) {
    return advance(instructions, isFirst)
}

function hasMoreCommands(instructions) {
    return instructions.length > 0? true : false
}

// Match the comment in the instruction
const reg3 = /(\/\/).+/
function advance(instructions, isFirst) {
    let current, type, binaryOut = ''
    while (hasMoreCommands(instructions)) {
        current = instructions.shift().trim()

        if (isInstructionInvalid(current)) {
            continue
        }
        // If there is a comment on the right side of the instruction, delete it
        current = current.replace(reg3, '').trim()
        type = commandType(current)

        // isFirst The first parsing will not parse the instructions, only collect the symbols Format: (xxx)
        switch (type) {
            case 'C':
                if (!isFirst) {
                    let d = dest(current)
                    let c = comp(current)
                    let j = jump(current)
                    binaryOut += '111' + c + d + j + '\r\n'
                } else {
                    pc++
                }
                
                break
            case 'A':
                if (!isFirst) {
                    let token = symbol(current, type)
                    let binary
                    if (isNaN(parseInt(token))) {
                        if (contains(token)) {
                            binary = int2Binary(getAddress(token))
                        } else {
                            binary = int2Binary(ramAddress)
                            addEntry(token, ramAddress++)
                        }
                    } else {
                        binary = int2Binary(token)
                    }
                    binaryOut += binary + '\r\n'
                } else {
                    pc++
                }
                
                break
            case 'L':
                if (isFirst) {
                    let token = symbol(current, type)
                    addEntry(token, pc + 1)
                }
                break
        }
    }

    return binaryOut
}
// Return instruction type
function commandType(instruction) {
    if (instruction.charAt(0) === '@') {
        return 'A'
    } else if (instruction.charAt(0) === '(') {
        return 'L'
    } else {
        return 'C'
    }
}
// Extract @xxx or xxx in (xxx)
const reg1 = /^\((.+)\)$/
function symbol(instruction, type) {
    if (type === 'A') {
        return instruction.substr(1)
    } else if (type === 'L') {
        return instruction.replace(reg1, '$1')
    }
}
// Convert decimal number to binary instruction
function int2Binary(num) {
    let str = parseInt(num).toString(2)

    while (str.length !== 16) {
        str = '0' + str
    }

    return str
}
// Match sentences beginning with comments
const reg2 = /^(\/\/)/
// Is the instruction valid
function isInstructionInvalid(instruction) {
    if (instruction == '' || reg2.test(instruction)) {
        return true
    }

    return false
}

module.exports = parser
