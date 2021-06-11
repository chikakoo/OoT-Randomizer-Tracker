let _currentLocationName = "";

/**
 * Sets the main display to the given location name
 */
let displayLocation = function(locationName) {
	LocationSidebar.displayContainer("rightContainer");

	_updateSelectedLocation(locationName);
	if (!LocationSidebar.isLocationAMap(locationName)) { return; }
	_currentLocationName = locationName;
	
	let mapInfo = MapLocations[locationName];
	let mapNameToGetInfoFor = _currentLocationName;
	
	// Take the entrance shuffle into consideration - the map name to be used for the
	// dungeons may be different than normal
	let doesEntranceShuffleApply = Data.getDoesEntranceShuffleApply(locationName);
	if (doesEntranceShuffleApply && mapInfo.ShuffledDungeon) {
		mapNameToGetInfoFor = mapInfo.ShuffledDungeon;
		mapInfo = MapLocations[mapInfo.ShuffledDungeon]
	}

	let groupedItemLocationInfo = getGroupedLocationInfo(mapNameToGetInfoFor);
	_setUpItemGroups(groupedItemLocationInfo, mapInfo);
	updateItemDisplay();

	let floor;
	let startingFloorIndex = mapInfo.StartingFloorIndex;
	if (mapInfo.Floors && startingFloorIndex >= 0 && 
		mapInfo.Floors.length - 1 >= startingFloorIndex) {
		floor = mapInfo.Floors[mapInfo.StartingFloorIndex];
	}
	
	if (doesEntranceShuffleApply && !MapLocations[locationName].ShuffledDungeon) {
		MapUI.clearMap();
	} else {
		MapUI.setMap(locationName, groupedItemLocationInfo, floor);
	}
};

/**
 * Updates the selected location Div - this will update the CSS classes
 */
let _updateSelectedLocation = function(locationName) {
	if (LocationSidebar.isLocationAMap()) {
		let selectedId = `location-item-${_currentLocationName}`;
		let selectedDiv = document.getElementById(selectedId);
		let backgroundColor = Data.getColorFromLocationName(_currentLocationName);
		selectedDiv.style.backgroundColor = backgroundColor
		removeCssClass(selectedDiv, "selected-location");
	}

	if (LocationSidebar.isLocationAMap(locationName)) {
		let idToSelect = `location-item-${locationName}`;
		let divToSelect = document.getElementById(idToSelect);
		divToSelect.style.backgroundColor = "";
		addCssClass(divToSelect, "selected-location");
	}

	removeCssClass(document.getElementById("settingsButton"), "selected-location");
	removeCssClass(document.getElementById("notesButton"), "selected-location");
	removeCssClass(document.getElementById("spawnsButton"), "selected-location");
};

let _refreshSelectedLocation = function() {
	_updateSelectedLocation(_currentLocationName);
};

/**
 * Marks the current display with the items that are currently blocked or might be obtainable
 * Also marks the items that are currently completed
 */
