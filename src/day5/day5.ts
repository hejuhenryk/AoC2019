import { intComputer } from './../IC/intcodeComputer.js';

fetch('src/day5/day5_input.txt')
    .then( response => response.text() )
    .then( text => text.split(',').map( n=>+n) )
    .then( programArr => {
        console.log(programArr)
        const TEST = intComputer(programArr, 1)
        while(!TEST.isFinished()) {
            TEST.nextStep()
        }
        console.log(TEST.getOutputs())
    } )


//     const input = [1,9,10,3,2,3,11,0,99,30,40,50]
// console.log('test')
// const test = intComputer(input, 1)
// test.nextStep()
// console.log(test.isFinished())


// const decoder = (inputCode: number) => {
//     const sign = inputCode >= 0 ? 1 : -1
//     inputCode = Math.abs(inputCode)
//     let code: number[] = inputCode.toString().split('').map(n=>+n)
//     console.log(code)
//     const third = code.length == 5 ? code[0] : 0
//     const second = code.length >= 4 ? code[code.length - 4] : 0
//     const first = code.length >= 3 ? code[code.length - 3] : 0
//     let opcode = +((code.length >= 2 ? code[code.length - 2] : 0) + code[code.length-1].toString())*sign

//     return { first, second, third, opcode }
// }

// console.log(decoder(99))