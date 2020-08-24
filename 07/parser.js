const {    
    writePushPop,
    writeArithmetic,
    writeLabel,
    writeGoto,
    writeIf,
    writeCall,
    writeReturn,
    writeFunction} = require('./code-writer')

function parser(commands, fileName) {
    let output = ''
    while (hasMoreCommands(commands)) {
        // Pop up commands one by one
        let command = commands.shift().trim()
        // If the command is valid
        if (isValidCommand(command)) {
            output += '//' + command + '\r\n';
            output += advance(command, fileName)
        }
    }

    return output
}

// Match the comment in the instruction
const reg1 = /(\/\/).+/

function advance(command, fileName) {
    let output
    command = command.replace(reg1, '').trim()
    let type = commandType(command)

    switch (type) {
        case 'push':
        case 'pop':
            output = writePushPop(command, type, fileName)
            break
        case 'label':
            output = writeLabel(command, type, fileName)
            break
        case 'goto':
            output = writeGoto(command, type, fileName)
            break
        case 'if':
            output = writeIf(command, type, fileName)
            break
        case 'return':
            output = writeReturn(command)
            break
        case 'function':
            output = writeFunction(command, type)
            break
        case 'call':
            output = writeCall(command, type)
            break
        case 'arith':
            output = writeArithmetic(command)
            break
    }

    return output
}

function hasMoreCommands(commands) {
    return commands.length > 0? true : false
}

const rePush = /^(push)/
const rePop = /^(pop)/
const reLabel = /^(label)/
const reGoto = /^(goto)/
const reIfGoto = /^(if-goto)/
const reReturn = /^(return)/
const reFunction = /^(function)/
const reCall = /^(call)/

const types = ['add', 'sub', 'neg', 'eq', 'gt', 'lt', 'and', 'or', 'not']
function commandType(command) {
    if (rePush.test(command)) {
        return 'push'
    } else if (rePop.test(command)) {
        return 'pop'
    } else if (reLabel.test(command)) {
        return 'label'
    } else if (reGoto.test(command)) {
        return 'goto'
    } else if (reIfGoto.test(command)) {
        return 'if'
    } else if (reReturn.test(command)) {
        return 'return'
    } else if (reFunction.test(command)) {
        return 'function'
    } else if (reCall.test(command)) {
        return 'call'
    } else if (types.includes(command)) {
        return 'arith'
    }
}

// Match the sentence with the comment switch
const reg2 = /^(\/\/)/

function isValidCommand(command) {
    if (command === '' || reg2.test(command)) {
        return false
    } 
    return true
}

module.exports = {
    parser
}