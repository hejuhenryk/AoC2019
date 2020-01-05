"use strict";
fetch('day10/day10_input.txt')
    .then(response => response.text())
    .then(text => (text.split('\n').map(xes => xes.trim().split('').map(asteroid => asteroid))))
    .then((asteroidMap) => {
    //   console.log(asteroidMap)
    // asteroids dictionary
    const asteroids = {};
    asteroidMap.forEach((row, y) => row.forEach((col, x) => col === '#' ? asteroids[[x, y].join('-')] = 0 : null));
    console.log(asteroids);
    for (const station in asteroids) {
        if (asteroids.hasOwnProperty(station)) {
            for (const asteroid in asteroids) {
                if (asteroids.hasOwnProperty(asteroid)) {
                    if (station !== asteroid)
                        canStationSee(station, asteroid, asteroids) ? asteroids[station]++ : null;
                }
            }
        }
    }
    let theBest = {
        asteroid: '',
        sees: 0
    };
    for (const asteroid in asteroids) {
        if (asteroids[asteroid] > theBest.sees) {
            theBest.sees = asteroids[asteroid];
            theBest.asteroid = asteroid;
        }
    }
    console.log(theBest);
    delete asteroids[theBest.asteroid];
    const shootingOrder = [];
    for (const asteroid in asteroids) {
        if (theBest.asteroid.includes('-')) {
            asteroids[asteroid] = getAngle(theBest.asteroid.split('-').map(d => +d), asteroid.split('-').map(d => +d));
            shootingOrder.push([asteroids[asteroid], asteroid]);
        }
    }
    shootingOrder.sort((a, b) => {
        if (a[0] - b[0] > 0) {
            return 1;
        }
        else if (a[0] - b[0] < 0) {
            return -1;
        }
        else if (a[0] - b[0] === 0) {
            // dystans od laseru jest mniejszy od dystansu od laser najlepszego zwroc minus jeden 
            const aDistance = getDistance(theBest.asteroid, /* a[1].toString() */ a.join('-'));
            const bDistance = getDistance(theBest.asteroid, /* b[1].toString() */ b.join('-'));
            return aDistance > bDistance ? 1 : -1;
        }
    });
    console.log('shooting order:', shootingOrder[0]);
    startShooting(shootingOrder, 0);
});
const startShooting = (shootingOrder, counter = 0) => {
    let shootingAngle = shootingOrder[0][0];
    for (let i = 0; i < shootingOrder.length; i++) {
        counter++;
        if (counter === 200) {
            console.log(shootingOrder[i][1]);
        }
        // console.log(counter, shootingOrder[i][1])
        shootingOrder.splice(i, 1);
        // let j= i+1
        if (i < shootingOrder.length - 1) {
            while (shootingOrder[i][0] === shootingAngle) {
                i++;
            }
            i = i - 1;
            shootingAngle = shootingOrder[i + 1][0];
        }
    }
    if (shootingOrder.length) {
        startShooting(shootingOrder, counter);
    }
};
const getDistance = (pointOne, pointTwo) => {
    let distance = -1;
    const one = pointOne.split('-').map(d => +d);
    const two = pointTwo.split('-').map(d => +d);
    distance = Math.sqrt(Math.pow(two[0] - one[0], 2) + Math.pow(two[1] - one[1], 2));
    // console.log(one, two, distance)
    return distance;
};
const getAngle = (coordinateOne, coordinateTwo) => {
    let angle = 0;
    if (coordinateOne[0] === coordinateTwo[0]) {
        if (coordinateOne[1] > coordinateTwo[1]) {
            angle = 0;
        }
        else {
            angle = 180;
        }
    }
    else if (coordinateOne[1] === coordinateTwo[1] && coordinateOne[0] < coordinateTwo[0]) {
        if (coordinateOne[0] < coordinateTwo[0]) {
            angle = 90;
        }
        else {
            angle = 270;
        }
    }
    else if (coordinateOne[0] < coordinateTwo[0]) {
        angle = (Math.atan2(coordinateTwo[0] - coordinateOne[0], coordinateOne[1] - coordinateTwo[1]) * 180) / Math.PI;
    }
    else {
        angle = 360 + (Math.atan2(coordinateTwo[0] - coordinateOne[0], coordinateOne[1] - coordinateTwo[1]) * 180) / Math.PI;
    }
    return angle;
};
const canStationSee = (station, asteroid, asteroidsDict) => {
    let canSee = true;
    if (asteroid !== station) {
        let st = station.split('-').map(el => parseInt(el, 10));
        const as = asteroid.split('-').map(el => parseInt(el, 10));
        // let whereToLook = [ as[0] - st[0], as[1] - st[1]]
        let whereToLook = doVectors(as, st, -1);
        // console.log(whereToLook)
        const divisor = Math.abs(gcd(whereToLook[0], whereToLook[1]));
        whereToLook[0] = whereToLook[0] / divisor;
        whereToLook[1] = whereToLook[1] / divisor;
        let onAsteroid = false;
        while (!onAsteroid && canSee) {
            st = doVectors(st, whereToLook, 1);
            onAsteroid = st[0] === as[0] && st[1] === as[1];
            if (!onAsteroid)
                asteroidsDict.hasOwnProperty(st.join('-')) ? canSee = false : null;
        }
    }
    return canSee;
};
// 
const gcd = (a, b) => !b ? a : gcd(b, a % b);
const doVectors = (a, b, sign) => a.map((element, index) => element + sign * b[index]);
// const checkThatSpot = (x, y, theMap) => theMap[y][x] == '#'
// const canYouSeeMe = (me, you, ourMap) => { // me 5,8 you 2,1
//     let whereToLook = [ me[0] - you[0], me[1] - you[1]]
//     // console.log(whereToLook)
//     const divisor = Math.abs(gcd(whereToLook[0], whereToLook[1])) 
//     whereToLook = [whereToLook[0]/divisor, whereToLook[1]/divisor]
//     let isSomethingBetweenUs = false
//     let yourPointOfView = [...you]
//     while ( yourPointOfView[0] != me[0] && yourPointOfView[1] != me[1] && isSomethingBetweenUs) {
//         yourPointOfView = addVector(yourPointOfView, whereToLook)
//         if( yourPointOfView[0] !== me[0] && yourPointOfView[1] !== me[1] )
//             isSomethingBetweenUs = checkThatSpot(yourPointOfView[0], yourPointOfView[1], ourMap) 
//         // console.log(yourPointOfView)
//     }
//     return !isSomethingBetweenUs
// }
// canYouSeeMe( [5,8], [2,1])
// canYouSeeMe( [10,10], [10,0])
// canYouSeeMe( [10,10], [0,10])
// canYouSeeMe( [10,10], [40,40])
// function *genrator(string)  {
//     let i= 0
//     while (i < string.length) {
//         yield console.log(string[i])
//     }
// } 
// stuff did not work 
/*
 const total = getTotalAsteroids(asteroidMap)
    console.log(asteroidMap)
    console.log(checkThatSpot(1,3,asteroidMap))
    const canSeeBest = {
        asteroid: [],
        canSee: 0
    }
    for( let y = 0; y < asteroidMap.length; y++ ) {
        for( let x = 0; x < asteroidMap[y].length; x++ ) {
            if( asteroidMap[y][x] === '#') {
                let canSee = 0
                for( let Y = 0; Y < asteroidMap.length; Y++ ) {
                    for( let X = 0; X < asteroidMap[Y].length; X++ ) {
                        if ( asteroidMap[Y][X] === '#') {

                            if (x === X && y === Y){
                                X++
                            }
                            canYouSeeMe([x,y], [X,Y], asteroidMap) && canSee++
                        } else {
                            null
                        }
                    }
                }
                if (canSee > canSeeBest.canSee) {
                    canSeeBest.asteroid[0] = x
                    canSeeBest.asteroid[1] = y
                    canSeeBest.canSee = canSee
                }
            } else {
                x++
            }
        }
    }
    console.log(canSeeBest)
 */
