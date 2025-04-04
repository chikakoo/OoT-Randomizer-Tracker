/**
 * Used to compute the min/max values of KeyRequirements for locked doors
 */
let LockedDoorWalker = {
    /**
     * Gets the key requirement of the given door for the given age
     * - If it doesn't exist for the given age, use the other one
     * - If that doesn't exist, return null
     * @param {object} door - The door to get the key requirement for
     * @param {string} age - The age to get the key requirement for
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
        this._computeMinsVisitDoorSet(dungeon, age, startingDoors, [], 1);
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
            if (!door.NextDoors) {
                return;
            }

            Object.keys(door.NextDoors).forEach(nextDoorName => {
                if (!visitedDoors.includes(nextDoorName) &&
                    door.NextDoors[nextDoorName]?.(age)) {
                    nextDoorsToVisit.push(nextDoorName);
                }
            });
        });

        if (nextDoorsToVisit.length > 0) {
            this._computeMinsVisitDoorSet(dungeon, age, nextDoorsToVisit, visitedDoors, doorsOpened + 1);
        }
    },

    /**
     * Gets all the locked door names that the player can open without opening others
     * - Locked doors are currently always in the main region
     * - TODO: probably revamp this, because it's not very clean
     * @param {string} dungeon - The dungeon to get the starting locked doors for
     * @param {string} age - The age the get the starting locked doors for
     * @returns {Array<string>} - An array of the names of all locked doors
     */
    _getAllLockedDoorNames: function(dungeon) {
        let lockedDoorNames = [];
        Object.keys(MapLocations[dungeon].Regions.main.ItemLocations).forEach(lockedDoorName => {
            lockedDoorNames.push(lockedDoorName);
        });
        return lockedDoorNames;
    },

    _computeMaxes: function(dungeon, age, doorName) {
        let _this = this;
        let visitedDoors = [];
        this._getAllStartingLockedDoorNames(dungeon, age).forEach(startingDoor => {
            _this._computeMaxesFromStartingSet(dungeon, age, doorName, startingDoor, visitedDoors);
        });

        let door = _this.getLockedDoorObject(dungeon, doorName);
        _this._setMaxKeyRequirement(door, age, visitedDoors.length + 1); // The +1 covers the door itself
    },

    _computeMaxesFromStartingSet: function(dungeon, age, targetDoorName, currentDoorName, visitedDoors) {
        // Don't continue through the target door or a door we've seen already
        if (currentDoorName === targetDoorName || visitedDoors.includes(currentDoorName)) {
            return;
        }

        visitedDoors.push(currentDoorName);

        let door = this.getLockedDoorObject(dungeon, currentDoorName);
        if (!door.NextDoors) {
            return;
        }

        let _this = this;
        Object.keys(door.NextDoors).forEach(nextDoorName => {
            if (door.NextDoors[nextDoorName]?.(age)) {
                _this._computeMaxesFromStartingSet(dungeon, age, targetDoorName, nextDoorName, visitedDoors);
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
        if (age === Age.CHILD) {
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
        if (age === Age.CHILD) {
            door.KeyRequirementChild = door.KeyRequirementChild || { min: 0, max: 0 }
            door.KeyRequirementChild.max = maxValue;
        } else if (age === Age.ADULT) {
            door.KeyRequirementAdult = door.KeyRequirementAdult || { min: 0, max: 0 }
            door.KeyRequirementAdult.max = maxValue;
        }
    }
}