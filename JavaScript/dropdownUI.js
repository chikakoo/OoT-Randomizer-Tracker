/**
 * Contains code for the dropdown boxes for entrances
 * TODO: the refactoring to convert interiors/grottos into dropdowns
 */
let DropdownUI = {
    /**
     * Creates the OW dropdown div for a given item location
     * @param itemLocation - the item location
     * @param itemLocationTextDiv - the main div of the item location - passed in to provide right-click travel
     */
    createOWDropdown: function(itemLocation, itemLocationTextDiv) {
        let dropdownGroup = dce("div", "dropdown-group");
			
        let locDropdown = dce("select");
        let entranceDropdown = dce("select");
        locDropdown.id = `${itemLocation.Name}-location-dropdown`;
        entranceDropdown.id = `${itemLocation.Name}-entrance-dropdown`;
        
        if (itemLocation.ReadOnly) {
            locDropdown.disabled = true;
            entranceDropdown.disabled = true;
        }
        
        itemLocationTextDiv.oncontextmenu = function() {
            let mapName = locDropdown.options[locDropdown.selectedIndex].value;
            if (mapName !== "<no selection>") {
                displayLocation(mapName);
                Walk.updateTravelDiv();	
            }
        };
        
        dropdownGroup.appendChild(locDropdown);
        dropdownGroup.appendChild(entranceDropdown);

        return dropdownGroup;
    },

    /**
     * Refreshes the entrance dropdowns so that they contain the correct text/choices/click handlers
     * @param itemLocation - the item location
     * @param loc - the main location dropdown (optional)
     * @param entrance - the entrance dropdown (optional)
     */
    refreshEntranceDropdowns: function(itemLocation, loc, entrance) {
        let entranceOptions = {
            isOwl: itemLocation.IsOwl,
            getInteriors: itemLocation.IsInteriorExit,
            getGrottos: itemLocation.IsGrottoExit
        };

        if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
            this._refreshOWLocationDropdown(itemLocation, loc, entrance, entranceOptions);
            this._refreshOWEntranceDropdown(itemLocation, loc, entrance, entranceOptions);
        }
    },

    /**
     * Refreshes the location dropdown for an OW Entrance location
     * @param itemLocation - the item location
     * @param loc - the main location dropdown (optional)
     * @param entrance - the entrance dropdown (optional)
     * @param entranceOptions - set of options used to get the entrance choices
     */
    _refreshOWLocationDropdown: function(itemLocation, loc, entrance, entranceOptions) {
        let locDropdown = loc || document.getElementById(`${itemLocation.Name}-location-dropdown`);
        let entranceDropdown = entrance || document.getElementById(`${itemLocation.Name}-entrance-dropdown`);

        let defaultMap = itemLocation.OwShuffleMap;
        if (!defaultMap) { // Means no map (and thus no exit) is selected, so we need to clear everything
            locDropdown.innerHTML = "";
            entranceDropdown.innerHTML = "";
        }

        let isDungeon = itemLocation.IsDungeonEntrance;
        let options = this._getDropdownMaps(isDungeon);
        options.unshift("<no selection>");
        this._fillStringDropdown(locDropdown, options, defaultMap);

        locDropdown.onchange = this.onLocDropdownChange.bind(
            this, itemLocation, locDropdown, entranceDropdown, entranceOptions);
    },

    /**
     * Refreshes the entrance dropdown for an OW Entrance location
     * @param itemLocation - the item location
     * @param loc - the main location dropdown (optional)
     * @param entrance - the entrance dropdown (optional)
     * @param entranceOptions - set of options used to get the entrance choices
     */
    _refreshOWEntranceDropdown: function(itemLocation, loc, entrance, entranceOptions) {
        let locDropdown = loc || document.getElementById(`${itemLocation.Name}-location-dropdown`);
        let entranceDropdown = entrance || document.getElementById(`${itemLocation.Name}-entrance-dropdown`);

        let defaultMap = itemLocation.OwShuffleMap;
        let defaultExit = itemLocation.OwShuffleExitName;
        if (defaultMap && defaultExit) {
            let entrances = this._getDropdownOptions(defaultMap, entranceOptions);
            this._fillStringDropdown(entranceDropdown, entrances, defaultExit);
        }

        entranceDropdown.onchange = this.onEntranceDropdownChange.bind(
            this, itemLocation, locDropdown, entranceDropdown);
    },

    /**
     * Callback for when the location dropdown changes - sets up the entrance dropdown
     * and adjusts the other side entrance appropriately
     * @param itemLocation - The item location the dropdown belongs to
     * @param locDropdown - The location dropdown that was changed
     * @param entranceDropdown - The entrance dropdown associated to the location
     * @param entranceOptions - Set of options used to get the entrance choices
     */
    onLocDropdownChange: function(itemLocation, locDropdown, entranceDropdown, entranceOptions) {
        entranceDropdown.innerHTML = "";
            
        let mapName = locDropdown.options[locDropdown.selectedIndex].value;
        let entrances = null;
        if (mapName !== "<no selection>") {
            entrances = this._getDropdownOptions(mapName, entranceOptions);
            this._fillStringDropdown(entranceDropdown, entrances);
        }
        
        let entrance = entrances && entrances[0];

        let results = Data.setOWLocationFound(_currentLocationName, itemLocation, mapName, entrance, !entrances);
        refreshAll();

        // Refresh the dropdown if it's on the current map
        let toOwExit = results.toOwExit;
        if (toOwExit && toOwExit.ExitMap === _currentLocationName) {
            this.refreshEntranceDropdowns(toOwExit);
        }

        // Refresh the old location if it's on the current map and was cleared
        let oldOwExit = results.oldOwExit;
        if (oldOwExit && _currentLocationName === oldOwExit.ExitMap && !oldOwExit.LinkedExit) {
            this.refreshEntranceDropdowns(oldOwExit);
        }

        // Don't use itemLocation, as it wouldn't have any changes resulting from the other clients
        SocketClient.itemLocationUpdated(results.fromOwExit); 
    },

    /**
     * Callback for when the entrance dropdown changes
     * @param itemLocation - The item location the dropdown belongs to
     * @param locDropdown - The location dropdown that was changed
     * @param entranceDropdown - The entrance dropdown associated to the location
     */
    onEntranceDropdownChange: function(itemLocation, locDropdown, entranceDropdown) {
        let mapName = locDropdown.options[locDropdown.selectedIndex].value;
        let entrance = entranceDropdown.options[entranceDropdown.selectedIndex].value;
        let results = Data.setOWLocationFound(_currentLocationName, itemLocation, mapName, entrance);
        refreshAll();

        // Refresh the dropdown if it's on the current map
        let toOwExit = results.toOwExit;
        if (toOwExit && toOwExit.ExitMap === _currentLocationName) {
            DropdownUI.refreshEntranceDropdowns(toOwExit);
        }

        // Refresh the old location if it's on the current map and was cleared
        let oldOwExit = results.oldOwExit;
        if (oldOwExit && _currentLocationName === oldOwExit.ExitMap && !oldOwExit.LinkedExit) {
            DropdownUI.refreshEntranceDropdowns(oldOwExit);
        }

        SocketClient.itemLocationUpdated(itemLocation)
    },

    /**
     * Adds a list of options to the given dropdown element
     * @param dropdown - The dropdown element
     * @param options - The options to put into the dropdown
     * @param defaultValue - The value to select by default
     */
    _fillStringDropdown: function(dropdown, options, defaultValue) {
        options.forEach(function(option) {
            let optionElement = dce("option");
            optionElement.value = option;
            optionElement.innerText = option;
            
            if (option === defaultValue) {
                optionElement.selected = "selected";
            }
            
            dropdown.appendChild(optionElement);
        });
    },

    /**
     * Gets an array of all the non-dungeon map names
     * @param isForDungeonDropdown - whether it's for the dungeon dropdown
     */
	_getDropdownMaps: function(isForDungeonDropdown) {
		let owMaps = [];
		let mapNames = Object.keys(MapLocations);
		mapNames.forEach(function (mapName) {
			let map = MapLocations[mapName]
            let isDungeon = map.MapGroup === MapGroups.DUNGEONS;
            let dungeonCheck = isForDungeonDropdown
                ? isDungeon && isForDungeonDropdown
                : !isDungeon && !isForDungeonDropdown;
			if (dungeonCheck) {
				owMaps.push(mapName);
			}
		});
		
		return owMaps;
    },

    /**
     * Gets an array of entrance names to use for the dropdown
     * @param {string} mapName - the name of the map
     * @param {Any} entranceOptions - options for the function for what to get
     * {
     *  isOwl: boolean,
     *  getInteriors: boolean,
     *  getGrottos: boolean
     * }
     * @returns the array of entrances (strings)
     */
    _getDropdownOptions: function(mapName, options) {
        let entrances = [];
        let exits = OwExits[mapName];
        let itemGroupType = options.getInteriors || options.getGrottos
            ? ItemGroups.ENTRANCE
            : ItemGroups.OW_ENTRANCE;

        Object.keys(exits).forEach(function(entranceName) {
            let entrance = exits[entranceName];

            if (entrance.ExcludeFromDropdown) {
                return;
            }

            if (entrance.ItemGroup === itemGroupType && 
                (!entrance.Hide || (options.isOwl && entrance.ShowForOwl)) && 
                !entrance.IsDungeonEntrance && 
                !entrance.IsOwl)
            {
                entrances.push(entranceName);
                return;
            }

            if (entrance.ItemGroup === itemGroupType && 
                ((options.getInteriors && entrance.IsInterior) ||
                (options.getGrottos && entrance.IsGrotto))) 
            {
                entrances.push(entranceName);
                return;
            }
        });
        
        return entrances;
    }
};