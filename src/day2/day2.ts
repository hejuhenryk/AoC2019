import { intComputer } from './../IC/intcodeComputer.js';

fetch('src/day2/day2_input.txt')
    .then( response => response.text() )
    .then( text => {
        const program = text.split(',').map( n=>+n)
        program[1] = 12
        program[2] = 2
        return program
    })
    .then( program1202 => intComputer(program1202) )
    .then( gravityAssist => {
        while(!gravityAssist.isFinished()) {
            gravityAssist.nextStep()
        }
        gravityAssist.printFirstElement()
    })

// const test = [1,0,0,0,99]

// const i = intComputer(test)

// while(!i.isFinished()) {
//     i.nextStep()
// }
// i.printFirstElement()
