import { intComputer } from './../IC/intcodeComputer.js';

fetch('src/day2/day2_input.txt')
    .then( response => response.text() )
    .then( text => text.split(',').map( n=>+n) )
    .then( programArr => {
        console.log('part 1', gravityAssist(12,2,programArr))
        for (let noun = 0 ; noun < 100 ; noun++) {
            for (let verb = 0 ; verb < 100 ; verb++) {
                if ( gravityAssist(noun, verb, programArr) === 19690720) {
                    console.log('part 2', 100 * noun + verb)
                    break
                }
            }
        }
    } )


const gravityAssist = (noun: number, verb: number, program: number[]) => {
    // const pr = [program[0], noun, verb, ...program.slice(3)]
    const newProgram = program.map( (el, i) => {
        if (i === 1) return noun
        if (i === 2) return verb
        return el
    })
    const computer = intComputer(newProgram)
    while(!computer.isFinished()) {
        computer.nextStep()
    }
    return computer.getFirstElement()
}
