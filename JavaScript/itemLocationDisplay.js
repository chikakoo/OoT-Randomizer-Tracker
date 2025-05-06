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
		
		let groupedItemLocationInfo = this.getGroupedLocationInfo(this.currentLocationName);
		this._setUpItemGroups(groupedItemLocationInfo);
		this.updateItemDisplay();
		
		let floor;
		let mapInfo = MapLocations[locationName];
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

		// Sort the locked doors to the end, unless we don't want them to be there
		let allItemLocations = Data.getAllItemLocations(mapName);
		let sortedItemLocations = allItemLocations.filter(loc => 
			loc.ItemGroup !== ItemGroups.LOCKED_DOOR || loc.KeepLockedDoorOrder);
		sortedItemLocations.push(...allItemLocations.filter(loc => 
			loc.ItemGroup === ItemGroups.LOCKED_DOOR && !loc.KeepLockedDoorOrder));

		sortedItemLocations.forEach(function(itemLocation) {
			let group = itemLocation.OverrideItemGroup || itemLocation.ItemGroup;
			let imageName = null;

			if (itemLocation.DisplayGroup) {
				group = itemLocation.DisplayGroup.groupName;
				imageName ??= itemLocation.DisplayGroup.imageName;
			} else {
				group = "Item Locations",
				imageName = "Chest"
			}
			
			if (!groupedItemLocationInfo[group]) {
				groupedItemLocationInfo[group] = {
					itemLocations: [],
					backgroundImage: getItemGroupImageFromName(imageName)
				};
			}

			if (!groupedItemLocationInfo[group].description && itemLocation.DisplayGroup?.description) {
				groupedItemLocationInfo[group].description = itemLocation.DisplayGroup.description;

				if (itemLocation.DisplayGroup.tricksToShow) {
					itemLocation.DisplayGroup.tricksToShow.forEach(trick => {
						groupedItemLocationInfo[group].tricks = groupedItemLocationInfo[group].tricks || {};
						groupedItemLocationInfo[group].tricks[trick.displayText] = trick;
					});
				}
			}

			groupedItemLocationInfo[group].itemLocations.push(itemLocation);
		});

		Object.values(groupedItemLocationInfo).forEach(groups => {
			groups.itemLocations.sort((loc1, loc2) => {
				if (!loc1.Order && !loc2.Order) {
					return 1;
				}
				return (loc1.Order > loc2.Order) ? 1 : -1
			});
		});

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
					if (itemLocation.ItemGroup === ItemGroups.GROUP) {
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
	_setUpItemGroups: function(groupedItemLocationInfo) {
		let mainContainer = document.getElementById("itemLocationsContainer");
		mainContainer.innerHTML = ""; // Clean this up first so we don't get duplicates

		let travelDiv = dce("div");
		travelDiv.id = "travelDiv";
		mainContainer.appendChild(travelDiv);

		let _this = this;
		Object.keys(groupedItemLocationInfo).forEach(function(groupId) {
			let itemGroup = groupedItemLocationInfo[groupId];
			let itemGroupDiv = dce("div", "item-group");
			mainContainer.appendChild(itemGroupDiv);
			
			let itemGroupTitleDiv = dce("div", "item-group-title");
			itemGroupTitleDiv.onclick = _this._toggleItemLocations.bind(_this, itemGroupDiv);
			itemGroupDiv.appendChild(itemGroupTitleDiv);
			
			let itemGroupImageDiv = dce("div", "item-group-image");
			itemGroupImageDiv.style.backgroundImage = itemGroup.backgroundImage;
			itemGroupTitleDiv.appendChild(itemGroupImageDiv);

			_this._createTrickReferenceDivs(itemGroup, itemGroupTitleDiv);

			if (itemGroup.description) {
				itemGroupImageDiv.title = itemGroup.description;
			}
			
			let itemGroupTextDiv = dce("div", "item-group-text");

			let itemGroupName = groupId;
			if (itemGroupName) {
				itemGroupTextDiv.innerText = itemGroupName
				itemGroupTitleDiv.appendChild(itemGroupTextDiv);
				_this._createItemLocations(itemGroup.itemLocations, itemGroupDiv, itemGroupName);
			}
		});
	},

	/**
	 * Creates references for tricks in an item group
	 * @param itemGroup - the item group to create tricks for
	 * @param itemGroupTitleDiv - the title div for the item group
	 */
	_createTrickReferenceDivs: function(itemGroup, itemGroupTitleDiv) {
		if (itemGroup.tricks) {
			let itemGroupTrickContainer = dce("div", "item-group-trick-container");
			itemGroupTitleDiv.appendChild(itemGroupTrickContainer);

			let trickNumber = 1;
			Object.values(itemGroup.tricks).forEach(trick => {
				if (trick) {
					let trickDiv = dce("div", "item-group-trick")
					trickDiv.innerText = `[${trickNumber}]`;
					trickDiv.title = `=== ${trick.displayText} ===\x0A${trick.description}`;

					itemGroupTrickContainer.appendChild(trickDiv);
				}
				trickNumber++;
			});
		}
	},

	/**
	 * Creates the item locations
	 * @param itemGroup - the data for the locations
	 * @param itemGroupDiv - the div for the locations
	 * @param includeGroupName - the name of the item group
	 */
	_createItemLocations: function(itemGroup, itemGroupDiv, itemGroupName) {
		if (itemGroup.every(loc => loc.disabled || loc.Hide)) {
			addCssClass(itemGroupDiv, "nodisp");
			return;
		}

		let _this = this;
		let owTextDivs = {};
		let hiddenLocations = 0;
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

			// Hide item locations that are done/not the shown age and are hideable
			// We will never hide OW entrances
			if (Data.usesOwExits(itemLocation, true)) {
				addCssClass(itemLocationDiv, "do-not-hide");
			} else {
				// Do not hide locations with notes so they can be seen (covers shops)
				let hideLocation = itemLocation.playerHas && !itemLocation.notes;
				if (!hideLocation) {
					let ageToHide = LocationSidebar.getAgesToHide();
					if (ageToHide) {  // If this is null, we aren't hiding by age
						let ageToShow = ageToHide === Age.CHILD ? Age.ADULT : Age.CHILD;
						if (!RegionWalker.doesItemLocationHaveSpawnOrWalkData(itemLocation, ageToShow)) {
							hideLocation = ageToHide === Age.EITHER || // Hiding both explicitely
							itemLocation.Age === ageToHide || // Hiding one by default
							Data.useSpecificAge(itemLocation, ageToHide); // Hiding one due to a setting
						}
					}
				}
				
				if (hideLocation) {
					addCssClass(itemLocationDiv, "nodisp");
					hiddenLocations++;
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

			let itemLocationAgeIconDiv = dce("div", "item-location-age-icon");
			itemLocationAgeIconDiv.id = `${itemLocation.Name}-age-icon`;
			itemLocationAgeIconDiv.style.backgroundImage = Data.getAgeImagePath(itemLocation);
			itemLocationTitleDiv.appendChild(itemLocationAgeIconDiv);

			let itemLocationTimeIconDiv = dce("div", "item-location-time-icon");
			itemLocationTimeIconDiv.id = `${itemLocation.Name}-time-icon`;
			itemLocationTimeIconDiv.style.backgroundImage = Data.getTimeImagePath(itemLocation);
			itemLocationTitleDiv.appendChild(itemLocationTimeIconDiv);
			
			let imagePath = getItemLocationGroupIcon(itemLocation);
			let itemLocationIconDiv = dce("div", "item-location-group-icon");
			itemLocationIconDiv.style.backgroundImage = imagePath;
			itemLocationTitleDiv.appendChild(itemLocationIconDiv);

			let itemLocationTextDiv = dce("div", "item-location-text");
			itemLocationTextDiv.innerText = itemLocation.Name;
			itemLocationTitleDiv.appendChild(itemLocationTextDiv);

			// Collect the ow divs in arrays of groups so we can adjust widths later
			if (isOwEntrance) {
				owTextDivs[itemGroupName] = owTextDivs[itemGroupName] || []
				owTextDivs[itemGroupName].push(itemLocationTextDiv);
			}

			// Update the entrance location groups
			if (Data.isEntrance(itemLocation)) {
				let itemLocationEntranceTasksContainer = dce("div", "item-location-entrance-task-container");
				itemLocationEntranceTasksContainer.id = `${itemLocation.Name}-entrance-tasks`;
				itemLocationTitleDiv.appendChild(itemLocationEntranceTasksContainer);
				
				if (itemLocation.ItemGroup === ItemGroups.GROUP) {
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
			
			let moreInfoDiv = _this._createMoreInfoDiv(itemLocation);
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

		// Put a label next to the div indicating hidden items
		this._updateItemGroupDivText(itemGroupDiv, hiddenLocations);

		// Put the top/bottom borders on the item locations
		this._updateFirstAndLastLocations(itemGroupDiv);
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
	_createMoreInfoDiv: function(itemLocation) {
		let moreInfoDiv = dce("div", "item-more-info nodisp");
		moreInfoDiv.id = `${itemLocation.Name}-more-info`;

		moreInfoDiv.appendChild(this._createMoreInfoTextDiv(itemLocation));
		moreInfoDiv.appendChild(this._createNotesDiv(itemLocation));
		return moreInfoDiv;
	},

	/**
	 * Creates the div for the actual text
	 * Includes any tricks to display, with appropriate links
	 * @param itemLocation: the item location
	 * @returns The text div
	 */
	_createMoreInfoTextDiv: function(itemLocation) {
		let moreInfoTextDiv = dce("div", "item-more-info-text");
		moreInfoTextDiv.innerHTML = itemLocation.LongDescription || "";

		if (itemLocation.TricksToShow && (!itemLocation.IgnoreTricksToShow || !itemLocation.IgnoreTricksToShow())) {
			let tricksContainer = dce("div", "item-more-info-text-tricks-container");
			moreInfoTextDiv.appendChild(tricksContainer);

			itemLocation.TricksToShow.forEach(trick => {
				let trickDiv = dce("div", "item-more-info-text-trick");
				trickDiv.innerText = trick.displayText;
				trickDiv.title = trick.description;

				SettingsPage.appendLinksToTrick(trickDiv, trick.links)

				tricksContainer.appendChild(trickDiv);
			});
		}
		
		return moreInfoTextDiv;
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

		if (Data.isEntrance(itemLocation)) {
			let entranceGroupId = `${itemLocation.Name}-entrance-groups`;
			let entranceGroupDiv = document.getElementById(entranceGroupId);
			if (entranceGroupDiv) {
				addOrRemoveCssClass(entranceGroupDiv, "nodisp", playerHasItem);
			}
		}

		if (itemLocation.ItemGroup === ItemGroups.LOCKED_DOOR) {
			LockedDoorWalker.compute(itemLocation.Map);
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
		
		if (forceOn === undefined) {
			toggleCssClass(itemLocationDiv.lastChild, "nodisp");
		} else {
			addOrRemoveCssClass(itemLocationDiv.lastChild, "nodisp", !forceOn);
		}
	},

	/**
	 * Toggles the item locations
	 * @param itemGroupDiv - the div to toggle the locations of
	 */
	_toggleItemLocations: function(itemGroupDiv, event) {
		let hideItems = !this._areThereHiddenItems(itemGroupDiv);

		let hiddenLocations = 0;
		let children = itemGroupDiv.children;
		for (let i = 1; i < children.length; i++) { // Ignore the first element - they aren't item locations
			let childElement = children[i];

			// OW entrances are not hidden, as the info they provide is useful
			if (!containsCssClass(childElement, "do-not-hide")) {
				addOrRemoveCssClass(childElement, "nodisp", hideItems);
				if (hideItems) {
					hiddenLocations++;
				}
			}
		}

		this._updateItemGroupDivText(itemGroupDiv, hiddenLocations);
		this._updateFirstAndLastLocations(itemGroupDiv);

		MapUI.refreshIcons();

		if (event) {
			event.stopPropagation();
		}
	},

	/**
	 * Returns whether there are hidden items in the given div
	 * @param itemGroupDiv - the item group div
	 */
	_areThereHiddenItems(itemGroupDiv) {
		let textDiv = itemGroupDiv.getElementsByClassName("item-group-text")[0];
		return textDiv.innerHTML.split("<span").length > 1;
	},

	/**
	 * Updates the item group div to display how many items are hdiden
	 * @param itemGroupDiv - the item group div
	 * @param hiddenLocations - the number of hidden locations
	 */
	_updateItemGroupDivText(itemGroupDiv, hiddenLocations) {
		let textDiv = itemGroupDiv.getElementsByClassName("item-group-text")[0];
		let baseText = textDiv.innerHTML.split("<span")[0].trim();

		if (hiddenLocations > 0) {
			textDiv.innerHTML = `${baseText} <span class="hidden-items-count">(+${hiddenLocations})</span>`;
		} else {
			textDiv.innerHTML = baseText;
		}
	},

	/**
	 * Updates the item locations in the group to have the top/bottom borders
	 * @param itemGroupDiv - the item group div
	 */
	_updateFirstAndLastLocations(itemGroupDiv) {
		let children = itemGroupDiv.children;
		let firstElement = null;
		let lastElement = null;
		for (let i = 1; i < children.length; i++) { // Ignore the first element - they aren't item locations
			let childElement = children[i];
			removeCssClass(childElement, "first-item-location");
			removeCssClass(childElement, "last-item-location");

			if (containsCssClass(childElement, "nodisp")) {
				continue;
			}

			if (!firstElement) {
				firstElement = childElement;
			}
			lastElement = childElement;
		}

		if (firstElement) {
			addCssClass(firstElement, "first-item-location")
		}

		if (lastElement) {
			addCssClass(lastElement, "last-item-location")
		}
	}
};