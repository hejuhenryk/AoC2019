export const intComuter = program => {
    console.log('inputdata',program)
    const state = {
        index: 0,
        output: undefined,
        finished: false
    }
    const 
    const runProgram = () => {
        program = program.map( el => el.toString())
        if(program[index] === 99)
            state.finished = true
    }
    return {
        getProgram: () => program, 
        getState: () => state, 
        runProgram
    }
}