let updateItemDisplay = function() {
	if (!LocationSidebar.isLocationAMap()) { return; }

	let itemLocations = Data.getItemLocationsForShuffledDungeon(_currentLocationName);
	itemLocations.forEach(function(itemLocation) {
		let canGetAsChild = Data.getItemObtainability(itemLocation, Age.CHILD);
		let canGetAsAdult = Data.getItemObtainability(itemLocation, Age.ADULT);
		let textDiv = document.getElementById(itemLocation.Name);
		let ageIconDiv = document.getElementById(`${itemLocation.Name}-age-icon`);
		let expandIconDiv = document.getElementById(`${itemLocation.Name}-expand-icon`);

		if (!ageIconDiv) { return; } // Means that this item isn't being displayed
		
		let cannotGetEntranceItem = false;
		let entranceGroup = itemLocation.EntranceGroup;
		if (entranceGroup && itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
			cannotGetEntranceItem = 
				EntranceUI.getNumberOfCompletableTasks(itemLocation, Age.CHILD) === 0 &&
				EntranceUI.getNumberOfCompletableTasks(itemLocation, Age.ADULT) === 0;
		}
		
		removeCssClass(textDiv, "item-cannot-obtain");
		if (cannotGetEntranceItem || (!canGetAsChild && !canGetAsAdult)) {
			addCssClass(textDiv, "item-cannot-obtain");
		}

		if (itemLocation.Age === Age.EITHER) {
			if (canGetAsChild && !canGetAsAdult) {
				ageIconDiv.style.backgroundImage = 'url("Images/Child Icon.png")';
			} else if (!canGetAsChild && canGetAsAdult) {
				ageIconDiv.style.backgroundImage = 'url("Images/Adult Icon.png")';
			} else {
				ageIconDiv.style.backgroundImage = "";
			}
		}

		if (itemLocation.Age === Age.CHILD && RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, Age.ADULT) ||
			itemLocation.Age === Age.ADULT && RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, Age.CHILD)) {
			// Do nothing - as both ages can get here in this case
		} else if (itemLocation.UseAdultAge && itemLocation.UseAdultAge()) {
			ageIconDiv.style.backgroundImage = 'url("Images/Adult Icon.png")';
		} else if (itemLocation.UseChildAge && itemLocation.UseChildAge()) {
			ageIconDiv.style.backgroundImage = 'url("Images/Child Icon.png")';
		}

		removeCssClass(textDiv, "item-obtained");
		if (itemLocation.playerHas) {
			addCssClass(textDiv, "item-obtained");
		}
		
		// Update the notes
		let moreInfoNotesDiv = document.getElementById(`${itemLocation.Name}-more-info-notes`);
		removeCssClass(expandIconDiv, "item-location-has-notes");
		
		if (document.activeElement.type !== "textarea" && moreInfoNotesDiv && itemLocation.notes) {
			addCssClass(expandIconDiv, "item-location-has-notes");
			moreInfoNotesDiv.value = itemLocation.notes;
		} else if (!moreInfoNotesDiv) {
			let moreInfoDiv = document.getElementById(`${itemLocation.Name}-more-info`);
			moreInfoDiv.appendChild(_createNotesDiv(itemLocation));
		}
		
		// Update the entrance buttons
		if (itemLocation.ItemGroup === ItemGroups.ENTRANCE && itemLocation.EntranceGroup) {
			EntranceUI.refreshButtons(itemLocation);
		}
		
		// Update the walking style
		if (Walk.currentLocation === _currentLocationName && Walk.currentItemLocationName === itemLocation.Name) {
			addCssClass(textDiv, "item-location-walking-to");
		} else {
			removeCssClass(textDiv, "item-location-walking-to");
		}
	});
};

/**
 * Gets the location information keyed by the item group number - this returns a result like:
 *  result[itemGroup] = {itemLocations: [Array of item locations], mapGroup: mapGroupId}
 */
let getGroupedLocationInfo = function(mapName) {
	if (!mapName) { mapName = _currentLocationName; }

	let groupedItemLocationInfo = {};
	Data.getAllItemLocations(mapName).forEach(function(itemLocation) {
		if (itemLocation.disabled) { return; }
		
		if (!groupedItemLocationInfo[itemLocation.ItemGroup]) {
			groupedItemLocationInfo[itemLocation.ItemGroup] = [];
		}
		groupedItemLocationInfo[itemLocation.ItemGroup].push(itemLocation);
	});
	return groupedItemLocationInfo;
};

/**
 * Sets up the item group divs - includes the functionality for expanding/collapsing
 */
