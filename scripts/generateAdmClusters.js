//node script that reads in adm polys and creates a 

var fs = require('fs');
var deepcopy = require('deepcopy');

var adm1 = JSON.parse(fs.readFileSync('../data/adm1Points.json'));
var adm2 = JSON.parse(fs.readFileSync('../data/adm2Points.json'));


//generate between 10 and 99 points for each adm1
var points = {};
var newAdm1Features = [];
var newAdm2Features = [];

//create new adm1 features and track
for (var a in adm1.features) {
	var id1= adm1.features[a].properties.ID_1;
	points[id1] = Math.floor((Math.random()*89)+15);
	for (var i = 0; i <= points[id1]; i++) {
		newAdm1Features.push(deepcopy(adm1.features[a]));
	}
}

//create new adm2 features and track
for (var a in adm2.features) {
	var parentId = adm2.features[a].properties.ID_1;
	//create a random number between 2 and the total for the relevant adm1 - 5 (buffer to simplify not running out of space)
	var ceiling = points[parentId] - 10;
	var actual = Math.floor((Math.random()*(ceiling))+1)+2;
	if (actual < 2) actual = 2;
	console.log(actual);
	//decrement points by actual
	points[parentId] -= actual;
	for (var i = 0; i <= actual; i++) {
		newAdm2Features.push(deepcopy(adm2.features[a]));
	}
	
}

adm1.features = newAdm1Features;
adm2.features = newAdm2Features;

fs.writeFileSync('../data/adm1PointsRandom.json',JSON.stringify(adm1));
fs.writeFileSync('../data/adm2PointsRandom.json', JSON.stringify(adm2));
