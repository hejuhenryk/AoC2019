import {intComuter} from '../intcodeComputer.js' 

fetch('day5/day5_input.txt')
    .then( response => response.text())
    .then( data => data.split(',').map( el => Number(el)))
    .then( program => intComuter(program))
    .then( re => {
        re.runProgram()
        console.log(re.getProgram() )
    })