let _setUpItemGroups = function(groupedItemLocationInfo, mapInfo) {
	let mainContainer = document.getElementById("itemLocationsContainer");
	mainContainer.innerHTML = ""; // Clean this up first so we don't get duplicates

	let isShuffled = Data.getDoesEntranceShuffleApply(_currentLocationName, true);
	let isDungeon = mapInfo.MapGroup === MapGroups.DUNGEONS
	let isDungeonNotSelected = isShuffled && isDungeon && !_setUpDungeonSelections();
	
	if (isDungeonNotSelected) {
		let noDungeonSelectedDiv = dce("div", "no-dungeon-selected");
		noDungeonSelectedDiv.innerText = "Unknown dungeon location - please select which dungeon this entrance leads to.";
		mainContainer.appendChild(noDungeonSelectedDiv);
	} 
	else if (Settings.RandomizerSettings.shuffleOverworldEntrances && !isDungeon) {
		let travelDiv = dce("div");
		travelDiv.id = "travelDiv";
		mainContainer.appendChild(travelDiv);
	} 
	
	if (isDungeon && !isDungeonNotSelected && Settings.TrackerSettings.dungeonItemDisplay === DungeonItemDisplaySettings.BY_SUGGESTED_ORDER) {
		let allLocations = [];
		Object.keys(groupedItemLocationInfo).forEach(function(groupId) {
			if (groupedItemLocationInfo[groupId]) {
				groupedItemLocationInfo[groupId].forEach(function(itemLocation) {
					allLocations.push(itemLocation);
				});
			}
		});
		
		allLocations.sort((loc1, loc2) => (loc1.Order > loc2.Order) ? 1 : -1);
		let dungeonName = (isDungeon && isShuffled) ? MapLocations[_currentLocationName].ShuffledDungeon : _currentLocationName;
		if (dungeonName === "Spirit Temple") {
			let useAltOrder = mapInfo.IsMasterQuest ?
				(Equipment.STRENGTH.currentUpgrade > 1 && Items.BOMBCHU.playerHas && Items.HOOKSHOT.playerHas) : //TODO: is longshot needed instead?
				(Equipment.STRENGTH.currentUpgrade > 1 && Keys.SPIRIT_TEMPLE.keyCount > 0);
			if (useAltOrder) {
				allLocations.sort((loc1, loc2) => (loc1.AltOrder > loc2.AltOrder) ? 1 : -1);
			}
		}
		
		let allItemLocationsDiv = dce("div", "item-group");
		allItemLocationsDiv.onclick = _toggleItemLocations.bind(this, allItemLocationsDiv);
		
		let allItemLocationsTitleDiv = dce("div", "item-group-title");
		allItemLocationsDiv.appendChild(allItemLocationsTitleDiv);
		
		let allItemLocationsImageDiv = dce("div", "item-group-image");
		allItemLocationsImageDiv.style.backgroundImage = getItemGroupImagePath(ItemGroups.CHEST);
		allItemLocationsTitleDiv.appendChild(allItemLocationsImageDiv);
		
		let allItemLocationsTextDiv = dce("div", "item-group-text");
		allItemLocationsTextDiv.innerText = "Ordered Item Locations";
		allItemLocationsTitleDiv.appendChild(allItemLocationsTextDiv);
		
		_createItemLocations(allLocations, allItemLocationsDiv, true, isDungeon);
		mainContainer.appendChild(allItemLocationsDiv);
	}
	else if (!isShuffled || (isDungeon && !isDungeonNotSelected) || !isDungeon) {
		Object.keys(groupedItemLocationInfo).forEach(function(groupId) {
			let itemGroup = groupedItemLocationInfo[groupId]
			let itemGroupDiv = dce("div", "item-group");
			itemGroupDiv.onclick = _toggleItemLocations.bind(this, itemGroupDiv);
			mainContainer.appendChild(itemGroupDiv);
			
			let itemGroupTitleDiv = dce("div", "item-group-title");
			itemGroupDiv.appendChild(itemGroupTitleDiv);
			
			let itemGroupImageDiv = dce("div", "item-group-image");
			itemGroupImageDiv.style.backgroundImage = getItemGroupImagePath(groupId);
			itemGroupTitleDiv.appendChild(itemGroupImageDiv);
			
			let itemGroupTextDiv = dce("div", "item-group-text");
			let itemGroupName = getItemGroupName(groupId);
			if (itemGroupName) {
				itemGroupTextDiv.innerText = itemGroupName
				itemGroupTitleDiv.appendChild(itemGroupTextDiv);
				_createItemLocations(itemGroup, itemGroupDiv, undefined, isDungeon);
			}
		});
	}
};

/**
 * Sets up the dungeon selections for when the dungeon entrances are being shuffled
 * @param mapInfo - the current map's object from one of the map data files
 * @return - true if the dungeon has a selection currently (or if it doesn't apply); false if it doesn't
 */
