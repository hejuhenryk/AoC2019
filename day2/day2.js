fetch('day2/day2_input.txt')
    .then( response => response.text())
    .then( inputData => inputData.split(',').map( num => parseInt(num.trim(), 10)))
    .then( inputArr => {
        console.log( 'Part 1: ' , gravityAssist(inputArr, 12, 2)[0])
        console.log( 'Part 2: ' ,
                'noun:', gravityAssistPairMacher(inputArr, searchOutput).noun,
                'verb:', gravityAssistPairMacher(inputArr, searchOutput).verb )

    })

//     ///////////////////////////////////
//     // Advent of Code **** day 2 ****//
//     ///////////////////////////////////
//     //////////// Part 1 ///////////////
//     ///////////////////////////////////

const gravityAssist = (data, noun, verb) => {
    let dataArr = [...data]
    dataArr[1] = noun
    dataArr[2] = verb
    let index = 0
    while ( dataArr[index] !== 99 && index < dataArr.length) {
        if (dataArr[index] === 1) {
            dataArr[dataArr[index+3]] = dataArr[ dataArr[index+1] ] + dataArr[dataArr[index+2]]
        } else if (dataArr[index] === 2) {
            dataArr[dataArr[index+3]] = dataArr[ dataArr[index+1] ] * dataArr[dataArr[index+2]]
        }
        index += 4
    }
    return dataArr
}


//     ///////////////////////////////////
//     // Advent of Code **** day 2 ****//
//     ///////////////////////////////////
//     //////////// Part 2 ///////////////
//     ///////////////////////////////////

const searchOutput = 19690720

const gravityAssistPairMacher = (data, search) => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            if (gravityAssist(data, noun, verb)[0] === search) {
                return { noun, verb}
            } 
        }
    }
}


