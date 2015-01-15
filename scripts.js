
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
var dailyValue = function() {
  dailyNutrients = Math.floor(Math.random() * (10 - 1)) + 1;
  dailySunlight = Math.floor(Math.random() * (10 - 1)) + 1;
  dailyWater = Math.floor(Math.random() * (10 - 1)) + 1;
}

function Garden() {
  this.plants = [];
}

Garden.prototype.addPlant = function(name, nutrients, sunlight, water, ripeTime) {
  this.plants.push(new Plant(name, nutrients, sunlight, water, ripeTime));    
}

Garden.prototype.growPlants = function() {
  for(var day = 0; day < 10; day++) {
    dailyValue();
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
  console.log(this.plants);
};

var plants = new Garden();
plants.addPlant("Fern", 8, 8, 9, 20);
plants.addPlant("Rose", 8, 7, 5, 30);
plants.addPlant("Cabbage", 7, 6, 8, 40);
plants.growPlants();