let _setUpDungeonSelections = function() {
	let mapInfo = MapLocations[_currentLocationName];
	let returnValue = false;
	let mainContainer = document.getElementById("itemLocationsContainer");
	let dungeonNames = [
		"Deku Tree", "Dodongo's Cavern", "Jabu Jabu's Belly", 
		"Forest Temple", "Fire Temple", "Water Temple", "Shadow Temple", "Spirit Temple", 
		"Ice Cavern", "Bottom of the Well", "Training Grounds"
	];
	let dungeonIconContainer = dce("div", "dungeon-group");
	dungeonIconContainer.id = "dungeonIconContainer";
	dungeonNames.forEach(function(dungeonName) {
		let dungeonIcon = dce("div", "dungeon-icon");
		dungeonIcon.style.backgroundImage = `url("Images/Dungeons/${dungeonName}.png")`;
		dungeonIcon.title = dungeonName;
		
		if (mapInfo.ShuffledDungeon === dungeonName) {
			returnValue = true;
			addCssClass(dungeonIcon, "dungeon-selected");
		}
		
		dungeonIcon.onclick = function(event) {
			event.stopPropagation();
			
			let clearMap = false;
			if (mapInfo.ShuffledDungeon === dungeonName) {
				clearMap = true;
				delete mapInfo.ShuffledDungeon;
				delete StandardDungeons[_currentLocationName].ShuffledDungeon;
				delete MQDungeons[_currentLocationName].ShuffledDungeon;
			} else {
				mapInfo.ShuffledDungeon = dungeonName;
				StandardDungeons[_currentLocationName].ShuffledDungeon = dungeonName;
				MQDungeons[_currentLocationName].ShuffledDungeon = dungeonName;
			}
			displayLocation(_currentLocationName);
			
			SocketClient.dungeonShuffleUpdated(_currentLocationName, clearMap ? null : dungeonName);
			refreshAll();
			
			if (clearMap) { 
				MapUI.clearMap(); 
			}
		};
		dungeonIconContainer.appendChild(dungeonIcon);
	});
	mainContainer.appendChild(dungeonIconContainer);
	return returnValue;
}

/**
 * Toggles the item locations
 * @param itemGroupDiv - the div to toggle the locations of
 */
let _toggleItemLocations = function(itemGroupDiv, event) {
	var children = itemGroupDiv.children;
	for (let i = 1; i < children.length; i++) { // Ignore the first element - they aren't item locations
		toggleCssClass(children[i], "nodisp");
	}

	event.stopPropagation();
};

/**
 * Creates the item locations
 * @param itemGroup - the data for the locations
 * @param itemGroupDiv - the div for the locations
 * @param includeGroupIcon - whether to include the group icon; used for ordered locations
 */
