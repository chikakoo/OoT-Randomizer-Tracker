/**
 * Used to compute the min/max values of KeyRequirements for locked doors
 * - min: The minimum number of keys that you would be guaranteed to be able to open the door
 *   - Computed based on the number of keys you CURRENTLY HAD
 * - max: The maximum number of keys that you could ever use before opening this door
 *   - Includes actually opening the door
 */
let LockedDoorWalker = {
    /**
     * Gets the key requirement of the given door for the given age
     * - If it doesn't exist for the given age, use the other one
     * - If that doesn't exist, return null
     * @param {object} door - The door to get the key requirement for
     * @param {string} age - The age to get the key requirement for
     * @returns The key requirement { min: #, max: # } - or null if not found
     */
    getKeyRequirement: function(door, age) {
        if (age === Age.CHILD) {
            return door.KeyRequirementChild || door.KeyRequirementAdult || null;
        }

        if (age === Age.ADULT) {
            return door.KeyRequirementAdult || door.KeyRequirementChild || null;
        }

        return null;
    },

    /**
     * Returns whether the key requirement can be ignored
     * - If the door is already opened
     * - If the door has OverrideKeyRequirement set and it returns true
     * @param {object} door - The door object
     * @param {string} age - The age
     * @returns True if it can be ignored; false otherwise
     */
    canIgnoreKeyRequirement: function(door, age) {
        return door.playerHas || (door.OverrideKeyRequirement && door.OverrideKeyRequirement(age));
    },

    /**
     * Compute all locked doors for all dungeons, for both ages
     */
    computeAll: function() {
        let _this = this;
        Object.keys(MapLocations).forEach(dungeon => {
            if (MapLocations[dungeon].MapGroup === MapGroups.DUNGEONS) {
                _this.compute(dungeon);
            }
        });
    },

    /**
     * Computes the KeyRequirement for the given dungeon, for both ages
     * - Called by computeAll, and when a dungeon is changed from MQ to Standard
     * @param {string} dungeon - The dungeon to compute locked doors for
     */
    compute: function(dungeon) {
        let _this = this;
        [Age.CHILD, Age.ADULT].forEach(age => {
            _this._computeMins(dungeon, age);

            _this._getAllLockedDoorNames(dungeon).forEach(doorName => {
                _this._computeMaxes(dungeon, age, doorName, []);
            });
        })
    },

    /**
     * Computes the min values for the given dungeon
     * @param {string} dungeon - The dungeon
     * @param {string} age - The age to compute mins for
     */
    _computeMins: function(dungeon, age) {
        let startingDoors = this._getAllStartingLockedDoorNames(dungeon, age);
        let startingDoorsToVisit = [];

        let _this = this;
        startingDoors.forEach(doorName => {
            _this._pushNextMinDoorsToVisit(dungeon, age, doorName, [], startingDoorsToVisit, true);
        }); 

        this._computeMinsVisitDoorSet(dungeon, age, startingDoorsToVisit, [], 1);
    },

    /**
     * Performs a breadth-first search to compute mins for the given dungeon
     * @param {string} dungeon - The dungeon
     * @param {string} age - The age
     * @param {Array<string>} doorNamesToVisitNext - An Array of door names, indicating the current set of doors
     * @param {Array<string>} visitedDoors - An Array of door names, indicating doors we've already visited
     * @param {number} doorsOpened - An integer indicating how many doors we've already opened
     */
    _computeMinsVisitDoorSet: function(dungeon, age, doorNamesToVisitNext, visitedDoors, doorsOpened) {
        let _this = this;
        let nextDoorsToVisit = [];

        doorNamesToVisitNext.forEach(doorName => {
            // Don't do anything with already visited doors
            if (visitedDoors.includes(doorName)) {
                return;
            }

            // Push to visited doors and set the min requirement
            let door = this.getLockedDoorObject(dungeon, doorName);
            visitedDoors.push(doorName);
            _this._setMinKeyRequirement(door, age, doorsOpened);

            // Compute which doors can be visited next from this door
            _this._pushNextMinDoorsToVisit(dungeon, age, doorName, visitedDoors, nextDoorsToVisit);
        });

        if (nextDoorsToVisit.length > 0) {
            this._computeMinsVisitDoorSet(dungeon, age, nextDoorsToVisit, visitedDoors, doorsOpened + 1);
        }
    },

    _pushNextMinDoorsToVisit: function(dungeon, age, nextDoorName, visitedDoors, nextDoorsToVisit, isStartingDoor) {
        let door = this.getLockedDoorObject(dungeon, nextDoorName);

        // Starting doors must be included in the list if they can't be ignored
        if (isStartingDoor && !this.canIgnoreKeyRequirement(door)) {
            nextDoorsToVisit.push(nextDoorName);
            return;
        }

        // If there's nowhere to go, we're done here
        if (!door.NextDoors) {
            return;
        }

        let _this = this;
        Object.keys(door.NextDoors).forEach(nextDoorName => {
            let isDoorAlreadyVisited = visitedDoors.includes(nextDoorName) || nextDoorsToVisit.includes(nextDoorName);
            if (!isDoorAlreadyVisited && door.NextDoors[nextDoorName]?.(age)) {
                let nextDoor = _this.getLockedDoorObject(dungeon, nextDoorName);
    
                if (_this.canIgnoreKeyRequirement(nextDoor)) {
                    _this._pushNextMinDoorsToVisit(dungeon, age, nextDoorName, visitedDoors, nextDoorsToVisit)
                } else {
                    // If the door can't be ignored, add it to the list
                    nextDoorsToVisit.push(nextDoorName);
                }
            }
        }) 
    },

    /**
     * Gets all the locked door names for a dungeon
     * - Locked doors are currently always in the main region
     * - TODO: probably revamp this, because it's not very clean
     * @param {string} dungeon - The dungeon to get the starting locked doors for
     * @param {string} age - The age the get the starting locked doors for
     * @returns {Array<string>} - An array of the names of all locked doors
     */
    _getAllLockedDoorNames: function(dungeon) {
        let lockedDoorNames = [];
        let mainItemLocations = MapLocations[dungeon].Regions.main.ItemLocations;
        Object.keys(mainItemLocations).forEach(lockedDoorName => {
            if (mainItemLocations[lockedDoorName].ItemGroup === ItemGroups.LOCKED_DOOR) {
                lockedDoorNames.push(lockedDoorName);
            }
        });
        return lockedDoorNames;
    },

    /**
     * Gets all the locked doors for a dungeon
     * - Locked doors are currently always in the main region
     * @param {string} dungeon - The dungeon to get the starting locked doors for
     * @param {string} age - The age the get the starting locked doors for
     * @returns {Array<string>} - An array of the names of all locked doors
     */
    _getAllLockedDoors: function(dungeon) {
        let lockedDoors = [];
        let mainItemLocations = MapLocations[dungeon].Regions.main.ItemLocations;
        Object.values(mainItemLocations).forEach(lockedDoor => {
            if (lockedDoor.ItemGroup === ItemGroups.LOCKED_DOOR) {
                lockedDoors.push(lockedDoor);
            }
        });
        return lockedDoors;
    },

    /**
     * Computes the maximum number of doors you can open before opening the given door
     * @param {string} dungeon - The dungeon
     * @param {string} age - The age
     * @param {string} doorName - The door to compute maxes for
     */
    _computeMaxes: function(dungeon, age, doorName) {
        let _this = this;
        let visitedDoors = [];
        this._getAllStartingLockedDoorNames(dungeon, age).forEach(startingDoor => {
            _this._computeMaxesFromDoor(dungeon, age, doorName, startingDoor, visitedDoors);
        });

        let door = _this.getLockedDoorObject(dungeon, doorName);
        _this._setMaxKeyRequirement(door, age, visitedDoors.length + 1); // The +1 covers the door itself
    },

    /**
     * Computes the maximum number of doors you can open using a depth-first search
     * - Goes to every door, excluding the target door
     * @param {string} dungeon - The dungeon
     * @param {string} age - The age
     * @param {string} targetDoorName - THe door we're computing the max for
     * @param {string} currentDoorName - The current door we're visiting
     * @param {Array<string>} visitedDoors - An array of door names we've already visited
     * @returns Void, but modifies visited doors - the length of this + 1 is the max value
     */
    _computeMaxesFromDoor: function(dungeon, age, targetDoorName, currentDoorName, visitedDoors) {
        // Don't continue through the target door or a door we've seen already
        if (currentDoorName === targetDoorName || visitedDoors.includes(currentDoorName)) {
            return;
        }

        let door = this.getLockedDoorObject(dungeon, currentDoorName);

        // Only count the door if we actually need to use a key to open it
        if (!door.OverrideKeyRequirement || !door.OverrideKeyRequirement()) {
            visitedDoors.push(currentDoorName);
        }
        
        if (!door.NextDoors) {
            return;
        }

        let _this = this;
        Object.keys(door.NextDoors).forEach(nextDoorName => {
            if (door.NextDoors[nextDoorName]?.(age)) {
                _this._computeMaxesFromDoor(dungeon, age, targetDoorName, nextDoorName, visitedDoors);
            }
        });
    },

    /**
     * Gets all the locked door names that the player can open without opening others
     * @param {string} dungeon - The dungeon to get the starting locked doors for
     * @param {string} age - The age the get the starting locked doors for
     * @returns {Array<string>} - An array of the names of all locked doors
     */
    _getAllStartingLockedDoorNames: function(dungeon, age) {
        let _this = this;
        let lockedDoorNames = [];
        this._getAllLockedDoorNames(dungeon).forEach(lockedDoorName => {
            let lockedDoor = _this.getLockedDoorObject(dungeon, lockedDoorName);
            if (lockedDoor.StartingDoorRequirement && lockedDoor.StartingDoorRequirement(age)) {
                lockedDoorNames.push(lockedDoorName);
            }
        });
        return lockedDoorNames;
    },

    /**
     * Gets the locked door object
     * @param {string} dungeon - The dungeon to get the locked door for
     * @param {string} lockedDoorName - The name of the locked door
     * @return {object} - The item location of the locked door
     */
    getLockedDoorObject: function(dungeon, lockedDoorName) {
        return MapLocations[dungeon]?.Regions?.main?.ItemLocations?.[lockedDoorName];
    },

    /**
     * Set the min KeyRequirement for the given door
     * @param {object} door - The door to set the requirement on
     * @param {string} age - The age to set the requirement for
     * @param {number} minValue - The value to set
     */
    _setMinKeyRequirement: function(door, age, minValue) {
        if (door.OverrideKeyRequirement && door.OverrideKeyRequirement()) {
            door.KeyRequirementChild = { min: -1, max: -1 };
            door.KeyRequirementAdult = { min: -1, max: -1 };
        } else if (age === Age.CHILD) {
            door.KeyRequirementChild = door.KeyRequirementChild || { min: 0, max: 0 }
            door.KeyRequirementChild.min = minValue;
        } else if (age === Age.ADULT) {
            door.KeyRequirementAdult = door.KeyRequirementAdult || { min: 0, max: 0 }
            door.KeyRequirementAdult.min = minValue;
        }
    },

    /**
     * Set the max KeyRequirement for the given door
     * @param {object} door - The door to set the requirement on
     * @param {string} age - The age to set the requirement for
     * @param {number} maxValue - The value to set
     */
    _setMaxKeyRequirement: function(door, age, maxValue) {
        if (door.OverrideKeyRequirement && door.OverrideKeyRequirement()) {
            door.KeyRequirementChild = { min: -1, max: -1 };
            door.KeyRequirementAdult = { min: -1, max: -1 };
        } else if (age === Age.CHILD) {
            door.KeyRequirementChild = door.KeyRequirementChild || { min: 0, max: 0 }
            door.KeyRequirementChild.max = maxValue;
        } else if (age === Age.ADULT) {
            door.KeyRequirementAdult = door.KeyRequirementAdult || { min: 0, max: 0 }
            door.KeyRequirementAdult.max = maxValue;
        }
    }
}