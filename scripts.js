var dailyNutrients, dailySunlight, dailyWater;

var buttonClick     = document.getElementById("submit"),
    dropdownRegions = document.getElementById("regions"),
    plantChoices    = document.getElementById("plants"),
    simulationDays  = document.getElementById("simulationdays"),
    plantsWarning   = document.getElementById("noplants"),
    daysWarning     = document.getElementById("nodays"),
    plantTypes      = plantChoices.elements;

var seattle   = new Region("seattle", 3,9,  2,6,  6,10),
    sanfran   = new Region("sanfran", 2,7,  3,10, 2,7),
    dallas    = new Region("dallas",  1,5,  8,10, 2,6),
    chicago   = new Region("chicago", 2,6,  5,9,  3,8),
    atlanta   = new Region("atlanta", 5,8,  7,10, 4,7),
    boston    = new Region("boston",  4,10, 5,8,  5,9);

var plants = new Garden();

function displayContent() {
  simulationDays.value;
  dropdownRegions.value;  
  getPlants();
  switch(dropdownRegions.value){
    case "seattle":
      plants.growPlants(seattle);
      break;
    case "sanfran":
      plants.growPlants(sanfran);
      break;
    case "dallas":
      plants.growPlants(dallas);
      break;
    case "chicago":
      plants.growPlants(chicago);
      break;
    case "atlanta":
      plants.growPlants(atlanta);
      break;
    case "boston":
      plants.growPlants(boston);
  }
}

function getPlants() {
  for (var i = 0; i < plantTypes.length; i++) {
    if (plantTypes[i].checked == true) {
      if (plantTypes[i].value == "zucchini") {
        plants.addPlant("zucchini", 3, 2, 8, 50);
      }
      else if (plantTypes[i].value == "carrots") {
        plants.addPlant("carrots", 4, 3, 7, 30);
      }
      else if (plantTypes[i].value == "beets") {
        plants.addPlant("beets", 7, 1, 5, 40);
      }
      else if (plantTypes[i].value == "strawberries") {
        plants.addPlant("strawberries", 5, 7, 7, 40);
      }
      else if (plantTypes[i].value == "corn") {
        plants.addPlant("corn", 3, 8, 2, 40);
      }
      else if (plantTypes[i].value == "daisy") {
        plants.addPlant("daisy", 6, 5, 3, 40);
      }
      else if (plantTypes[i].value == "iris") {
        plants.addPlant("iris", 5, 7, 4, 40);
      }
      else if (plantTypes[i].value == "peony") {
        plants.addPlant("peony", 3, 7, 4, 40);
      }
      else if (plantTypes[i].value == "sunflower") {
        plants.addPlant("sunflower", 3, 8, 6, 40);
      }
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

Garden.prototype.addPlant = function(name, nutrients, sunlight, water, ripeTime) {
  this.plants.push(new Plant(name, nutrients, sunlight, water, ripeTime));    
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
}

function printResult(plantResults) {
  var dead = [];
  var alive = [];
  for (var j = 0; j < plantResults.length; j++) {
    if (plantResults[j].dead == true) {
      dead.push(plantResults[j].name);
    }
    else {
      alive.push(plantResults[j].name);
    }
  }
  document.getElementById("result").innerHTML = "Thanks for simulating your garden! Over a period of " + simulationDays.value + " days, this how your garden has grown.<br>"
  document.getElementById("alive").innerHTML = alive;
  document.getElementById("dead").innerHTML = dead;
}

function checkPlants(event) {
  console.log(plantTypes[0]);
  if (simulationdays.value == 0) {
    daysWarning.innerHTML = "Please enter a number of days."
    event.preventDefault();
  }
  else {
    for (var i = 0; i < plantTypes.length; i++) {
      if (plantTypes[i].checked == true) {
        displayContent;
        break;
      }
    }
  plantsWarning.innerHTML = "Please select at least one plant.";
  event.preventDefault(); 
  }
}

buttonClick.addEventListener('click', checkPlants, false);
refresh.addEventListener('click', function() {
 history.go();
}, false);
