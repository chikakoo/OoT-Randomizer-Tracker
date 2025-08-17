RpgPage = {
    currentLocation: "",

    display: function() {
        LocationSidebar.updateSidebarLocation();
        LocationSidebar.displayContainer("rpgContainer");
        ItemLocationDisplay.currentLocationName = "RPG";
        this._updateHeader();
    },

    updateLocation: function(locationName) {
        this.currentLocation = locationName;
        this._updateHeader();
    },

    _updateHeader: function() {
        let header = document.getElementById("rpgHeader");
        header.innerText = this.currentLocation
            ? `RPG: ${this.currentLocation}`
            : "RPG: No Location Selected";
    },

    /**
     * Generates a list of 20 tasks and selects one at random
     * @param {RpgTaskDifficulty} difficulty 
     */
    generateTasks: function(difficulty) {
        
    },

    /**
     * Gets the list of events based on the given level
     * @param level - the level to give it
     */
    getEventsByLevel: function(difficulty) {
        let punishmentsOnly = document.getElementById("rpgPunishmentsOnlyCheckbox").checked;
        return this._getCurrentEvents().filter(x => {
            return x.difficulty === difficulty && (!punishmentsOnly || x.isPunishment);
        });
    },

    /**
     * Gets the current list of events based on the state of the game
     * @returns A list of current event with a single difficulty each
     */
    _getCurrentEvents: function() {
        let _this = this;
        return RpgTasks.map(x => {
            x.difficulty = _this._getLevelForEvent(x.difficulties);
            return x;
        }).filter(x => {
            return x.difficulty;
        });
    },
	
    /**
     * Gets a single level given a list of difficulties - using the current game state
     * @param difficulties - the list of difficulties
     * @returns The difficulty to use; null if no difficulties work
     */
    _getLevelForEvent: function(difficulties) {
        for (let i = 0; i < difficulties.length; i++)
        {
            let difficultyRequirement = difficulties[i];
            if (difficultyRequirement.Difficulty === RpgTaskDifficulty.NONE ||
                Data.calculateObtainability(difficultyRequirement) === ItemObtainability.YES) {
                return difficultyRequirement.Difficulty;
            }
        };

        return null;
    }
};