let _createItemLocations = function(itemGroup, itemGroupDiv, includeGroupIcon, isDungeon) {
	let allItemsObtained = itemGroup.every(loc => loc.playerHas);
	itemGroup.forEach(function(itemLocation) {
		if (itemLocation.disabled || itemLocation.Hide) { return; }
		
		let itemLocationDiv = dce("div", "item-location");
		
		if (itemLocation.ItemGroup !== ItemGroups.OW_ENTRANCE) {
			itemLocationDiv.onclick = _toggleItemObtained.bind(this, itemLocationDiv, itemLocation);
		} else {
			itemLocationDiv.onclick = function(event) {
				event.stopPropagation();
			}
		}
		
		itemLocationDiv.id = itemLocation.Name;
		itemLocationDiv.onmouseover = function() {
			MapUI.highlightIcon(itemLocation.Name.trim());
		}
		itemLocationDiv.onmouseout = function() {
			MapUI.removeHighlightFromIcons();
		}
		itemGroupDiv.appendChild(itemLocationDiv);
		
		if (allItemsObtained) {
			addCssClass(itemLocationDiv, "nodisp");
		}

		let itemLocationTitleDiv = dce("div", "item-location-title");
		itemLocationDiv.appendChild(itemLocationTitleDiv);

		let itemLocationAgeIconDiv = dce("div", "item-location-age-icon");
		itemLocationAgeIconDiv.id = `${itemLocation.Name}-age-icon`;
		itemLocationAgeIconDiv.style.backgroundImage = Data.getAgeImagePath(itemLocation);
		itemLocationTitleDiv.appendChild(itemLocationAgeIconDiv);
		
		if (includeGroupIcon) {
			let itemLocationIconDiv = dce("div", "item-location-group-icon");
			itemLocationIconDiv.style.backgroundImage = getItemGroupImagePath(itemLocation.ItemGroup);
			itemLocationTitleDiv.appendChild(itemLocationIconDiv);
		}

		let itemLocationTextDiv = dce("div", "item-location-text");
		itemLocationTextDiv.innerText = itemLocation.Name;
		itemLocationTitleDiv.appendChild(itemLocationTextDiv);

		// Update the entrance location groups
		if (itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
			let itemLocationEntranceTasksContainer = dce("div", "item-location-entrance-task-container");
			itemLocationEntranceTasksContainer.id = `${itemLocation.Name}-entrance-tasks`;
			itemLocationTitleDiv.appendChild(itemLocationEntranceTasksContainer);
			
			let entranceGroupDiv = EntranceUI.createEntranceGroupDiv(itemLocation, itemLocationEntranceTasksContainer);
			let groupSelectedAndCompleted = itemLocation.EntranceGroup && 
				Object.keys(itemLocation.EntranceGroup.completed).length >= itemLocation.EntranceGroup.totalNumberOfTasks;
			if (itemLocation.playerHas || groupSelectedAndCompleted) {
				addCssClass(entranceGroupDiv, "nodisp");
			}
			itemLocationDiv.appendChild(entranceGroupDiv);
		}
		
		else if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
			let owEntranceGroupDiv = dce("div");
			
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
			
			owEntranceGroupDiv.appendChild(locDropdown);
			owEntranceGroupDiv.appendChild(entranceDropdown);
			itemLocationDiv.appendChild(owEntranceGroupDiv);

			refreshEntranceDropdowns(itemLocation);
		}
		
		let inlineNotesDiv = dce("div", "item-location-inline-notes");
		inlineNotesDiv.id = `${itemLocation.Name}-inline-notes`;
		itemLocationTitleDiv.appendChild(inlineNotesDiv);
		
		let mapFloor = itemLocation.MapInfo ? itemLocation.MapInfo.floor : undefined;
		let locationIconsDiv = _createLocationIconsDiv(itemLocationDiv, itemLocation, mapFloor, isDungeon);
		itemLocationTitleDiv.appendChild(locationIconsDiv);
		
		let moreInfoDiv = _createMoreInfoDiv(itemLocation, itemLocationDiv);
		itemLocationDiv.appendChild(moreInfoDiv);
		
		_refreshNotes(itemLocation, inlineNotesDiv, moreInfoDiv);
	});
};

/**
 * Refreshes the entrance dropdowns so that they contain the correct text/choices/click handlers
 */
let refreshEntranceDropdowns = function(itemLocation) {
	if (itemLocation.ItemGroup !== ItemGroups.OW_ENTRANCE) { return; }

	let locDropdown = document.getElementById(`${itemLocation.Name}-location-dropdown`);
	let entranceDropdown = document.getElementById(`${itemLocation.Name}-entrance-dropdown`);

	let defaultMap = itemLocation.OwShuffleMap;
	let defaultExit = itemLocation.OwShuffleExitName;

	let options = Data.getOWMaps();
	options.unshift("<no selection>");
	_fillStringDropdown(locDropdown, options, defaultMap);

	if (defaultMap && defaultExit) {
		let entrances = Data.getOWEntrances(defaultMap);
		_fillStringDropdown(entranceDropdown, entrances, defaultExit);
	}

	locDropdown.onchange = function() {
		entranceDropdown.innerHTML = "";
		
		let mapName = locDropdown.options[locDropdown.selectedIndex].value;
		let entrances = null;
		if (mapName !== "<no selection>") {
			entrances = Data.getOWEntrances(mapName);
			_fillStringDropdown(entranceDropdown, entrances);
		}
		
		let entrance = entrances && entrances[0];

		Data.setOWLocationFound(_currentLocationName, itemLocation, mapName, entrance, !entrances);
		refreshAll();
		
		SocketClient.itemLocationUpdated(itemLocation)
	};
	
	entranceDropdown.onchange = function() {
		let mapName = locDropdown.options[locDropdown.selectedIndex].value;
		let entrance = entranceDropdown.options[entranceDropdown.selectedIndex].value;
		Data.setOWLocationFound(_currentLocationName, itemLocation, mapName, entrance);
		refreshAll();

		SocketClient.itemLocationUpdated(itemLocation)
	};
};

/**
 * Refreshes the inline notes div
 */
