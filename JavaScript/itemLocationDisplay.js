let ItemLocationDisplay = {
	currentLocationName: "", 

	/**
	 * Sets the main display to the given location name
	 */
	displayLocation: function(locationName) {
		LocationSidebar.displayContainer("rightContainer");

		LocationSidebar.updateSelectedLocation(locationName);
		if (!LocationSidebar.isLocationAMap(locationName)) { return; }
		this.currentLocationName = locationName;
		
		let mapInfo = MapLocations[locationName];
		let groupedItemLocationInfo = this.getGroupedLocationInfo(this.currentLocationName);
		this._setUpItemGroups(groupedItemLocationInfo, mapInfo);
		this.updateItemDisplay();

		let floor;
		let startingFloorIndex = mapInfo.StartingFloorIndex;
		if (mapInfo.Floors && startingFloorIndex >= 0 && 
			mapInfo.Floors.length - 1 >= startingFloorIndex) {
			floor = mapInfo.Floors[mapInfo.StartingFloorIndex];
		}
		
		MapUI.setMap(locationName, floor);
	},

	/**
	 * Gets the location information keyed by the item group number - this returns a result like:
	 *  result[itemGroup] = {itemLocations: [Array of item locations], mapGroup: mapGroupId}
	 */
	getGroupedLocationInfo: function(mapName) {
		if (!mapName) { mapName = this.currentLocationName; }

		let groupedItemLocationInfo = {};
		let mapInfo = MapLocations[mapName];

		let needToSortDungeon = mapInfo.MapGroup === MapGroups.DUNGEONS &&
			Settings.TrackerSettings.dungeonItemDisplay === DungeonItemDisplaySettings.BY_SUGGESTED_ORDER;
		let useDisplayGroups = mapInfo.UsesDisplayGroups;
		Data.getAllItemLocations(mapName).forEach(function(itemLocation) {
			let group = (useDisplayGroups || needToSortDungeon)
				? (itemLocation.DisplayGroup || "Item Locations")
				: (itemLocation.OverrideItemGroup || itemLocation.ItemGroup);
			
			if (!groupedItemLocationInfo[group]) {
				groupedItemLocationInfo[group] = [];
			}
			groupedItemLocationInfo[group].push(itemLocation);
		});

		if (needToSortDungeon || useDisplayGroups) {
			Object.values(groupedItemLocationInfo).forEach(groupedItemLocations => {
				if (mapInfo.UseAltOrder && mapInfo.UseAltOrder()) {
					groupedItemLocations.sort((loc1, loc2) => (loc1.AltOrder > loc2.AltOrder) ? 1 : -1);
				} else {
					groupedItemLocations.sort((loc1, loc2) => {
						if (!loc1.Order && !loc2.Order) {
							return 1;
						}
						return (loc1.Order > loc2.Order) ? 1 : -1
					});
				}
			});
		}

		return groupedItemLocationInfo;
	},

	/**
	 * Marks the current display with the items that are currently blocked or might be obtainable
	 * Also marks the items that are currently completed
	 */
	updateItemDisplay: function() {
		if (!LocationSidebar.isLocationAMap()) { return; }

		let _this = this;
		let itemLocations = Data.getAllItemLocations(this.currentLocationName);
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
				moreInfoDiv.appendChild(_this._createNotesDiv(itemLocation));
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
			if (Walk.currentLocation === _this.currentLocationName && Walk.currentItemLocationName === itemLocation.Name) {
				addCssClass(textDiv, "item-location-walking-to");
			} else {
				removeCssClass(textDiv, "item-location-walking-to");
			}
		});
	},

	/**
	 * Refreshes the inline notes div
	 */
	refreshNotes: function(itemLocation, notesDiv, moreInfoDiv) {
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
	},

	/**
	 * Sets up the item group divs - includes the functionality for expanding/collapsing
	 */
	_setUpItemGroups: function(groupedItemLocationInfo, mapInfo) {
		let mainContainer = document.getElementById("itemLocationsContainer");
		mainContainer.innerHTML = ""; // Clean this up first so we don't get duplicates

		let travelDiv = dce("div");
		travelDiv.id = "travelDiv";
		mainContainer.appendChild(travelDiv);

		let _this = this;
		Object.keys(groupedItemLocationInfo).forEach(function(groupId) {
			let isSortedDungeon = mapInfo.MapGroup === MapGroups.DUNGEONS &&
				Settings.TrackerSettings.dungeonItemDisplay === DungeonItemDisplaySettings.BY_SUGGESTED_ORDER;
			let usesDisplayGroups = isSortedDungeon || mapInfo.UsesDisplayGroups;

			let itemGroup = groupedItemLocationInfo[groupId]
			let itemGroupDiv = dce("div", "item-group");
			mainContainer.appendChild(itemGroupDiv);
			
			let itemGroupTitleDiv = dce("div", "item-group-title");
			itemGroupTitleDiv.onclick = _this._toggleItemLocations.bind(_this, itemGroupDiv);
			itemGroupDiv.appendChild(itemGroupTitleDiv);
			
			let itemGroupImageDiv = dce("div", "item-group-image");
			itemGroupImageDiv.style.backgroundImage = usesDisplayGroups
				? getItemGroupImageFromName(groupId)
				: getItemGroupImagePath(groupId);
			itemGroupTitleDiv.appendChild(itemGroupImageDiv);
			
			let itemGroupTextDiv = dce("div", "item-group-text");

			let itemGroupName = usesDisplayGroups ? groupId : getItemGroupName(groupId);
			if (itemGroupName) {
				itemGroupTextDiv.innerText = itemGroupName
				itemGroupTitleDiv.appendChild(itemGroupTextDiv);
				_this._createItemLocations(itemGroup, itemGroupDiv, usesDisplayGroups, itemGroupName);
			}
		});
	},

	/**
	 * Creates the item locations
	 * @param itemGroup - the data for the locations
	 * @param itemGroupDiv - the div for the locations
	 * @param includeGroupIcon - whether to include the group icon; used for ordered locations
	 */
	_createItemLocations: function(itemGroup, itemGroupDiv, includeGroupIcon, itemGroupName) {
		let allItemsObtained = itemGroup.every(loc => loc.playerHas);
		
		if (itemGroup.every(loc => loc.disabled || loc.Hide)) {
			addCssClass(itemGroupDiv, "nodisp");
			return;
		}

		let _this = this;
		let owTextDivs = {};
		itemGroup.forEach(function(itemLocation) {
			if (itemLocation.disabled || itemLocation.Hide) { return; }
			
			let itemLocationDiv = dce("div", "item-location");
			let isOwEntrance = false;

			let itemLocationTitleDiv = dce("div", "item-location-title");
			itemLocationDiv.appendChild(itemLocationTitleDiv);
			
			if (itemLocation.ItemGroup !== ItemGroups.OW_ENTRANCE) {
				itemLocationTitleDiv.onclick = _this.toggleItemObtained.bind(_this, itemLocationDiv, itemLocation);
			} else {
				isOwEntrance = true;
				itemLocationTitleDiv.onclick = function(event) {
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

			let itemLocationAgeIconDiv = dce("div", "item-location-age-icon");
			itemLocationAgeIconDiv.id = `${itemLocation.Name}-age-icon`;
			itemLocationAgeIconDiv.style.backgroundImage = Data.getAgeImagePath(itemLocation);
			itemLocationTitleDiv.appendChild(itemLocationAgeIconDiv);

			let itemLocationTimeIconDiv = dce("div", "item-location-time-icon");
			itemLocationTimeIconDiv.id = `${itemLocation.Name}-time-icon`;
			itemLocationTimeIconDiv.style.backgroundImage = Data.getTimeImagePath(itemLocation);
			itemLocationTitleDiv.appendChild(itemLocationTimeIconDiv);
			
			if (includeGroupIcon) {
				let imagePath = getItemLocationGroupIcon(itemLocation);

				let itemLocationIconDiv = dce("div", "item-location-group-icon");
				itemLocationIconDiv.style.backgroundImage = imagePath;
				itemLocationTitleDiv.appendChild(itemLocationIconDiv);
			}

			let itemLocationTextDiv = dce("div", "item-location-text");
			itemLocationTextDiv.innerText = itemLocation.Name;
			itemLocationTitleDiv.appendChild(itemLocationTextDiv);

			// Collect the ow divs in arrays of groups so we can adjust widths later
			if (isOwEntrance) {
				owTextDivs[itemGroupName] = owTextDivs[itemGroupName] || []
				owTextDivs[itemGroupName].push(itemLocationTextDiv);
			}

			// Update the entrance location groups
			if (itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
				let itemLocationEntranceTasksContainer = dce("div", "item-location-entrance-task-container");
				itemLocationEntranceTasksContainer.id = `${itemLocation.Name}-entrance-tasks`;
				itemLocationTitleDiv.appendChild(itemLocationEntranceTasksContainer);
				
				if (itemLocation.IsItemLocationGroup) {
					let entranceGroupDiv = EntranceUI.createEntranceGroupDiv(itemLocation, itemLocationEntranceTasksContainer);
					let group = Data.getEntranceGroup(itemLocation);
					let groupSelectedAndCompleted = group && EntranceUI.isGroupComplete(itemLocation);
					if (itemLocation.playerHas || groupSelectedAndCompleted) {
						addCssClass(entranceGroupDiv, "nodisp");
					}
					itemLocationDiv.appendChild(entranceGroupDiv);
				} else {
					let dropdownGroup = DropdownUI.createInteriorOrGrottoDropdown(itemLocation, itemLocationTextDiv);
					itemLocationTitleDiv.insertBefore(dropdownGroup, itemLocationTextDiv);

					DropdownUI.refreshEntranceDropdowns(itemLocation);
				}
			}

			let inlineNotesDiv = dce("div", "item-location-inline-notes");
			inlineNotesDiv.id = `${itemLocation.Name}-inline-notes`;
			itemLocationTitleDiv.appendChild(inlineNotesDiv);
			
			if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
				let dropdownGroup = DropdownUI.createOWDropdown(itemLocation, itemLocationTextDiv);
					itemLocationTitleDiv.insertBefore(dropdownGroup, inlineNotesDiv);

				DropdownUI.refreshEntranceDropdowns(itemLocation);
			}
			
			let mapFloor = itemLocation.MapInfo ? itemLocation.MapInfo.floor : undefined;
			let locationIconsDiv = _this._createLocationIconsDiv(itemLocationDiv, itemLocation, mapFloor);
			itemLocationTitleDiv.appendChild(locationIconsDiv);
			
			let moreInfoDiv = _this._createMoreInfoDiv(itemLocation, itemLocationDiv);
			itemLocationDiv.appendChild(moreInfoDiv);
			
			_this.refreshNotes(itemLocation, inlineNotesDiv, moreInfoDiv);
		});

		// Size the OW elements so the dropdowns align
		Object.values(owTextDivs).forEach(groupedDivs => {
			let maxWidth = Math.max(...groupedDivs.map(div => div.getBoundingClientRect().width));
			groupedDivs.forEach(element => {
				element.style.width = `${maxWidth}px`;
			});
		});
	},

	/**
	 * Creates the icons to display on each item display row
	 * This includes the walk icon, the map icon, and the expand button
	 * @param itemLocationDiv: The div to put the icons in
	 */
	_createLocationIconsDiv: function(itemLocationDiv, itemLocation, floor) {
		let locationName = itemLocation.Name;
		let locationIconsDiv = dce("div", "item-locations-icon-container");
		
		// Walk Icon
		let walkIcon = dce("div", "item-location-walk-icon");
		walkIcon.onclick = function(event) {
			event.stopPropagation();
			if (Walk.currentLocation !== this.currentLocationName || Walk.currentItemLocationName !== locationName) {
				Walk.currentLocation = this.currentLocationName;
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
		}.bind(this);
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
		itemLocationExpandIconDiv.onclick = this.toggleMoreInfo.bind(this, itemLocationDiv, itemLocation, undefined);
		locationIconsDiv.appendChild(itemLocationExpandIconDiv);

		return locationIconsDiv;
	},

	/**
	 * Creates the div containing the help text
	 * @param itemLocation: the item location
	 */
	_createMoreInfoDiv: function(itemLocation, itemLocationDiv) {
		let moreInfoDiv = dce("div", "item-more-info nodisp");
		moreInfoDiv.id = `${itemLocation.Name}-more-info`;

		let moreInfoTextDiv = dce("div", "item-more-info-text");
		moreInfoTextDiv.innerHTML = itemLocation.LongDescription;
		moreInfoDiv.appendChild(moreInfoTextDiv);

		moreInfoDiv.appendChild(this._createNotesDiv(itemLocation));
		return moreInfoDiv;
	},

	/**
	 * Creates the notes div
	 * @param itemLocation - the item location
	 */
	_createNotesDiv: function(itemLocation) {
		let moreInfoNotesDiv = dce("textarea");
		
		this._setPlaceholderNotesText(itemLocation, moreInfoNotesDiv);
		
		moreInfoNotesDiv.id = `${itemLocation.Name}-more-info-notes`;
		moreInfoNotesDiv.onblur = function() {
			itemLocation.notes = moreInfoNotesDiv.value;
			ItemLocationDisplay.refreshNotes(itemLocation);

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
	},

	/**
	 * Sets the placeholder text for the notes div of the given itemLocation
	 * @param itemLocation - the item location
	 */
	_setPlaceholderNotesText: function(itemLocation, moreInfoNotesDiv) {
		if (!moreInfoNotesDiv) {
			moreInfoNotesDiv = document.getElementById(`${itemLocation.Name}-more-info-notes`);
		}
		
		if (Data.isItemLocationAShop(itemLocation)) {
			moreInfoNotesDiv.placeholder = "[price1] <item1> [//comment1]; [price2] <item2> [//comment2]; ...";
		} else if (Data.isItemLocationAGossipStone(itemLocation)) {
			moreInfoNotesDiv.placeholder = "They say that...";
		} else {
			moreInfoNotesDiv.placeholder = "Notes go here!";
		}
	},

	/**
	 * Toggles the item as obtained or not
	 * Reject OW_ENTRANCE items, as you can't obtain them!
	 * @param itemLocation - the data for the item
	 */
	toggleItemObtained: function(itemLocationDiv, itemLocation, event) {
		if (event) { event.stopPropagation(); }
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
	},

	/**
	 * Toggles the more info div
	 * @param itemLocationDiv - the div the more info div is under
	 * @param itemLocation - the item location info
	 * @param forceOn - true to force the div on; false to force it off; undefined to toggle
	 */
	toggleMoreInfo: function(itemLocationDiv, itemLocation, forceOn, event) {
		if (event) { event.stopPropagation() };
		this._setPlaceholderNotesText(itemLocation);
		
		let hideClass = false;
		if (forceOn === undefined) {
			hideClass = toggleCssClass(itemLocationDiv.lastChild, "nodisp");
		} else {
			addOrRemoveCssClass(itemLocationDiv.lastChild, "nodisp", !forceOn);
			hideClass = !forceOn;
		}
	},

	/**
	 * Toggles the item locations
	 * @param itemGroupDiv - the div to toggle the locations of
	 */
	_toggleItemLocations: function(itemGroupDiv, event) {
		var children = itemGroupDiv.children;
		for (let i = 1; i < children.length; i++) { // Ignore the first element - they aren't item locations
			toggleCssClass(children[i], "nodisp");
		}

		event.stopPropagation();
	}
};