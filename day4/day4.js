fetch('day4/day4_input.txt')
    .then( response => response.text())
    .then( data => data.split('-').map( el => Number(el)))
    .then( input => {
        let min = input[0]
        let max = input[1]
        console.log('input min: ', min, 'input max: ', max )
        console.time('part1')
        let counter = 0
        for (let index = (min); index <= (max); index++) {
            isPosible(index) ? counter++ : null
        }
        console.log(`there is ${counter} different passwords that meets part 1 creteria`)
        console.timeEnd('part1')
        console.time('part2')
        counter = 0
        for (let index = (min); index <= (max); index++) {
            isPosible(index, true) ? counter++ : null
        }
        console.log(`there is ${counter} different passwords that meets part 2 creteria`)
        console.timeEnd('part2')

    })


const isPosible = (n, isPartTwo = false) => {
    let num =  n.toString().split('')
    let growsToRight = true
    let haveToDigAlike = false
    let dig = {}
    num.forEach( (n, i) => {
        if ( num[i+1] ) {
            if ( num[i+1] < n)
                growsToRight = false
        }
        dig[n] = dig[n] ? dig[n] + 1 : 1
    })
    for (const key in dig) {
        if (isPartTwo) {
            if (dig[key] === 2 ) {
                haveToDigAlike = true
            }
        } else {
            if (dig[key] >= 2 ) {
                haveToDigAlike = true
            }
        }
    }
    return ( growsToRight && haveToDigAlike && (num.length === 6))
}