let _refreshNotes = function(itemLocation, notesDiv, moreInfoDiv) {
	inlineNotesDiv = notesDiv || document.getElementById(`${itemLocation.Name}-inline-notes`);
	if (inlineNotesDiv) {
		inlineNotesDiv.innerHTML = "";
		inlineNotesDiv.appendChild(NotesPage.createNoteDiv(itemLocation));	
	}
	
	// If the div currently has focus, don't update it - this will reset the player's notes if another player marks anything else
	let moreInfoNotesDiv = moreInfoDiv || document.getElementById(`${itemLocation.Name}-more-info-notes`);
	if (moreInfoNotesDiv && document.activeElement.type !== "textarea") {
		moreInfoNotesDiv.value = itemLocation.notes || "";
	}
};

let _fillStringDropdown = function(dropdown, options, defaultValue) {
	options.forEach(function(option) {
		let optionElement = dce("option");
		optionElement.value = option;
		optionElement.innerText = option;
		
		if (option === defaultValue) {
			optionElement.selected = "selected";
		}
		
		dropdown.appendChild(optionElement);
	});
};

/**
 * Creates the icons to display on each item display row
 * @param itemLocationDiv: The div to put the icons in
 */
let _createLocationIconsDiv = function(itemLocationDiv, itemLocation, floor, isDungeon) {
	let locationName = itemLocation.Name;
	let locationIconsDiv = dce("div", "item-locations-icon-container");
	
	// Cancel entrance group icon
	if (itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
		let cancelEntranceIcon = dce("div", "item-location-cancel-entrance-icon");
		cancelEntranceIcon.onclick = function(event) {
			event.stopPropagation();
			EntranceUI.clearGroupChoice(itemLocation);
		}
		locationIconsDiv.appendChild(cancelEntranceIcon);
	}
	
	// Walk Icon
	if (!isDungeon && Settings.RandomizerSettings.shuffleOverworldEntrances)
	{
		let walkIcon = dce("div", "item-location-walk-icon");
		walkIcon.onclick = function(event) {
			event.stopPropagation();
			if (Walk.currentLocation !== _currentLocationName || Walk.currentItemLocationName !== locationName) {
				Walk.currentLocation = _currentLocationName;
				Walk.currentItemLocationName = locationName;
				Walk.currentItemLocation = itemLocation;
			} else {
				let travelDiv = document.getElementById("travelDiv");
				if (travelDiv) { travelDiv.innerHTML = ""; }

				Walk.currentLocation = "";
				Walk.currentItemLocationName = "";
				Walk.currentItemLocation = null;
			}
						
			refreshAll();
		}
		
		locationIconsDiv.appendChild(walkIcon);
	}

	// Map Icon
	let mapIcon = dce("div", "item-location-map-icon");
	mapIcon.onclick = function(event) {
		event.stopPropagation();
		MapUI.jumpToIcon(locationName, floor);
	}
	locationIconsDiv.appendChild(mapIcon);

	// Expand button
	let itemLocationExpandIconDiv = dce("div", "item-location-expand-icon");
	itemLocationExpandIconDiv.id = `${locationName}-expand-icon`;
	itemLocationExpandIconDiv.onclick = _toggleMoreInfo.bind(this, itemLocationDiv, itemLocation, undefined);
	locationIconsDiv.appendChild(itemLocationExpandIconDiv);

	return locationIconsDiv;
};

/**
 * Creates the div containing the help text
 * @param itemLocation: the item location
 */
let _createMoreInfoDiv = function(itemLocation, itemLocationDiv) {
	let moreInfoDiv = dce("div", "item-more-info nodisp");
	moreInfoDiv.id = `${itemLocation.Name}-more-info`;
	moreInfoDiv.onclick = _toggleMoreInfo.bind(this, itemLocationDiv, itemLocation, undefined);

	let moreInfoTextDiv = dce("div", "item-more-info-text");
	moreInfoTextDiv.innerHTML = itemLocation.LongDescription;
	moreInfoDiv.appendChild(moreInfoTextDiv);

	moreInfoDiv.appendChild(_createNotesDiv(itemLocation, moreInfoDiv));
	return moreInfoDiv;
}

/**
 * Creates the notes div
 * @param itemLocation - the item location
 * @param parentDiv - optional - the div to attach this to
 */
