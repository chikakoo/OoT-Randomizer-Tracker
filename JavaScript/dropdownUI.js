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
			
        let locDropdown = dce("select", "ow-location-dropdown");
        let entranceDropdown = dce("select");
        locDropdown.id = this.getItemLocationDropdownId(itemLocation);
        entranceDropdown.id = this.getEntranceDropdownId(itemLocation);
        
        if (itemLocation.ReadOnly) {
            locDropdown.disabled = true;
            entranceDropdown.disabled = true;
        }
        
        itemLocationTextDiv.oncontextmenu = function() {
            let mapName = locDropdown.options[locDropdown.selectedIndex].value;
            if (mapName !== "<no selection>") {
                ItemLocationDisplay.displayLocation(mapName);
                Walk.updateTravelDiv();	
            }
        };
        
        dropdownGroup.appendChild(locDropdown);
        dropdownGroup.appendChild(entranceDropdown);

        return dropdownGroup;
    },

    /**
     * Gets the ID of an item location dropdown
     * @param itemLocation - The item location to get the dropdown for
     */
    getItemLocationDropdownId: function(itemLocation) {
        return `${itemLocation.Name}-location-dropdown`;
    },

    /**
     * Gets the item location dropdown
     * @param itemLocation - The item location to get the dropdown for
     */
    getItemLocationDropdown: function(itemLocation) {
        return document.getElementById(this.getItemLocationDropdownId(itemLocation));
    },

    /**
     * Gets the ID of an entrance dropdown
     * @param itemLocation - The item location corresponding to the entrance to get the dropdown for
     */
    getEntranceDropdownId: function(itemLocation) {
        return `${itemLocation.Name}-entrance-dropdown`;
    },

    /**
     * Gets the entrance dropdown
     * @param itemLocation - The item location corresponding to the entrance to get the dropdown for
     */
    getEntranceDropdown: function(itemLocation) {
        return document.getElementById(this.getEntranceDropdownId(itemLocation));
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
            isOneWay: itemLocation.OneWayEntrance,
            isDungeonExit: itemLocation.IsDungeonExit,
            getInteriors: itemLocation.IsInteriorExit,
            getGrottos: itemLocation.IsGrottoExit
        };

        if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
            this._refreshOWLocationDropdown(itemLocation, loc, entrance, entranceOptions);
            this._refreshOWEntranceDropdown(itemLocation, loc, entrance, entranceOptions);
        } else if (Data.isNonItemGroupEntrance(itemLocation)) {
            this._refreshInteriorOrGrottoDropdown(
                itemLocation, 
                loc,
                EntranceUI.getEntranceData(itemLocation));
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
        let locDropdown = loc || this.getItemLocationDropdown(itemLocation);
        let entranceDropdown = entrance || this.getEntranceDropdown(itemLocation);

        locDropdown.innerHTML = "";
        entranceDropdown.innerHTML = "";

        let isDungeon = itemLocation.IsDungeonEntrance;
        let options = this._getDropdownMaps(isDungeon, entranceOptions);
        options.unshift("<no selection>");

        let defaultMap = itemLocation.OwShuffleMap;
        this._fillStringDropdown(locDropdown, options, defaultMap, true);

        if (defaultMap) {
            this._setMapInlineBackgroundColorForElement(locDropdown, defaultMap);
            locDropdown.style.color = "white";
        } else {
            locDropdown.style.color = null;
            locDropdown.style.backgroundColor = null;
        }

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
        let locDropdown = loc || this.getItemLocationDropdown(itemLocation);
        let entranceDropdown = entrance || this.getEntranceDropdown(itemLocation);

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

        if (mapName === "<no selection>") {
            locDropdown.style.color = null;
            locDropdown.style.backgroundColor = null;
        } else {
            entrances = this._getDropdownOptions(mapName, entranceOptions);
            this._fillStringDropdown(entranceDropdown, entrances);

            this._setMapInlineBackgroundColorForElement(locDropdown, mapName);
            locDropdown.style.color = "white";
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
        let results = Data.setOWLocationFound(ItemLocationDisplay.currentLocationName, itemLocation, mapName, entranceName, clearDropdown);
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
        if (toOwExit && toOwExit.ExitMap === ItemLocationDisplay.currentLocationName) {
            this.refreshEntranceDropdowns(toOwExit);
        }

        // Refresh the old location if it's on the current map and was cleared
        let oldOwExit = setOwLocationFoundResults.oldOwExit;
        if (oldOwExit && ItemLocationDisplay.currentLocationName === oldOwExit.ExitMap && !oldOwExit.LinkedExit) {
            this.refreshEntranceDropdowns(oldOwExit);
        }
    },

    /**
     * Creates the interior dropdown div for a given item location
     * @param itemLocation - the item location
     * @param itemLocationTextDiv - the main div of the item location - passed in to provide right-click travel
     */
    createInteriorOrGrottoDropdown: function(itemLocation, itemLocationTextDiv) {
        let dropdownId = this.getItemLocationDropdownId(itemLocation);
        let options = this._getInteriorOrGrottoDropdownOptions(itemLocation);
        let dropdown = IconDropdown.create(dropdownId, options);

        itemLocationTextDiv.oncontextmenu = function() {
            let mapName = itemLocation.OwShuffleMap;
            if (mapName) {
                ItemLocationDisplay.displayLocation(mapName);
                Walk.updateTravelDiv();	
            }
        };

        return dropdown;
    },

    // *   - option: <the string value>
    // *   - callback: (optional) <a function to call when a new option is selected>
    // *      - The function accepts a parameter containing the selected value
    // *   - selected: (optional) <a boolean for whether this option should be selected by default>
    // *   - tooltip: (optional) <the tooltip to display for the option>
    // *   - icon: (optional) <the url for the icon to include (the entire style to set in backgroundImage)>
    // *   - backgroundColor: (optional) <the background color to use for the option - maintains it when selected too>
    // *   - textColor: (optional) <the text color to use for the option>
    // *   - selectedTextValue: (optional) <the text to show on the button if this option is selected>
    // *   - selectedIconValue: (optional) <the icon to show on the button if this option is selected>
    _getInteriorOrGrottoDropdownOptions: function(itemLocation) {
        //TODO: callbacks for options

        let interiorOrGrottoObject = EntranceUI.getEntranceData(itemLocation);

        let defaultOption = itemLocation.EntranceGroup
            ? itemLocation.EntranceGroup.name
            : null;

        let locationChoices = EntranceUI.getFilteredGroupNames(interiorOrGrottoObject, defaultOption, itemLocation);
        let dropdownOptions = [{
            option: "<no selection>",
            selectedTextValue: "🔽"
        }];

        locationChoices.forEach(groupName => {
            let group = interiorOrGrottoObject[groupName];
            let icon = EntranceUI.getEntranceGroupIcon(group, groupName);
            dropdownOptions.push({
                option: groupName,
                selected: groupName === defaultOption,
                tooltip: group.tooltip,
                icon: icon,
                selectedIconValue: icon
            });
        });

        return dropdownOptions;
    },

    _refreshInteriorOrGrottoDropdown: function(itemLocation, loc, interiorOrGrottoObject) {
        let locDropdown = loc || this.getItemLocationDropdown(itemLocation);
        locDropdown.innerHTML = "";

        let defaultOption = itemLocation.EntranceGroup
            ? itemLocation.EntranceGroup.name
            : null;

        let locationChoices = EntranceUI.getFilteredGroupNames(interiorOrGrottoObject, defaultOption, itemLocation);
        locationChoices.unshift("<no selection>");

        let dropdownOptions = [];
        locationChoices.forEach(groupName => {
            let group = interiorOrGrottoObject[groupName];
            let tooltip = group ? group.tooltip : "";
            dropdownOptions.push({
                option: groupName, 
                tooltip: tooltip,
                icon: group?.dropdownIcon
            });
        });
        this._fillStringDropdown(locDropdown, dropdownOptions, defaultOption);

        locDropdown.onclick = function(event) { event.stopPropagation(); }
        locDropdown.onchange = this.onInteriorOrGrottoDropdownChange.bind(this, interiorOrGrottoObject, itemLocation);
        this._updateInteriorOrGrottoStyles(itemLocation, locDropdown);
    },

    onInteriorOrGrottoDropdownChange: function(entranceData, itemLocation, event) {
        event.stopPropagation();
        let groupName = event.currentTarget.value;

        // Clear the old group data out first
        let oldGroup = itemLocation.EntranceGroup && entranceData[itemLocation.EntranceGroup.name];
        if (oldGroup) {
            if (oldGroup.overworldLink) {
                Data.setOWLocationFound(
                    ItemLocationDisplay.currentLocationName, 
                    itemLocation, 
                    oldGroup.overworldLink.ExitMap, 
                    oldGroup.overworldLink.Name,
                    true);
            }

            this._tryFirePostClick(itemLocation, oldGroup, false);
        } 

        if (groupName === "<no selection>") {
            EntranceUI.clearGroupChoice(itemLocation);
            this._updateInteriorOrGrottoStyles(itemLocation, event.target);
            SocketClient.itemLocationUpdated(itemLocation);
            return;
        }
        
        EntranceUI.initializeEntranceGroupData(itemLocation, groupName);

        let itemLocationEntranceTasksContainer = document.getElementById(`${itemLocation.Name}-entrance-tasks`);
        EntranceUI.createButtonDivs(itemLocation, itemLocationEntranceTasksContainer);
        
        if (Data.isItemLocationAShop(itemLocation)) {
            ItemLocationDisplay.toggleMoreInfo(document.getElementById(itemLocation.Name), itemLocation, true);
        }
        
        ItemLocationDisplay.refreshNotes(itemLocation); 

        let group = entranceData[groupName];
        if (group.overworldLink) {
           Data.setOWLocationFound(ItemLocationDisplay.currentLocationName, itemLocation, group.overworldLink.ExitMap, group.overworldLink.Name);
        }

        this._tryFirePostClick(itemLocation, group, true);
        this._updateInteriorOrGrottoStyles(itemLocation, event.target);
        SocketClient.itemLocationUpdated(itemLocation);
        refreshAll();
    },

    /**
     * Tries to fire the post click of the entrance group
     * @param itemLocation - The item location
     * @param group - The entrance group
     * @param groupSelected - Whether the group is currently selected
     */
    _tryFirePostClick: function(itemLocation, group, groupSelected) {
        let shouldFirePostClick = !group.shouldNotTrigger || !group.shouldNotTrigger(groupSelected);
        if (shouldFirePostClick && group.postClick) {
            group.postClick(itemLocation, groupSelected);
        }
    },

    /**
     * Updates the styles of the interior or grotto dropdown
     * @param itemLocation - the item location
     * @param dropdown - the dropdown
     */
    _updateInteriorOrGrottoStyles: function(itemLocation, dropdown) {
        if (itemLocation.EntranceGroup?.name) {
            dropdown.title = itemLocation.EntranceGroup.name;
            dropdown.style.backgroundImage = EntranceUI.getEntranceGroupIconOrSelectedEntrance(itemLocation);
        } else {
            dropdown.title = "<no selection>";
            dropdown.style.backgroundImage = "";
        }
        
        if (itemLocation.ItemGroup === ItemGroups.INTERIOR &&
            !Settings.RandomizerSettings.shuffleInteriorEntrances) {
            dropdown.disabled = true;
        } else if (itemLocation.ItemGroup === ItemGroups.GROTTO &&
            !Settings.RandomizerSettings.shuffleGrottoEntrances) {
            dropdown.disabled = true;
        }
    },

    /**
     * Adds a list of options to the given dropdown element
     * @param dropdown - The dropdown element
     * @param options - The options to put into the dropdown - an array of objects containing:
     * { option: "string value", tooltip: "string tooltip", icon: "option icon" } OR just a string of options
     * @param useInlineColors - Whether to look up the inline color (for OW locations)
     * @param defaultValue - The value to select by default
     */
    _fillStringDropdown: function(dropdown, options, defaultValue, useInlineColors) {
        let _this = this;
        options.forEach(function(optionObject) {
            let option = optionObject.option
                ? optionObject.option
                : optionObject;

            let optionElement = dce("option");
            optionElement.value = option;
            optionElement.innerText = optionObject?.icon
                ? `${optionObject.icon} ${option}`
                : option;

            if (optionObject.tooltip) {
                optionElement.title = optionObject.tooltip;
            }
            
            if (option === defaultValue) {
                optionElement.selected = "selected";
            }

            if (useInlineColors) {
                if (option === "<no selection>") {
                    optionElement.style.color = "black";
                } else {
                    _this._setMapInlineBackgroundColorForElement(optionElement, option);
                }
            }

            dropdown.appendChild(optionElement);
        });
    },

    /**
     * Sets an element's background color, given the map name
     * @param element - the element to set the color for
     * @param mapName - the map name
     */
    _setMapInlineBackgroundColorForElement: function(element, mapName) {
        let backgroundColor = Data.getColorFromLocationName(mapName);
        if (backgroundColor) {
            element.style.backgroundColor = backgroundColor;
        }
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
            let thievesHideoutCheck = mapName !== "Thieves' Hideout" || Settings.RandomizerSettings.shuffleThievesHideout;
			if (dungeonCheck && thievesHideoutCheck) {
                // Don't add the map if it doesn't have the entrance type we're looking for
                let itemLocs = Data.getAllItemLocations(mapName);
                if (entranceOptions.getInteriors && 
                        !itemLocs.some(itemLoc => itemLoc.ItemGroup === ItemGroups.INTERIOR) ||
                    entranceOptions.getGrottos && 
                        !itemLocs.some(itemLoc => itemLoc.ItemGroup === ItemGroups.GROTTO)) {
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
     *  isOneWay: boolean,
     *  getInteriors: boolean,
     *  getGrottos: boolean
     * }
     * @returns the array of entrances (strings)
     */
    _getDropdownOptions: function(mapName, options) {
        let entrances = [];
        let exits = OwExits[mapName];
        let getOwEntrances = !options.getInteriors && !options.getGrottos;

        Object.keys(exits).forEach(function(entranceName) {
            let entrance = exits[entranceName];

            let hiddenExit = entrance.Hide && !(options.isOneWay && entrance.ShowForOneWay); // One-way dropdowns need some hidden entrances
            if (entrance.ExcludeFromDropdown || hiddenExit) {
                return;
            }

            let itemGroup = entrance.ItemGroup;
            if (getOwEntrances && itemGroup !== ItemGroups.OW_ENTRANCE) {
                return;
            }

            if (!getOwEntrances && !Data.isEntrance(entrance)) {
                return;
            }

            if (getOwEntrances) {
                // Dungeon exits ONLY care about dungeon entrances, as that's currently the only way into them
                // TODO: revisit this when decoupled exits are a thing
                if (options.isDungeonExit && entrance.IsDungeonEntrance) {
                    entrances.push(entranceName);
                    return;
                }

                // Don't include dungeons or owls in any OW entrance
                if (!entrance.IsDungeonEntrance && !entrance.IsOwl)
                {
                    entrances.push(entranceName);
                    return;
                }
            } else {
                // Only grab the set of entrances that matter for interiors/grottos
                if ((options.getInteriors && entrance.ItemGroup === ItemGroups.INTERIOR) ||
                    (options.getGrottos && entrance.ItemGroup === ItemGroups.GROTTO))
                {
                    entrances.push(entranceName);
                    return;
                }
            }
        });
        
        return entrances;
    }
};