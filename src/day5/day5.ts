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
        console.log('part 1',TEST.getOutputs())
        const TEST2 = intComputer(programArr, 5)
        while(!TEST2.isFinished()) {
            TEST2.nextStep()
        }
        console.log('part 2',TEST2.getOutputs())
    } )


