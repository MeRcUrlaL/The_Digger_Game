#The digger game v. 0.2.6B

You can try the game at the link: [Digger](http://q90175e4.beget.tech) v.0.2.6B

Controls:
    
    W-A-S-D: movement
    E: Interact with buildings and objects

ID list:

    0: air
    1: background stone
    2: grass
    3: stone
    4: coal
    5: copper
    6: tin
    7: iron
    8: silver
    9: gold
    10: coming soon...

To do list:

    ✓ The generated playing field is a two-dimensional array with the block id.
    ✓ Control the drilling machine using the WASD buttons
    ✓ The camera moves behind the drilling machine, while pressing against 
       the edges and does not go beyond the boundaries of the map.
    ✓ Darkening around the drilling machine at a depth of 3 blocks
    ✘ Condition of the drilling machine body in the form of a scale.
    ✓ Cargo hold - internal storage of the drilling machine
    ✓ A store where you can sell resources from the hold.
    ✓ A gas station with an interface (1st button "Fill up 1 unit of fuel" 2nd button "fill up the tank")
       in the middle of the window is a hint with the cost of refueling.
    ✓ drill machine upgrading station
    ✘ ?All configuration variables are placed in the config.json
    ✓ Divide the code into modules
    ✓ Ores are generated at the specified rate
    ✓ Some ores are generated starting from a certain height
    ✓ The mechanics of speed
    ✘ Mechanics of ore hardness
    ✓ Preload and game menu
    ✓ If you run out of fuel, a pop-up window with the ability to instantly 
       rise to the surface 3$/block on the Y axis or refuel oneFuel * 2$/unit.fuels
    ✓ Saving and loading the game
