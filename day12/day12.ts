// type Axis = 'x' | 'y' | 'z'
// type Vector = {
//     [axis: Axis]: number
// }
type Axis = string
type Vector = {
    [axis: string]: number
}

const scan: Vector[] = [{x: -10, y: -13, z: 7},{x: 1, y: 2, z: 1},{x: -15, y: -3, z: 13},{x: 3, y: 7, z: -4}] // input

const gcd = (a:number, b:number):number => !b ? a : gcd(b, a%b)
const lcm = (a:number, b:number) => (a * b) / gcd(a,b)

const calcEnergy = (vector: Vector) => {
    let energy = 0
    for (const coordinate in vector) {
       energy += Math.abs(vector[coordinate])
    }
    return energy
}
const updateVelocity =  ( moonOne: Vector, moonTwo: Vector, velocityOne: Vector, velocityTwo: Vector , axis: Axis)  => {
    if ( moonOne[axis] < moonTwo[axis] ) {
        velocityOne[axis]++
        velocityTwo[axis]--
    } else if ( moonOne[axis] > moonTwo[axis] ) {
        velocityOne[axis]--
        velocityTwo[axis]++
    }
}

const updateVelocites = ( moonOne: Vector, moonTwo: Vector, velocityOne: Vector, velocityTwo: Vector ) => {
    for (const direction in moonOne) {
        if(direction === 'x' || direction === 'y' || direction === 'z')
        updateVelocity( moonOne, moonTwo, velocityOne, velocityTwo, direction )
    }
}



const systemEnergy = (moons: Vector[], steps: number) => {
    // initial velocity 
    const velocitys = moons.map( moon => ({x: 0, y: 0, z: 0}))
    // moons.forEach( (moon, index) => console.log('moon:', index, moon))
    // find all pairs 
    const pairs = []
    let indexes = moons.map( (m, index) => index ) 
    while (indexes.length > 1 ) {
            for ( let i = 1 ; i < indexes.length; i++){
                pairs.push( [indexes[0], indexes[i]] )
            }
            indexes.shift()
    } 

    let moves = 0
    while ( moves <= steps ) {
        let totalEnergy = 0
        velocitys.forEach((velocity: {[key: string]: number}, index) => {
            let kineticEnergy = 0
            let potencialEnergy = 0
            for (const coordinate in velocity) {
                kineticEnergy += Math.abs(velocity[coordinate])
            }
            for (const coordinate in moons[index]) {
                potencialEnergy += Math.abs(moons[index][coordinate])
            }
            totalEnergy += potencialEnergy*kineticEnergy
        } )

        pairs.forEach( pair => {
            updateVelocites( moons[pair[0]], moons[pair[1]], velocitys[pair[0]], velocitys[pair[1]])
        })
        moons = moons.map( (moon, index) => {
            return {x: moon.x + velocitys[index].x, y: moon.y + velocitys[index].y, z: moon.z + velocitys[index].z}
        })
        if (moves%(steps) === 0 && moves !== 0) {
            console.log('move', moves, 'totalEnergy', totalEnergy)
        }
        moves++
    }
}
/* satellite motion in a given direction is independent of the other directions,
  look for the four satellites to repeat themselves in just one axis, 
  and they will have a consistent period of oscillation on that single axis. 
  Repeat on the other 2 axes to find 3 time periods and
  then the moment the satellites all find themselves at the starting location is
  the least common multiple of the 3 periods.
*/

const findPeriodOfAxis = (moons: Vector[], axis: Axis) => {
    let step = 0 
    const pairs = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
    const velocitys = moons.map( moon => ({[axis]: 0}))
    let notFound = true
    while (notFound) {
        pairs.forEach( pair => {
            updateVelocity( moons[pair[0]], moons[pair[1]], velocitys[pair[0]], velocitys[pair[1]], axis)
        })
        moons = moons.map( (moon, index) => {
            return {[axis]: moon[axis] + velocitys[index][axis]}
        })
        // console.log(velocitys.reduce( (total, vel) => total + calcEnergy(vel), 0))   
        if (velocitys.reduce( (total, vel) => total + calcEnergy(vel), 0) === 0) {
            let backOnPlace = true
            moons.forEach( (moon, index) => backOnPlace = backOnPlace && (moon[axis] === scan[index][axis] ))
            if ( backOnPlace ) {

                notFound = false
            }
        }
        // console.log(axis, moons, velocitys)
        step++
    }
    // console.log(step, moons, scan, velocitys)
    return step
}

console.time('task1')
systemEnergy(scan, 1000)
console.timeEnd('task1')


console.time('task2')
const x = findPeriodOfAxis(scan, 'x')
const y = findPeriodOfAxis(scan, 'y')
const z = findPeriodOfAxis(scan, 'z')
console.log(lcm(lcm(x,y), z))
console.timeEnd('task2')


