let _currentLocationName = "";

/**
 * Sets the main display to the given location name
 */
let displayLocation = function(locationName) {
	LocationSidebar.displayContainer("rightContainer");

	LocationSidebar.updateSelectedLocation(locationName);
	if (!LocationSidebar.isLocationAMap(locationName)) { return; }
	_currentLocationName = locationName;
	
	let mapInfo = MapLocations[locationName];
	let mapNameToGetInfoFor = _currentLocationName;

	let groupedItemLocationInfo = getGroupedLocationInfo(mapNameToGetInfoFor);
	_setUpItemGroups(groupedItemLocationInfo, mapInfo);
	updateItemDisplay();

	let floor;
	let startingFloorIndex = mapInfo.StartingFloorIndex;
	if (mapInfo.Floors && startingFloorIndex >= 0 && 
		mapInfo.Floors.length - 1 >= startingFloorIndex) {
		floor = mapInfo.Floors[mapInfo.StartingFloorIndex];
	}
	
	MapUI.setMap(locationName, groupedItemLocationInfo, floor);
};

/**
 * Marks the current display with the items that are currently blocked or might be obtainable
 * Also marks the items that are currently completed
 */
let updateItemDisplay = function() {
	if (!LocationSidebar.isLocationAMap()) { return; }

	let itemLocations = Data.getAllItemLocations(_currentLocationName);
	itemLocations.forEach(function(itemLocation) {
		let canGetAsChild = Data.getItemObtainability(itemLocation, Age.CHILD);
		let canGetAsAdult = Data.getItemObtainability(itemLocation, Age.ADULT);
		let textDiv = document.getElementById(itemLocation.Name);
		let ageIconDiv = document.getElementById(`${itemLocation.Name}-age-icon`);
		let expandIconDiv = document.getElementById(`${itemLocation.Name}-expand-icon`);

		if (!ageIconDiv) { return; } // Means that this item isn't being displayed

		removeCssClass(textDiv, "item-cannot-obtain");
		if (!canGetAsChild && !canGetAsAdult) {
			addCssClass(textDiv, "item-cannot-obtain");
		}

		removeCssClass(textDiv, "item-entrance-known");
		if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE && 
			itemLocation.OwShuffleMap && 
			itemLocation.OwShuffleRegion &&
			itemLocation.OwShuffleExitName) {
			addCssClass(textDiv, "item-entrance-known");
		}
		
		let entranceGroup = Data.getEntranceGroup(itemLocation);
		if (entranceGroup) {
			let cannotGetEntranceItem = 
				EntranceUI.getNumberOfCompletableTasks(itemLocation, Age.CHILD) === 0 &&
				EntranceUI.getNumberOfCompletableTasks(itemLocation, Age.ADULT) === 0;

			if (cannotGetEntranceItem) {
				if (itemLocation.IsItemLocationGroup) {
					addCssClass(textDiv, "item-cannot-obtain");
				} else {
					addCssClass(textDiv, "item-entrance-known");
				}
			}
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
		} else if (Data.useSpecificAge(itemLocation, Age.ADULT)) {
			ageIconDiv.style.backgroundImage = 'url("Images/Adult Icon.png")';
		} else if (Data.useSpecificAge(itemLocation, Age.CHILD)) {
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

		// Update the time icon
		let itemLocationTimeIconDiv = document.getElementById(`${itemLocation.Name}-time-icon`);
		if (itemLocationTimeIconDiv) {
			itemLocationTimeIconDiv.style.backgroundImage = Data.getTimeImagePath(itemLocation);
		}
		
		// Update the entrance buttons
		if (entranceGroup) {
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

		let group = itemLocation.OverrideItemGroup !== undefined 
			? itemLocation.OverrideItemGroup 
			: itemLocation.ItemGroup;
		
		if (!groupedItemLocationInfo[group]) {
			groupedItemLocationInfo[group] = [];
		}
		groupedItemLocationInfo[group].push(itemLocation);
	});
	return groupedItemLocationInfo;
};

/**
 * Sets up the item group divs - includes the functionality for expanding/collapsing
 */
let _setUpItemGroups = function(groupedItemLocationInfo, mapInfo) {
	let mainContainer = document.getElementById("itemLocationsContainer");
	mainContainer.innerHTML = ""; // Clean this up first so we don't get duplicates

	let travelDiv = dce("div");
	travelDiv.id = "travelDiv";
	mainContainer.appendChild(travelDiv);
	
	let isDungeon = mapInfo.MapGroup === MapGroups.DUNGEONS;
	if (isDungeon && Settings.TrackerSettings.dungeonItemDisplay === DungeonItemDisplaySettings.BY_SUGGESTED_ORDER) {
		let allLocations = [];
		Object.keys(groupedItemLocationInfo).forEach(function(groupId) {
			if (groupedItemLocationInfo[groupId]) {
				groupedItemLocationInfo[groupId].forEach(function(itemLocation) {
					allLocations.push(itemLocation);
				});
			}
		});

		if (mapInfo.UseAltOrder && mapInfo.UseAltOrder()) {
			allLocations.sort((loc1, loc2) => (loc1.AltOrder > loc2.AltOrder) ? 1 : -1);
		} else {
			allLocations.sort((loc1, loc2) => (loc1.Order > loc2.Order) ? 1 : -1);
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
		
		mainContainer.appendChild(allItemLocationsDiv);
		_createItemLocations(allLocations, allItemLocationsDiv, true);
	} else {
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
				_createItemLocations(itemGroup, itemGroupDiv);
			}
		});
	}
};

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
let _createItemLocations = function(itemGroup, itemGroupDiv, includeGroupIcon) {
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

		let itemLocationTimeIconDiv = dce("div", "item-location-time-icon");
		itemLocationTimeIconDiv.id = `${itemLocation.Name}-time-icon`;
		itemLocationTimeIconDiv.style.backgroundImage = Data.getTimeImagePath(itemLocation);
		itemLocationTitleDiv.appendChild(itemLocationTimeIconDiv);
		
		if (includeGroupIcon) {
			let imagePath = "";
			if (itemLocation.IsItemLocationGroup && itemLocation.DefaultEntranceGroupName) {
				let groupName = itemLocation.DefaultEntranceGroupName;
				imagePath = EntranceUI.getEntranceGroupIcon(ItemLocationGroups[groupName], groupName);
			} else if (itemLocation.MapImageName) {
				imagePath = getItemGroupImageFromName(itemLocation.MapImageName);
			} else {
				let itemGroup = itemLocation.OverrideItemGroup
					? itemLocation.OverrideItemGroup
					: itemLocation.ItemGroup;
				imagePath = getItemGroupImagePath(itemGroup);
			}

			let itemLocationIconDiv = dce("div", "item-location-group-icon");
			itemLocationIconDiv.style.backgroundImage = imagePath;
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
			let group = Data.getEntranceGroup(itemLocation);
			let groupSelectedAndCompleted = group && Object.keys(group.completed).length >= group.totalNumberOfTasks;
			if (itemLocation.playerHas || groupSelectedAndCompleted) {
				addCssClass(entranceGroupDiv, "nodisp");
			}
			itemLocationDiv.appendChild(entranceGroupDiv);
		}
		
		else if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {

			let dropdownGroup = DropdownUI.createOWDropdown(itemLocation, itemLocationTextDiv);
			itemLocationDiv.appendChild(dropdownGroup);

			DropdownUI.refreshEntranceDropdowns(itemLocation);
		}
		
		let inlineNotesDiv = dce("div", "item-location-inline-notes");
		inlineNotesDiv.id = `${itemLocation.Name}-inline-notes`;
		itemLocationTitleDiv.appendChild(inlineNotesDiv);
		
		let mapFloor = itemLocation.MapInfo ? itemLocation.MapInfo.floor : undefined;
		let locationIconsDiv = _createLocationIconsDiv(itemLocationDiv, itemLocation, mapFloor);
		itemLocationTitleDiv.appendChild(locationIconsDiv);
		
		let moreInfoDiv = _createMoreInfoDiv(itemLocation, itemLocationDiv);
		itemLocationDiv.appendChild(moreInfoDiv);
		
		_refreshNotes(itemLocation, inlineNotesDiv, moreInfoDiv);
	});
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

