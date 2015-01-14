The Garden Project

I want to create an abstracted model plants growing within a garden. Each plant needs a certain amount of nutrients from the soil, sunlight, and water to grow. Each plant has it's own growth life (how long it takes to grow), size (per sqft), and particular nutrient/sunlight/water daily needs. How long a plant will take to grow (or whether it will die) depends whether it can receive enough sunlight, water, and nutrients on a daily basis, which is also determined by how closely the plants are spaced in the garden and the plants size (all measured in SQFT).

![Photo of Garden UML](GardenUML.JPG)
- X days
- if doesn't satisfy conditions for 3 days in a row

- create plants

- every day:
  - choose a value (random?) for soil, sunlight, water
  for each plant
    - checks instance's properties (sunlight needed, nutrients needed, water needed) and compares to day's values
    - if for a given plant, the values are satisfied, grows 1
    - if not, grows 0
      - look at previous day for 1 or 0
        - if 0, look for next previous day (else, continue)
          -if true, changes from alive to dead
          -exit loop
    - store each daily value (0 or 1) into array for each plant

- at end of X days, check for each plant:
    - for all plants that are alive
      - check total sum value of array to see how grown