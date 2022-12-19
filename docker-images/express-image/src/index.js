var Chance = require('chance');
var chance = new Chance();

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send( generateAnimals() );
});

app.listen(3000, function () {
    console.log('Accept HTTP resquests on port 3000.');
});

function generateAnimals() {
    var numberOfAnimals = chance.integer({
        min: 1,
        max: 10
    });

    console.log(numberOfAnimals);

    var animals = [];

    var types = ["ocean", "desert", "grassland", "forest", "farm", "pet", "zoo"];

    for (var i = 0; i < numberOfAnimals; i++) {

        var randomType = types[Math.floor(Math.random()*types.length)];
        
        var age = chance.age({
            min: 0,
            max: 100
        });

        var age = chance.age({
            min: 0,
            max: 100
        });

        animals.push({
            type: randomType,
            animal: chance.animal({type: randomType}),
            age: age,
        });

    }
    console.log(animals);
    return animals;
}
