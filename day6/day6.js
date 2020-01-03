fetch('day6/day6_input.txt')
  .then(response => response.text())
  .then(text => {
    orbitCountChecksums3(text.split('\n').map(orbit => orbit.split(')').map( planet => planet.trim())))
    howFarToSanta(text.split('\n').map(orbit => orbit.split(')').map( planet => planet.trim())))

  } )


const orbitCountChecksums3 = (starsMap) => {
  const starsDictionary = {}
  let totalOrbit = 0
  starsMap.forEach(element => {
    const [orbit, planet] = element
    starsDictionary[planet] = [orbit]
  });
  for (const planet in starsDictionary) {
    let directOrbit = starsDictionary[planet]
    totalOrbit++
    let foundCOM = false
    while( !foundCOM ) {
      if (starsDictionary[directOrbit]) {
        directOrbit = starsDictionary[directOrbit] 
        totalOrbit++
      } else {
        foundCOM = true
      }
    }
  }
  console.log('total number of direct and indirect orbits', totalOrbit)
  return totalOrbit
}

const howFarToSanta = starsMap => {
// make dictionary of orbits
  const starsDictionary = {}
  let totalOrbit = 0
  starsMap.forEach(element => {
    const [orbit, planet] = element
    starsDictionary[planet] = [orbit][0]
  });
//find YOU and SAN then and store way from YOU to COM
  let myPlanetOrbit = starsDictionary['YOU']
  let santasPlanetOrbit = starsDictionary['SAN']
  const myWayToCOM = []
  while( starsDictionary[myPlanetOrbit] ) {
    myWayToCOM.push(myPlanetOrbit)
    myPlanetOrbit = starsDictionary[myPlanetOrbit]
  }
// way from Santa to COM
  const santasWayToCOM = []
  while( starsDictionary[santasPlanetOrbit] ) {
    santasWayToCOM.push(santasPlanetOrbit)
    santasPlanetOrbit = starsDictionary[santasPlanetOrbit]
  }
// remove comon orbits
  while ( myWayToCOM[myWayToCOM.length-1] === santasWayToCOM[santasWayToCOM.length-1]) {
    myWayToCOM.pop()
    santasWayToCOM.pop()
  }
// calulate distance to Santa
  console.log('I need', myWayToCOM.length + santasWayToCOM.length, 'orbital transfers to get to Santa')
}