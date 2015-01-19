var dailyNutrients, dailySunlight, dailyWater;

var buttonClick     = document.getElementById("submit"),
    dropdownRegions = document.getElementById("regions"),
    simulationDays  = document.getElementById("simulationdays"),
    plantsWarning   = document.getElementById("noplants"),
    daysWarning     = document.getElementById("nodays"),
    plantChoices    = document.getElementById("plants"),
    plantTypes      = plantChoices.elements;

var regions = {
  "seattle" : new Region("seattle", 3,9,  2,6,  6,10),
  "sanfran" : new Region("sanfran", 2,7,  3,10, 2,7),
  "dallas" :  new Region("dallas",  1,5,  8,10, 2,6),
  "chicago" : new Region("chicago", 2,6,  5,9,  3,8),
  "atlanta" : new Region("atlanta", 5,8,  7,10, 4,7),
  "boston" :  new Region("boston",  4,10, 5,8,  5,9),
};

var plantList = {
  "zucchini"     : new Plant("zucchini",     2, 1, 5, 50),
  "carrots"      : new Plant("carrots",      3, 2, 5, 30),
  "beets"        : new Plant("beets",        7, 1, 5, 40),
  "strawberries" : new Plant("strawberries", 5, 7, 7, 40),
  "corn"         : new Plant("corn",         3, 8, 2, 40),
  "daisy"        : new Plant("daisy",        6, 5, 3, 40),
  "iris"         : new Plant("iris",         5, 7, 4, 40),
  "peony"        : new Plant("peony",        3, 7, 4, 40),
  "sunflower"    : new Plant("sunflower",     3, 8, 6, 40),
};

var plants = new Garden();

function displayContent() {
  getPlants();
  plants.growPlants(regions[dropdownRegions.value]);
}

function getPlants() {
  for (var i = 0; i < plantTypes.length; i++) {
    if (plantTypes[i].checked == true) {
      plants.addPlant(plantList[plantTypes[i].value]);
    }
  }
}

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

Garden.prototype.addPlant = function(plant) {
  this.plants.push(plant);    
}

Garden.prototype.growPlants = function(region) {
  this.region = region;
  for(var day = 0; day < simulationDays.value; day++) {
    region.dailyValue();
    for(var i = 0; i < this.plants.length; i++) {
      if ((this.plants[i].nutrients <= dailyNutrients) && (this.plants[i].sunlight <= dailySunlight) && (this.plants[i].water <= dailyWater)) {
        this.plants[i].growingDays.push(1);
      }
      else {
        this.plants[i].growingDays.push(0);
        if ((this.plants[i].growingDays[day-1]) + (this.plants[i].growingDays[day-2]) + (this.plants[i].growingDays[day-3]) + (this.plants[i].growingDays[day-4])== 0) {
          this.plants[i].dead = true;
        }
      };
    };
  };
  printResult(this.plants);
}

function printResult(plantResults) {
  var resultTable = document.getElementById("resulttable")
  resultTable.rows[0].cells[0].innerHTML += "Alive";
  resultTable.rows[0].cells[1].innerHTML += "Dead";
  for (var j = 0; j < plantResults.length; j++) {
    if (plantResults[j].dead == true) {
      resultTable.rows[(j+1)].cells[1].innerHTML += plantResults[j].name;
    }
    else {
      resultTable.rows[(j+1)].cells[0].innerHTML += plantResults[j].name;
    }
  }
  document.getElementById("result").innerHTML += "Thanks for simulating your garden! Over a period of " + simulationDays.value + " days, this how your garden has grown.<br>";
}

// Add valication to Plant object
function validation(event) {
  var checkedPlants = [];
  if (simulationdays.value < 7) {
    daysWarning.innerHTML = "Please enter a number of days between 7 and 90!"
    event.preventDefault();
  }
  else {
    for (var k = 0; k < plantTypes.length; k++) {
      if (plantTypes[k].checked == true) {  
        checkedPlants.push(1)
      }
    }
    if (checkedPlants.length == 0) {
      plantsWarning.innerHTML = "Please select at least one plant.";
      event.preventDefault(); 
    }
    else{
      displayContent();
    }
  }
}

buttonClick.addEventListener('click', validation, false);
refresh.addEventListener('click', function() {
 history.go();
}, false);