// let alph = genrator('abcde')
// alph.next()
// alph.next()
// alph.next()
// let shoot = (vPos, sDir, dict) => {
//     let shooted = undefined
//     if (doVectors( vPos, sDir, -1) !== [0,0]) {
//         let laser = [...vPos]
//         let whereToShoot = doVectors(sDir, laser, -1)
//         const divisor = Math.abs(gcd(whereToShoot[0], whereToShoot[1]))   
//         whereToShoot[0] = whereToShoot[0]/divisor
//         whereToShoot[1] = whereToShoot[1]/divisor 
//         while ( doVectors( laser, sDir, -1) !== [0,0] && !shooted || false) {
//             laser = doVectors(laser, whereToShoot, 1)
//             if ( dict.hasOwnProperty(laser.join('-')) ) {
//                 shooted = laser
//             }
//         }     
//     }
//     console.log(shooted)
//     if (shooted)
//         delete dict[shooted.join('-')]
// }
// const vaporizator = (vaporizatorPosition, asteroidMap, asteroidsDict) => {
//     const dictionary = {...asteroidsDict}
//     const mapEdges = []
//     for ( let top = 0 ; top < asteroidMap[0].length ; top++) {
//         mapEdges.push(`${top}-0`)
//     }
//     for ( let right = 1 ; right < asteroidMap.length ; right++) {
//         mapEdges.push(`${asteroidMap[0].length-1}-${right}`)
//     }
//     for ( let bottom = asteroidMap.length-2 ; bottom >= 0  ; bottom--) {
//         mapEdges.push(`${bottom}-${asteroidMap.length -1}`)
//     }
//     for ( let left = asteroidMap[0].length-2 ; left > 0 ; left--) {
//         mapEdges.push(`0-${left}`)
//     }
//     let shootingDirectionIndex = mapEdges.indexOf([vaporizatorPosition[0], 0].join('-'))
//     let getNextIdex = (index, arr) => index < arr.length - 1 ? index + 1 : 0
//     console.log(dictionary)
//     // var size = Object.keys(myObj).length;
//     while( Object.keys(dictionary).length ) {
//         shoot(vaporizatorPosition, mapEdges[shootingDirectionIndex].split('-').map( d => parseInt(d, 10)), dictionary)
//         shootingDirectionIndex = getNextIdex(shootingDirectionIndex, mapEdges)
//     }
//     console.log(dictionary)
// }
