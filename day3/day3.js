fetch('day3/day3_input.txt')
    .then( response => response.text())
    //prepare data to format ['direction', 'distance']
    .then( inputData => inputData.split('\n').map( wire => wire.trim().split(',').map(m => [m[0], m.slice(1)]) ) )
    .then( wires => stepsToIntersection(wires[0], wires[1]) )



const stepsToIntersection = (w, crossW) => {
    const horisontal = []
    const vertical = []
    const crosses = []
    const directions = { 'R': [1,0], 'L': [-1,0], 'D': [0,-1], 'U': [0,1] }
    let wireDir = [[0,0]]
    let stepsW = 0
    let stepsCrossW = 0
    w.forEach( move => {
        let nextStep = [...wireDir[wireDir.length-1]]
        if ( move[0] === 'R' || move[0] === 'L' ) {
            // [ [start, end], Y , steps ]
            horisontal.push([ [nextStep[0],nextStep[0] + directions[move[0]][0]*move[1]],nextStep[1] , stepsW])

        } else if (move[0] === 'D' || move[0] === 'U') {
            // [ X , [start, end] , steps ]
            vertical.push([ nextStep[0] , [ nextStep[1], nextStep[1] + directions[move[0]][1]*move[1]], stepsW])
        }
        nextStep[0] += directions[move[0]][0]*move[1]
        nextStep[1] += directions[move[0]][1]*move[1]
        wireDir.push(nextStep)
        stepsW += parseInt(move[1])

    })
    let crossWStart = [0,0]
    crossW.forEach( move => {
        const vector = []
        if ( move[0] === 'R' || move[0] === 'L' ) {
            vector[0] = [ crossWStart[0], crossWStart[0] + directions[move[0]][0]*move[1] ] 
            vector[1] = crossWStart[1]         
            vertical.forEach( verVector => {
                if( (vector[1] > verVector[1][0] && vector[1] < verVector[1][1]) || (vector[1] < verVector[1][0] && vector[1] > verVector[1][1])) {
                    if( ( verVector[0] > vector[0][0] && verVector[0] < vector[0][1] ) || ( verVector[0] < vector[0][0] && verVector[0] > vector[0][1] ) ) {
                        const x = Math.abs(verVector[0] - crossWStart[0])
                        const y = Math.abs(verVector[1][0] - vector[1])
                        crosses.push([verVector[0], vector[1], verVector[2] + y, stepsCrossW + x])
                    }
                }
            })
        } else if (move[0] === 'D' || move[0] === 'U') {
            vector[0] = crossWStart[0]
            vector[1] = [crossWStart[1], crossWStart[1] + directions[move[0]][1]*move[1] ]  
            horisontal.forEach( horVector => {
                if( (vector[0] > horVector[0][0] && vector[0] < horVector[0][1]) || (vector[0] < horVector[0][0] && vector[0] > horVector[0][1])) {
                    if( ( horVector[1] > vector[1][0] && horVector[1] < vector[1][1] ) || ( horVector[1] < vector[1][0] && horVector[1] > vector[1][1] ) ) {
                        const x = Math.abs(horVector[1]-crossWStart[1])
                        const y = Math.abs(horVector[0][0] - vector[0] )
                        crosses.push([horVector[1], vector[0], horVector[2] + y, stepsCrossW + x])
                    }
                }
            })        
        }  
        stepsCrossW += parseInt(move[1])
        crossWStart[0] += directions[move[0]][0]*move[1]
        crossWStart[1] += directions[move[0]][1]*move[1]
    })
    let closesCross = []
    let fastesCross = []
    crosses.forEach( cross => {
        closesCross.push(Math.abs(cross[0]) + Math.abs(cross[1]))
    })
    crosses.forEach( cross => {
        fastesCross.push(cross[2] + cross[3])
    })
    console.log('Manhattan distance from the central port to the closest intersection: ', closesCross.sort((a,b)=>a-b)[0])
    console.log('fewest combined steps the wires must take to reach an intersection: ', fastesCross.sort((a,b)=>a-b)[0])
    
}