/**
 * Creates the icons to display on each item display row
 * @param itemLocationDiv: The div to put the icons in
 */
let _createLocationIconsDiv = function(itemLocationDiv, itemLocation, floor) {
	let locationName = itemLocation.Name;
	let locationIconsDiv = dce("div", "item-locations-icon-container");
	
	// Cancel entrance group icon
	if (itemLocation.ItemGroup === ItemGroups.ENTRANCE && !Data.usesDefaultGroup(itemLocation)) {
		let cancelEntranceIcon = dce("div", "item-location-cancel-entrance-icon");
		cancelEntranceIcon.onclick = function(event) {
			event.stopPropagation();
			EntranceUI.clearGroupChoice(itemLocation);
		}
		locationIconsDiv.appendChild(cancelEntranceIcon);
	}
	
	// Walk Icon
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
	
	let group = Data.getEntranceGroup(itemLocation);
	let isEntrance = itemLocation.ItemGroup === ItemGroups.ENTRANCE && group;
	
	if (itemLocation.ItemGroup === ItemGroups.SHOP || (isEntrance && group.isShop)) {
		moreInfoNotesDiv.placeholder = "[price1] <item1> [//comment1]; [price2] <item2> [//comment2]; ...";
	} else if (itemLocation.ItemGroup === ItemGroups.GOSSIP_STONE || (isEntrance && group.hasGossipStone)) {
		moreInfoNotesDiv.placeholder = "They say that...";
	} else {
		moreInfoNotesDiv.placeholder = "Notes go here!";
	}
};

/**
 * Toggles the item as obtained or not
 * Reject OW_ENTRANCE items, as you can't obtain them!
 * @param itemLocation - the data for the item
 */
let _toggleItemObtained = function(itemLocationDiv, itemLocation, event) {
	if (event) { event.stopPropagation() };
	if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
		return;
	}
	
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

	let group = Data.getEntranceGroup(itemLocation);
	let groupSelectedAndCompleted = group && EntranceUI.isGroupComplete(itemLocation);
	if (itemLocation.playerHas || groupSelectedAndCompleted) {
		if (hideClass) {
			addCssClass(itemLocationDiv.children[itemLocationDiv.children.length - 2], "nodisp");
		} else {
			removeCssClass(itemLocationDiv.children[itemLocationDiv.children.length - 2], "nodisp");
		}
	}
};