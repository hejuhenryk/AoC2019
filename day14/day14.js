"use strict";
fetch('day14/day14_input.txt')
    .then(data => data.text())
    .then(text => text.split('\n').map(el => el.split('=>').map(line => line.trim().split(', '))))
    // .then(element => element.split(', '))
    .then(array => {
    const dict = {};
    array.forEach(group => {
        const chem = group[1][0].split(' ')[1];
        dict[chem] = [+group[1][0].split(' ')[0], {}];
        group[0].forEach(chemical => {
            // dictionary of chemicals -> [howmuch chelicals can make, {what needed} ]
            dict[chem][1][chemical.split(' ')[1]] = +chemical.split(' ')[0];
        });
    });
    return dict;
})
    .then(reciepies => {
    console.log(reciepies);
});
// .then( text => {
//     const quantityKey = Symbol();
//     const reactions = text.trim().split('\n').reduce((map, line) => {
//     const [ ingredientList, result ] = line.split(' => ');
//     const [ quantity, chemical ] = result.split(' ');
//     map[chemical] = ingredientList.split(', ').reduce((ingredientMap, combo) => {
//         const [ qty, chem ] = combo.split(' ');
//         ingredientMap[chem] = +qty;
//         return ingredientMap;
//     }, { [quantityKey]: +quantity });
//     console.log(map)
//     return map;
//     }, {});
// })
