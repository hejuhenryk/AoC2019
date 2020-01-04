"use strict";
const pictureSize = {
    wide: 25,
    tall: 6
};
const devTolayers = (data, pictureSize) => {
    const layers = [];
    const layerSize = (pictureSize.wide * pictureSize.tall);
    for (let index = 0; index < data.length / layerSize; index++) {
        layers.push(data.slice(index * layerSize, (index + 1) * layerSize));
    }
    return layers;
};
const howManyNdigits = (str, N) => {
    let Ndigits = 0;
    for (const i of str) {
        if (+i === N)
            Ndigits++;
    }
    return Ndigits;
};
fetch('day8/day8_input.txt')
    .then(response => response.text())
    .then(data => devTolayers(data.trim(), pictureSize))
    .then(layers => {
    let layerFewestZeros = undefined;
    let zeros = pictureSize.wide * pictureSize.tall;
    layers.forEach((layer, index) => {
        const soManyZeros = howManyNdigits(layer, 0);
        if (soManyZeros < zeros) {
            layerFewestZeros = index;
            zeros = soManyZeros;
        }
        // console.log(soManyZeros, layer)
    });
    if (layerFewestZeros) {
        const theLayer = layers[layerFewestZeros];
        console.log(howManyNdigits(theLayer, 1), howManyNdigits(theLayer, 2), howManyNdigits(theLayer, 1) * howManyNdigits(theLayer, 2));
    }
    const length = pictureSize.wide * pictureSize.tall;
    let output = '2'.repeat(length);
    for (let i = 0; i < length; i++) {
        let l = 0;
        while (layers[l][i] === '2' && l < layers.length) {
            l++;
        }
        if (l < layers.length) {
            output = output.substr(0, i) + layers[l][i] + output.substr(i + 1);
        }
    }
    // console.log(output)
    return output;
})
    .then(massage => {
    let massageArray = [];
    for (let i = 0; i < pictureSize.tall; i++) {
        massageArray.push(massage.substr(i * pictureSize.wide, pictureSize.wide));
    }
    massageArray.forEach(line => {
        console.log(line.split('').map((h) => +h === 0 ? ' ' : +h === 1 ? '|' : '*').join(''));
    });
});
