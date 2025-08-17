LocationSidebar = {
    /**
     * Which ages to show the item locations for
     */
    showChildLocations: true,
    showAdultLocations: true,

    refreshLocationList: function() {
        let locationDiv = document.getElementById("locationList");
        locationDiv.innerHTML = "";
        
        this._createLocationHeader();
        
        let _this = this;
        let locationList = Data.getLocationDataForDisplay();
        locationList.forEach(function(location) {
            let currentLocationDiv = _this._createLocationDiv(location);
            locationDiv.appendChild(currentLocationDiv);
        });
    
        this.refreshSelectedLocation();
    },

    /**
     * Refreshes the sidebar with the info from the currently selected location
     */
    refreshSelectedLocation: function() {
        this.updateSelectedLocation(ItemLocationDisplay.currentLocationName);
    },

    /**
     * Updates the selected location Div - this will update the CSS classes
     */
    updateSelectedLocation: function(locationName) {
        if (this.isLocationAMap()) {
            let selectedId = `location-item-${ItemLocationDisplay.currentLocationName}`;
            let selectedDiv = document.getElementById(selectedId);
            let backgroundColor = Data.getColorFromLocationName(ItemLocationDisplay.currentLocationName);
            selectedDiv.style.backgroundColor = backgroundColor
            removeCssClass(selectedDiv, "selected-location");
        }

        if (this.isLocationAMap(locationName)) {
            let idToSelect = `location-item-${locationName}`;
            let divToSelect = document.getElementById(idToSelect);
            divToSelect.style.backgroundColor = "";
            addCssClass(divToSelect, "selected-location");
        }
    },

    /**
     * Gets the ages to hide in the tracker
     * @returns - the age to show (CHILD/ADULT/EITHER/null)
     */
    getAgesToHide: function() {
        if (this.showChildLocations && !this.showAdultLocations) {
            return Age.ADULT;
        }
        if (this.showAdultLocations && !this.showChildLocations) {
            return Age.CHILD;
        }
        if (this.showChildLocations && this.showAdultLocations) {
            return null;
        }
        return Age.EITHER;
    },

    /**
     * Creates the header for the location list
     */
    _createLocationHeader: function() {
        let locationDiv = document.getElementById("locationList");
        let containerDiv = dce("div", "location-item-header-container location-item");
        let headerTitleDiv = dce("div", "location-item-header-title");
        headerTitleDiv.id = "locationItemHeader";
        
        containerDiv.appendChild(headerTitleDiv);
        containerDiv.appendChild(this._createHeaderTodoIcon(Age.CHILD));
        containerDiv.appendChild(this._createHeaderTodoIcon(Age.ADULT));
        
        headerTitleDiv.innerText = "Locations";
        locationDiv.appendChild(containerDiv);
        
        if (_locationSmaller) {
            headerTitleDiv.innerText = "LOC";
            addCssClass(headerTitleDiv, "location-smaller");
        }
        
        headerTitleDiv.onclick = function() {
            _locationSmaller = !_locationSmaller;

            let rightContainer = document.getElementById("rightContainer");
            let settingsContainer = document.getElementById("settingsContainer");
            let notesContainer = document.getElementById("notesContainer");
            let spawnsContainer = document.getElementById("spawnsContainer");
            let rpgContainer = document.getElementById("rpgContainer");

            removeCssClass(rightContainer, "location-smaller");
            removeCssClass(settingsContainer, "location-smaller")
            removeCssClass(notesContainer, "location-smaller")
            removeCssClass(spawnsContainer, "location-smaller")
            removeCssClass(rpgContainer, "location-smaller")
            if (_locationSmaller) {
                addCssClass(rightContainer, "location-smaller");
                addCssClass(settingsContainer, "location-smaller")
                addCssClass(notesContainer, "location-smaller")
                addCssClass(spawnsContainer, "location-smaller")
                addCssClass(rpgContainer, "location-smaller")
            }

            LocationSidebar.refreshLocationList();
        }
    },

    /**
     * Creates the header TODO icon for the given age
     * These age the child/adult icons above the list of locations
     * If spawn shuffle is on, it will list the age's spawn point in a tooltip
     * 
     * Clicking it will toggle the age-specific location display on or off
     */
    _createHeaderTodoIcon: function(age) {
        let todoIconDiv = dce("div", `location-item-header-${age.toLowerCase()}-icon`);
        todoIconDiv.id = `itemHeader${age}Icon`;

        let showAgeLocations = age === Age.CHILD
            ? this.showChildLocations
            : this.showAdultLocations;

        addOrRemoveCssClass(todoIconDiv, "location-item-header-show-age", showAgeLocations);

        if (Data.randomizedSpawnLocations.useRandomizedSpawns) {
            todoIconDiv.title = "No spawn set";
            if (Data.randomizedSpawnLocations[age]) {
                let map = Data.randomizedSpawnLocations[age].map;
                let region = Data.randomizedSpawnLocations[age].region;
                let entranceName = Data.randomizedSpawnLocations[age].entranceName;
                todoIconDiv.title = `${map} | ${region}`;

                if (entranceName) {
                    todoIconDiv.title += ` | ${entranceName}`;
                }
            }
        }

        todoIconDiv.onclick = this.onTodoIconClick.bind(this, age);

        return todoIconDiv;
    },

    /**
     * Adjusts the state of the form when the age icon is clicked
     * - will NEVER result in both ages being off - toggles on the OTHER age in that case
     * @param age - the age of the todo icon 
     * @param todoIconDiv - the icon div
     */
    onTodoIconClick: function(age) {
        let childDiv = document.getElementById("itemHeaderChildIcon");
        let adultDiv = document.getElementById("itemHeaderAdultIcon");

        if (age === Age.CHILD) {
            this.showChildLocations = !this.showChildLocations;
        } else {
            this.showAdultLocations = !this.showAdultLocations;
        }

        addOrRemoveCssClass(childDiv, "location-item-header-show-age", this.showChildLocations);
        addOrRemoveCssClass(adultDiv, "location-item-header-show-age", this.showAdultLocations);

        if (LocationSidebar.isLocationAMap()) {
            ItemLocationDisplay.displayLocation(ItemLocationDisplay.currentLocationName);
        }
    },

    /**
     * Populates the location div
     * @param location - the data to create the div from
     */
    _createLocationDiv: function(location) {
        let locationName = location.name;
        let mainDiv = dce("div", "location-item");
        let locationNameDiv = dce("div", "location-item-main");
        mainDiv.id = `location-item-${locationName}`;
        mainDiv.appendChild(locationNameDiv);

        let backgroundColor = Data.getColorFromLocationName(locationName);
        let isShuffled = Data.getDoesEntranceShuffleApply(locationName, true);
        let isDungeon = location.mapGroupId === MapGroups.DUNGEONS;
        if (isShuffled && isDungeon && !Settings.RandomizerSettings.decoupleEntrances) {
            let linkedDungeon = Data.getDungeonEntranceMap(locationName);
            if (linkedDungeon) {
                let dungeonIconDiv = dce("div", "location-item-dungeon-icon");
                dungeonIconDiv.style.backgroundImage = `url("Images/Dungeons/${linkedDungeon}.png")`;
                dungeonIconDiv.style.backgroundColor = backgroundColor;
                mainDiv.appendChild(dungeonIconDiv);
                
                addCssClass(locationNameDiv, "location-item-shorten-name");
                
                let locationDiv = document.getElementById("locationList");
                addCssClass(locationDiv, "location-item-has-dungeon-icon");
                
                let rightContainer = document.getElementById("rightContainer");
                addCssClass(rightContainer, "location-item-has-dungeon-icon");
            }
        }
        
        let childTodoDiv = dce("div", "location-item-todo-count");
        let adultTodoDiv = dce("div", "location-item-todo-count");
        mainDiv.appendChild(childTodoDiv);
        mainDiv.appendChild(adultTodoDiv);

        let locationText = _locationSmaller ? location.abbreviation : location.name;
        locationNameDiv.innerHTML = locationText;
        locationNameDiv.style.backgroundColor = backgroundColor;

        if (_locationSmaller) { 
            addCssClass(locationNameDiv, "location-smaller"); 
        }

        let spawnStyles = RegionWalker.getSpawnLocationStyles(location.name);
        if (spawnStyles) {
            let bgColor = spawnStyles.background || "inherit";
            let fontColor = spawnStyles.color || "black";
            locationNameDiv.innerHTML = `<mark style="background-color: ${bgColor}; color: ${fontColor}; outline: 1.5px solid white">${locationText}</mark>`;
        }        
        
        this._setLocationTodoDivForAge(location.name, location.childData, location.childBackgroundColor, childTodoDiv, Age.CHILD);
        this._setLocationTodoDivForAge(location.name, location.adultData, location.adultBackgroundColor, adultTodoDiv, Age.ADULT);

        mainDiv.onclick = function() {
            ItemLocationDisplay.displayLocation(location.name);
            Walk.updateTravelDiv();
        }

        mainDiv.oncontextmenu = function() {
            if (Settings.RandomizerSettings.dungeonSetting === DungeonSettings.MIXED) {
                toggleDungeonMapType(location.name);
                if (LocationSidebar.isLocationAMap()) {
                    ItemLocationDisplay.displayLocation(ItemLocationDisplay.currentLocationName);
                }
                refreshAll();
            }
        }
        
        return mainDiv;
    },

    /**
     * Sets the text and styles for the given location div at the given age
     */
    _setLocationTodoDivForAge(mapName, canDoData, backgroundColor, locationTodoDiv, age) {
        let cannotGetToMapColor = "#ED9082";
        let canAccess = Data.canAccessMap(age, mapName);

        locationTodoDiv.innerText = canAccess ? canDoData.canDo : "?";
        locationTodoDiv.style.backgroundColor = canAccess ? backgroundColor : cannotGetToMapColor;
    },

    /**
	 * Updates the styles in the location sidebar for when walking is active or not
	 */
	updateForWalk: function(relevantMaps) {
		Object.keys(MapLocations).forEach(function (mapName) {
			let locDiv = document.getElementById(`location-item-${mapName}`);
			if (relevantMaps.includes(mapName)) {
				addCssClass(locDiv, "location-item-included-in-walk");
			} else {
				removeCssClass(locDiv, "location-item-included-in-walk");
			}

			if (Walk.currentLocation === mapName) {
				addCssClass(locDiv, "location-item-walking-to");
			} else {
				removeCssClass(locDiv, "location-item-walking-to");
			}
		});
    },

    /**
     * Displays the given container id and hides the rest
     * Valid IDs are: rightContainer, notesContainer, spawnsContainer, settingsContainer
     */
    displayContainer: function(containerName) {
        addCssClass(document.getElementById("rightContainer"), "nodisp");
        addCssClass(document.getElementById("notesContainer"), "nodisp");
        addCssClass(document.getElementById("spawnsContainer"), "nodisp");
        addCssClass(document.getElementById("settingsContainer"), "nodisp");
        addCssClass(document.getElementById("rpgContainer"), "nodisp");

        let container = document.getElementById(containerName);
        if (container) {
            removeCssClass(container, "nodisp");
        }
    },
    
    /**
     * Returns whether the location is a map, as oppossed to something like the settings page
     * Uses the current location if one isn't given
     */
    isLocationAMap: function(locationName) {
        if (!locationName) {
            locationName = ItemLocationDisplay.currentLocationName;
        }

        return locationName !== "" && 
            locationName !== "Settings" && 
            locationName !== "Notes" && 
            locationName !== "Spawns" &&
            locationName !== "RPG";
    },

    /**
     * Called when a new location is clicked - including settings/notes/etc so that CSS is updated properly
     */
    updateSidebarLocation: function() {
		if (LocationSidebar.isLocationAMap()) {
			let selectedId = `location-item-${ItemLocationDisplay.currentLocationName}`;
			let selectedDiv = document.getElementById(selectedId);
			let backgroundColor = Data.getColorFromLocationName(ItemLocationDisplay.currentLocationName);
			selectedDiv.style.backgroundColor = backgroundColor;
			removeCssClass(selectedDiv, "selected-location");
		}
    }
};