var dailyNutrients, dailySunlight, dailyWater, plants, $simulationDays, $plantTypes;

var regions = {
  "seattle" : new Region("seattle", 3,9,  2,6,  6,10),
  "sanfran" : new Region("sanfran", 2,7,  3,10, 2,7),
  "dallas" :  new Region("dallas",  1,5,  8,10, 2,6),
  "chicago" : new Region("chicago", 2,6,  5,9,  3,8),
  "atlanta" : new Region("atlanta", 5,8,  7,10, 4,7),
  "boston" :  new Region("boston",  4,10, 5,8,  5,9),
};

var plantList = {
  "Zucchini"     : new Plant("Zucchini",     2, 1, 5, 50),
  "Carrots"      : new Plant("Carrots",      3, 2, 5, 30),
  "Beets"        : new Plant("Beets",        7, 1, 5, 40),
  "Strawberries" : new Plant("Strawberries", 5, 7, 7, 40),
  "Corn"         : new Plant("Corn",         3, 8, 2, 40),
  "Daisy"        : new Plant("Daisy",        6, 5, 3, 40),
  "Iris"         : new Plant("Iris",         5, 7, 4, 40),
  "Peony"        : new Plant("Peony",        3, 7, 4, 40),
  "Sunflower"    : new Plant("Sunflower",     3, 8, 6, 40),
};

function displayContent() {
  var $dropdownRegions = $("#regions");
  getPlants();
  plants.growPlants(regions[$dropdownRegions[0].value]);
}

function getPlants() {
  $plantTypes = $("input.checkbox");
  for (var i = 0; i < ($plantTypes).length; i++) {
    if ($plantTypes[i].checked == true) {
      plants.addPlant(plantList[$plantTypes[i].value]);
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

function Garden(simDays) {
  this.plants = [];
  this.simDays = simDays; 
}

Garden.prototype.addPlant = function(plant) {
  this.plants.push(plant);    
}

Garden.prototype.growPlants = function(region) {
  this.region = region;
  for(var day = 0; day < this.simDays; day++) {
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
  console.log(this.plants);
}

function printResult(plantResults) {
  var resultTable = document.getElementById("resulttable")
  resultTable.rows[0].cells[0].innerHTML += "<h2>Alive</h2>";
  resultTable.rows[0].cells[1].innerHTML += "<h2>Dead</h2>";
  for (var j = 0; j < plantResults.length; j++) {
    if (plantResults[j].dead == true) {
      resultTable.rows[(j+1)].cells[1].innerHTML += plantResults[j].name;
    }
    else {
      resultTable.rows[(j+1)].cells[0].innerHTML += plantResults[j].name;
    }
  }
  $("#result").append("<h2>Thanks for simulating your garden!</h2> Over a period of " + plants.simDays + " days, this how your garden has grown:<br><br>");
}

// Add validation to Plant object
function validation(event) {
  var $simulationDays = $("#simulationdays");
  $plantTypes = $("input.checkbox");
  var checkedPlants = [];
  if ($simulationDays[0].value < 7) {
    $("#nodays").append("<h2>Please enter a number of days between 7 and 90!</h2>");
    event.preventDefault();
  }
  else {
    for (var k = 0; k < $plantTypes.length; k++) {
      if ($plantTypes[k].checked == true) {  
        checkedPlants.push(1)
      }
    }
    if (checkedPlants.length == 0) {
      $("#noplants").append("<h2>Please select at least one plant.</h2>");
      event.preventDefault(); 
    }
    else{
      plants = new Garden($simulationDays[0].value);
      displayContent();
    }
  }
}

$(document).ready(function() {
  $("#submit").click(function() {
    validation('click');
  });
  $("#refresh").click(function() {
    location.reload();
  });
});

