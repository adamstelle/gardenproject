
var dailyNutrients, dailySunlight, dailyWater;

function Plant(name, nutrients, sunlight, water, ripeTime) {
  this.name = name;
  this.nutrients = nutrients;
  this.sunlight = sunlight;
  this.water = water;
  this.ripeTime = ripeTime;
  var growingDays = [];
  this.growingDays = growingDays;
  var dead = false
  this.dead = dead;
}  

// Create environment object to store dailyValues, and call environment
function Region(name, minNutrients, maxNutrients, minSunlight, maxSunlight, minWater, maxWater) {
  this.name = name;
  this.minNutrients = minNutrients;
  this.maxNutrients = maxNutrients;
  this.minSunlight = minSunlight;
  this.maxSunlight = maxSunlight;
  this.minWater = minWater;
  this.maxWater = maxWater;
}

Region.prototype.dailyValue = function() {
  dailyNutrients = Math.floor(Math.random() * (this.maxNutrients - this.minNutrients)) + this.minNutrients;
  dailySunlight = Math.floor(Math.random() * (this.maxSunlight - this.minSunlight)) + this.minSunlight;
  dailyWater = Math.floor(Math.random() * (this.maxWater - this.minWater)) + this.minWater;
}

function Garden() {
  this.plants = [];
}

// function displayContent() {
//   // Use checkboxed
//   // if "fern" checked
//   // plants.push(fern)
// }

Garden.prototype.addPlant = function(name, nutrients, sunlight, water, ripeTime) {
  this.plants.push(new Plant(name, nutrients, sunlight, water, ripeTime));    
}

Garden.prototype.growPlants = function(location) {
  this.location = location;
  for(var day = 0; day < 10; day++) {
    location.dailyValue();
    for(var i = 0; i < this.plants.length; i++) {
      if ((this.plants[i].nutrients >= dailyNutrients) && (this.plants[i].sunlight >= dailySunlight) && (this.plants[i].water >= dailyWater)) {
        this.plants[i].growingDays.push(1);
      }
      else {
        this.plants[i].growingDays.push(0);
        if ((this.plants[i].growingDays[day-1]) + (this.plants[i].growingDays[day-2]) == 0) {
          this.plants[i].dead = true;
        }
      };
    };
  };
  console.log(location);
  console.log(this.plants);
};

var northwest = new Region("northwest", 2,8,  1,6,  8,10);
var west      = new Region("west",      3,8,  5,10, 4,7);
var southwest = new Region("southwest", 2,6,  9,10, 1,5);
var midwest   = new Region("midwest",   3,7,  4,7,  5,8);
var southeast = new Region("southeast", 5,8,  4,7,  7,9);
var northeast = new Region("northeast", 4,7,  1,7,  2,9);

var plants = new Garden();

// var fern = new Plant("Fern",9,6,9,20);
plants.addPlant("Fern", 9, 6, 9, 20);
plants.addPlant("Rose", 8, 7, 5, 30);
plants.addPlant("Cabbage", 7, 6, 8, 40);
plants.growPlants(west);