let _createNotesDiv = function(itemLocation, parentDiv) {
	let moreInfoDiv = parentDiv || document.getElementById(`${itemLocation.Name}-more-info`);
	let moreInfoNotesDiv = dce("textarea");
	
	_setPlaceholderNotesText(itemLocation, moreInfoNotesDiv);
	
	moreInfoNotesDiv.id = `${itemLocation.Name}-more-info-notes`;
	moreInfoNotesDiv.onblur = function(event) {
		itemLocation.notes = moreInfoNotesDiv.value;
		_refreshNotes(itemLocation);

		let expandIconDiv = document.getElementById(`${itemLocation.Name}-expand-icon`);
		removeCssClass(expandIconDiv, "item-location-has-notes");
		if (itemLocation.notes && itemLocation.notes.length > 0) {
			addCssClass(expandIconDiv, "item-location-has-notes");
		}
		
		SocketClient.itemLocationUpdated(itemLocation);
		refreshAll();
	}
	moreInfoNotesDiv.onclick = function(event) { 
		event.stopPropagation();
	}

	if (itemLocation.notes) {
		moreInfoNotesDiv.value = itemLocation.notes;
	}
	
	return moreInfoNotesDiv;
};

/**
 * Sets the placeholder text for the notes div of the given itemLocation
 * @param itemLocation - the item location
 */
let _setPlaceholderNotesText = function(itemLocation, moreInfoNotesDiv) {
	if (!moreInfoNotesDiv) {
		moreInfoNotesDiv = document.getElementById(`${itemLocation.Name}-more-info-notes`);
	}
	
	let isEntrance = itemLocation.ItemGroup === ItemGroups.ENTRANCE && itemLocation.EntranceGroup;
	
	if (itemLocation.ItemGroup === ItemGroups.SHOP || (isEntrance && itemLocation.EntranceGroup.isShop)) {
		moreInfoNotesDiv.placeholder = "[price1] <item1> [//comment1]; [price2] <item2> [//comment2]; ...";
	} else if (itemLocation.ItemGroup === ItemGroups.GOSSIP_STONE || (isEntrance && itemLocation.EntranceGroup.hasGossipStone)) {
		moreInfoNotesDiv.placeholder = "They say that...";
	} else {
		moreInfoNotesDiv.placeholder = "Notes go here!";
	}
};

/**
 * Toggles the item as obtained not not
 * @param itemLocation - the data for the item
 */
let _toggleItemObtained = function(itemLocationDiv, itemLocation, event) {
	if (event) { event.stopPropagation() };
	
	let playerHasItem = Data.toggleItemObtained(itemLocation);
	removeCssClass(itemLocationDiv, "item-obtained");

	if (playerHasItem) {
		addCssClass(itemLocationDiv, "item-obtained");
	}

	if (itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
		let entranceGroupId = `${itemLocation.Name}-entrance-groups`;
		let entranceGroupDiv = document.getElementById(entranceGroupId);
		if (entranceGroupDiv) {
			addOrRemoveCssClass(entranceGroupDiv, "nodisp", playerHasItem);
		}
	}

	SocketClient.itemLocationUpdated(itemLocation);
	refreshAll();
};

/**
 * Toggles the more info div
 * @param itemLocationDiv - the div the more info div is under
 * @param itemLocation - the item location info
 * @param forceOn - true to force the div on; false to force it off; undefined to toggle
 */
let _toggleMoreInfo = function(itemLocationDiv, itemLocation, forceOn, event) {
	if (event) { event.stopPropagation() };
	_setPlaceholderNotesText(itemLocation);
	
	let hideClass = false;
	if (forceOn === undefined) {
		hideClass = toggleCssClass(itemLocationDiv.lastChild, "nodisp");
	} else {
		addOrRemoveCssClass(itemLocationDiv.lastChild, "nodisp", !forceOn);
		hideClass = !forceOn;
	}
	
	if (itemLocation.ItemGroup !== ItemGroups.ENTRANCE) { return; }
	let groupSelectedAndCompleted = itemLocation.EntranceGroup && EntranceUI.isGroupComplete(itemLocation);
	if (itemLocation.playerHas || groupSelectedAndCompleted) {
		if (hideClass) {
			addCssClass(itemLocationDiv.children[itemLocationDiv.children.length - 2], "nodisp");
		} else {
			removeCssClass(itemLocationDiv.children[itemLocationDiv.children.length - 2], "nodisp");
		}
	}
};