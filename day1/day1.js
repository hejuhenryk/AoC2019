//     ///////////////////////////////////
//     // Advent of Code **** day 1 ****//
//     ///////////////////////////////////
//     //////////// Part 1 ///////////////
//     ///////////////////////////////////
console.log('*AoC2019*day1')
fetch('day1/day1_input.txt')
    .then( response => response.text())
    .then( inputData => inputData.split('\n').map( num => parseInt(num.trim(), 10)))
    .then( inputArr => console.log('Part 1: ',inputArr.reduce( ( totalFuel, module ) => totalFuel += fuelNeeded(module), 0) ))

const fuelNeeded = mass => (Math.floor(mass/3) - 2) > 0 ? Math.floor(mass/3) - 2 : 0

//     ///////////////////////////////////
//     // Advent of Code **** day 1 ****//
//     ///////////////////////////////////
//     //////////// Part 2 ///////////////
//     ///////////////////////////////////

fetch('day1/day1_input.txt')
    .then( response => response.text())
    .then( inputData => inputData.split('\n').map( num => parseInt(num.trim(), 10)))
    .then( inputArr => {
        totalFuel = 0
        inputArr.forEach( module => fuelPerModule(module) )
        console.log( 'Part 2: ', totalFuel)
    })


const fuelPerModule = (mass) => {
    if (mass >= 9) {
        const extraFuel = fuelNeeded(mass)
        totalFuel += extraFuel
        fuelPerModule(extraFuel)
    }
}
