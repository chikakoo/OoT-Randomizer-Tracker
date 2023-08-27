/**
 * Contains code for the dropdown boxes for entrances
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
     * Creates the interior dropdown div for a given item location
     * @param itemLocation - the item location
     * @param itemLocationTextDiv - the main div of the item location - passed in to provide right-click travel
     */
    createInteriorOrGrottoDropdown: function(itemLocation, itemLocationTextDiv) {
        let dropdownGroup = dce("div", "dropdown-group");
        let dropdown = dce("select");
        dropdown.id = `${itemLocation.Name}-location-dropdown`;

        itemLocationTextDiv.oncontextmenu = function() {
            let mapName = itemLocation.OwShuffleMap;
            if (mapName) {
                displayLocation(mapName);
                Walk.updateTravelDiv();	
            }
        };

        dropdownGroup.appendChild(dropdown);

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
            getInteriors: itemLocation.IsInteriorExit, //TODO: this and grottos maybe can be cleaned up...?
            getGrottos: itemLocation.IsGrottoExit
        };

        if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
            this._refreshOWLocationDropdown(itemLocation, loc, entrance, entranceOptions);
            this._refreshOWEntranceDropdown(itemLocation, loc, entrance, entranceOptions);
        } else if ((itemLocation.ItemGroup === ItemGroups.ENTRANCE && !itemLocation.IsItemLocationGroup)) {
            this._refreshInteriorOrGrottoDropdown(
                itemLocation, 
                loc,
                itemLocation.IsInterior ? InteriorGroups : GrottoGroups);
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

        locDropdown.innerHTML = "";
        entranceDropdown.innerHTML = "";

        let isDungeon = itemLocation.IsDungeonEntrance;
        let options = this._getDropdownMaps(isDungeon, entranceOptions);
        options.unshift("<no selection>");

        let defaultMap = itemLocation.OwShuffleMap;
        this._fillStringDropdown(locDropdown, options, defaultMap);

        locDropdown.onchange = this.onOWLocDropdownChange.bind(
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

        entranceDropdown.onchange = this.onOWEntranceDropdownChange.bind(
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
    onOWLocDropdownChange: function(itemLocation, locDropdown, entranceDropdown, entranceOptions) {
        entranceDropdown.innerHTML = "";
            
        let mapName = locDropdown.options[locDropdown.selectedIndex].value;
        let entrances = null;
        if (mapName !== "<no selection>") {
            entrances = this._getDropdownOptions(mapName, entranceOptions);
            this._fillStringDropdown(entranceDropdown, entrances);
        }
        
        let entranceName = entrances && entrances[0];
        this._updateOWDropdown(itemLocation, mapName, entranceName, !entrances);
    },

    /**
     * Callback for when the entrance dropdown changes
     * @param itemLocation - The item location the dropdown belongs to
     * @param locDropdown - The location dropdown that was changed
     * @param entranceDropdown - The entrance dropdown associated to the location
     */
    onOWEntranceDropdownChange: function(itemLocation, locDropdown, entranceDropdown) {
        let mapName = locDropdown.options[locDropdown.selectedIndex].value;
        let entranceName = entranceDropdown.options[entranceDropdown.selectedIndex].value;
        this._updateOWDropdown(itemLocation, mapName, entranceName, false);
    },

    /**
     * Updates the OW dropdown (both for location and entrance) with the given information
     * @param itemLocation - The item location the dropdown belongs to
     * @param mapName - The map selected by the location dropdown
     * @param entranceName - The entrance selected by the entrance dropdown
     * @param clearDropdown - Used by the location dropdown to clear the entries if <no selection> was selected
     */
    _updateOWDropdown: function(itemLocation, mapName, entranceName, clearDropdown) {
        let results = Data.setOWLocationFound(_currentLocationName, itemLocation, mapName, entranceName, clearDropdown);
        refreshAll();
        this._refreshDropdownsOnCurrentPage(results);
    },

    /**
     * Refreshes/sets the entrance dropdowns in the case that the entrance lead to the same map
     * To be called after Data.setOWLocationFound
     * @param setOwLocationFoundResults - the results from Data.setOWLocationFound
     */
    _refreshDropdownsOnCurrentPage: function(setOwLocationFoundResults) {
        // Refresh the dropdown if it's on the current map
        let toOwExit = setOwLocationFoundResults.toOwExit;
        if (toOwExit && toOwExit.ExitMap === _currentLocationName) {
            this.refreshEntranceDropdowns(toOwExit);
        }

        // Refresh the old location if it's on the current map and was cleared
        let oldOwExit = setOwLocationFoundResults.oldOwExit;
        if (oldOwExit && _currentLocationName === oldOwExit.ExitMap && !oldOwExit.LinkedExit) {
            this.refreshEntranceDropdowns(oldOwExit);
        }
    },

    _refreshInteriorOrGrottoDropdown: function(itemLocation, loc, interiorOrGrottoObject) {
        let locDropdown = loc || document.getElementById(`${itemLocation.Name}-location-dropdown`);
        locDropdown.innerHTML = "";

        let defaultOption = itemLocation.EntranceGroup
            ? itemLocation.EntranceGroup.name
            : null;

        let locationChoices = EntranceUI.getFilteredGroupNames(interiorOrGrottoObject, defaultOption, itemLocation);
        locationChoices.unshift("<no selection>");

        this._fillStringDropdown(locDropdown, locationChoices, defaultOption);

        locDropdown.onclick = function(event) { event.stopPropagation(); }
        locDropdown.onchange = this.onInteriorOrGrottoDropdownChange.bind(this, interiorOrGrottoObject, itemLocation);
    },

    onInteriorOrGrottoDropdownChange: function(entranceData, itemLocation, event) {
        event.stopPropagation();
        let groupName = event.currentTarget.value;

        // Clear the old group data out first
        let oldGroup = itemLocation.EntranceGroup && entranceData[itemLocation.EntranceGroup.name];
        if (oldGroup && oldGroup.overworldLink) {
            Data.setOWLocationFound(
                _currentLocationName, 
                itemLocation, 
                oldGroup.overworldLink.ExitMap, 
                oldGroup.overworldLink.Name,
                true);
        } 

        if (groupName === "<no selection>") {
            EntranceUI.clearGroupChoice(itemLocation);
            SocketClient.itemLocationUpdated(itemLocation);
            return;
        }
        
        //TODO: check all EntranceUI calls and see if they should be moved to DropdownUI
        EntranceUI.initializeEntranceGroupData(itemLocation, groupName);

        let itemLocationEntranceTasksContainer = document.getElementById(`${itemLocation.Name}-entrance-tasks`);
        EntranceUI._createButtonDivs(itemLocation, itemLocationEntranceTasksContainer); //TODO: this is a private function
        
        if (Data.isItemLocationAShop(itemLocation)) {
            _toggleMoreInfo(document.getElementById(itemLocation.Name), itemLocation, true); //TODO: this is a private function
        }
        
        _refreshNotes(itemLocation); //TODO: this is a private function
        
        let group = entranceData[groupName];
        if (group.overworldLink) {
           Data.setOWLocationFound(_currentLocationName, itemLocation, group.overworldLink.ExitMap, group.overworldLink.Name);
        }

        let shouldFirePostClick = !group.shouldNotTrigger || !group.shouldNotTrigger();
        if (shouldFirePostClick && group.postClick) {
            group.postClick(itemLocation, true);
        }

        SocketClient.itemLocationUpdated(itemLocation);
        refreshAll();
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
     * @param entranceOptions - used to filter maps that have no interiors or grottos to display
     */
	_getDropdownMaps: function(isForDungeonDropdown, entranceOptions) {
		let owMaps = [];
		let mapNames = Object.keys(MapLocations);
		mapNames.forEach(function (mapName) {
			let map = MapLocations[mapName]
            let isDungeon = map.MapGroup === MapGroups.DUNGEONS;
            let dungeonCheck = isForDungeonDropdown
                ? isDungeon && isForDungeonDropdown
                : !isDungeon && !isForDungeonDropdown;
			if (dungeonCheck) {
                // Don't add the map if it doesn't have the entrance type we're looking for
                let itemLocs = Data.getAllItemLocations(mapName);
                if (entranceOptions.getInteriors && !itemLocs.some(itemLoc => itemLoc.IsInterior) ||
                    entranceOptions.getGrottos && !itemLocs.some(itemLoc => itemLoc.IsGrotto)) {
                    return;
                }

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

            let hiddenExit = entrance.Hide && !(options.isOwl && entrance.ShowForOwl); // Owl dropdowns need some hidden entrances
            if (entrance.ExcludeFromDropdown || hiddenExit || entrance.ItemGroup !== itemGroupType) {
                return;
            }

            // Don't include dungeons or owns in any OW entrance
            if (itemGroupType === ItemGroups.OW_ENTRANCE && 
                !entrance.IsDungeonEntrance && 
                !entrance.IsOwl)
            {
                entrances.push(entranceName);
                return;
            }

            // Only grab the set of entrances that matter for interiors
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