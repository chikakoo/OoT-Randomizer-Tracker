/**
 * Contains the functions for the map UI
 */
let MapUI = {
	_currentMapName: "",
	_currentFloor: "",
		
	/**
	 * The current scale for the map if you're moused over it, or if _freezeMap is on
	 */
	_scaleValue: 1,
	_defaultZoomScaleValue: 1,
	
	/**
	 * The default scale value for when the map loads
	 */
	_defaultScaleValue: 1,
	
	/**
	 * The min and max scale values
	 */
	_minScaleValue: 1,
	_maxScaleValue: 10,
	
	/**
	 * The amount the scroll wheel will change the scale
	 */
	_scrollAdjustment: 0.2,
	
	/**
	 * Freezes the map at the current location and zoom level
	 */
	_mapFrozen: false,
	
	/**
	 * Icon height/width info
	 */
	_iconDimension: 30,
	_owIconTextHeight: 14,
	
	/**
	 * An object of all current icons, keyed by the location name
	 */
	_iconDivs: { },
	
	/**
	 * Clears the map
	 */
	clearMap: function(keepMapName) {
		let floorDiv = document.getElementById("floorDiv");
		floorDiv.innerHTML = "";
		
		let mapImageAndIcons = document.getElementById("mapImageAndIcons");
		mapImageAndIcons.innerHTML = "";
		mapImageAndIcons.style.backgroundImage = "none";
	},
	
	/**
	 * Sets the map to display
	 * @param mapName: the name of the map
	 * @param groupedItemLocationInfo: all the location objects of the map with the GroupName included
	 * @param floor: optional - the floor to show
	 */
	setMap: function(mapName, groupedItemLocationInfo, floor) {
		this._currentMapName = mapName;
		this._currentFloor = "";
		if (floor) {
			this._currentFloor = floor;
		}
		
		let mapImageAndIcons = document.getElementById("mapImageAndIcons");
		mapImageAndIcons.innerHTML = "";
		
		this._setUpIcons(mapName, groupedItemLocationInfo, floor);
		this._setUpFloorDiv(mapName, floor);

		this._mapFrozen = false;
		this._applyScaling(1); // Zoom the map back out if needed
	},

	_setUpFloorDiv: function(mapName, floor) {
		let floorDiv = document.getElementById("floorDiv");
		floorDiv.innerHTML = "";
		if (!floor) {
			addCssClass(floorDiv, "nodisp");
			return;
		}

		removeCssClass(floorDiv, "nodisp");
		let mapInfo = MapLocations[mapName];

		let _this = this;
		mapInfo.Floors.forEach(function(currentFloor) {
			let floorButton = dce("div", "floor-button");
			floorButton.innerText = currentFloor;
			floorButton.dataset.floor = currentFloor;
			floorButton.onclick = function(event) {
				let groupedItemLocationInfo = getGroupedLocationInfo(_this._currentMapName);
				_this.setMap(mapName, groupedItemLocationInfo, event.target.dataset.floor);
			}
			if (floor === currentFloor) {
				addCssClass(floorButton, "floor-button-selected");
			}
			floorDiv.appendChild(floorButton);
		});
	},
	
	refreshIcons: function() {
		if (!LocationSidebar.isLocationAMap()) { return; }
		let mapImageAndIcons = document.getElementById("mapImageAndIcons");
		mapImageAndIcons.innerHTML = "";
		if (this._currentMapName === "" ) { return; }
		
		let mapInfo = MapLocations[this._currentMapName];
		let mapName = this._currentMapName;
		let groupedItemLocationInfo = getGroupedLocationInfo(mapName);
		this._setUpIcons(this._currentMapName, groupedItemLocationInfo, this._currentFloor);
		
		if (this._mapFrozen) { this._applyScaling(this._scaleValue); }
	},
	
	_setUpIcons: function(mapName, groupedItemLocationInfo, floor) {
		if (mapName === "") { return; }

		if (floor === "ANY") {
			floor = "HYR"; // This is only used by the Castle map currently... redo this if it ends up being important
		}

		let mapImageAndIcons = document.getElementById("mapImageAndIcons");
		let imageName = this._currentFloor ? `${mapName} - ${floor}` : mapName;

		// Set up alternate floor images for MQ dungeons
		let mapData = MapLocations[mapName];
		if (mapData.IsMasterQuest && mapData.MqMapFloors && mapData.MqMapFloors.includes(floor)) {
			imageName = `MQ ${imageName}`;
		}

		mapImageAndIcons.style.backgroundImage = `url("Images/Maps/${imageName}.png")`;
		
		this._iconDivs = {};
		let _this = this;
		Object.keys(groupedItemLocationInfo).forEach(function(groupId) {
			let groupedLocations = groupedItemLocationInfo[groupId];
			groupedLocations.forEach(function(itemLocation) {
				if (itemLocation.disabled) { return; }
				
				// Skip this icon if it's not for the current floor
				let floorIsUndefinedOrNull = floor === undefined || floor === null || floor === "";
				if (!floorIsUndefinedOrNull && itemLocation.MapInfo && itemLocation.MapInfo.floor !== "ANY" && itemLocation.MapInfo.floor !== floor) { 
					return; 
				}

				let iconDiv = dce("div", "item-icon");
				_this._setUpIconStyles(iconDiv, itemLocation);

				iconDiv.onmouseover = function(event) {
					let itemLocationDiv = document.getElementById(itemLocation.Name.trim());
					if (itemLocationDiv) {
						addCssClass(itemLocationDiv, "item-icon-hover");
						addCssClass(event.target, "item-icon-highlight");
					}
				};

				iconDiv.onmouseout = function(event) {
					let itemLocationDiv = document.getElementById(itemLocation.Name.trim());
					if (itemLocationDiv) {
						removeCssClass(itemLocationDiv, "item-icon-hover");
						removeCssClass(event.target, "item-icon-highlight");
					}
				};

				iconDiv.onclick = function(event) {
					event.stopPropagation();

					let itemLocationDiv = document.getElementById(itemLocation.Name.trim());
					if (itemLocationDiv) {
						_toggleItemObtained(itemLocationDiv, itemLocation);
					}
				};

				let cannotGetEntranceItem = false;
				let entranceGroup = Data.getEntranceGroup(itemLocation);
				if (entranceGroup && itemLocation.ItemGroup === ItemGroups.ENTRANCE) {
					cannotGetEntranceItem = 
						EntranceUI.getNumberOfCompletableTasks(itemLocation, Age.CHILD) ===  0 &&
						EntranceUI.getNumberOfCompletableTasks(itemLocation, Age.ADULT) ===  0;
				}
				if (cannotGetEntranceItem || !Data.getItemObtainability(itemLocation)) {
					addCssClass(iconDiv, "cannot-get");
				}

				if ((itemLocation.playerHas && !(itemLocation.OwShuffleMap && itemLocation.OwShuffleRegion)) || itemLocation.hidden) {
					addCssClass(iconDiv, "hidden");
				}
				
				let mapImageAndIcons = document.getElementById("mapImageAndIcons");
				mapImageAndIcons.appendChild(iconDiv);
				_this._iconDivs[itemLocation.Name] = iconDiv;
			});
		});
	},
	
	/**
	 * Sets up the icon styles
	 * @param iconDiv: The div to set up the background for
	 * @param itemLocation: The item location info
	 */
	_setUpIconStyles: function(iconDiv, itemLocation) {
		let offset = this._iconDimension / 2;
		let topStyle = 0;
		let leftStyle = 0;
		if (itemLocation.MapInfo) {
			topStyle = itemLocation.MapInfo.y || 0;
			leftStyle = itemLocation.MapInfo.x || 0;
			iconDiv.style.top = `${topStyle - offset}px`;
			iconDiv.style.left = `${leftStyle - offset}px`;
		}

		if (itemLocation.OwShuffleMap && itemLocation.OwShuffleRegion) {
			let leadsToMap = MapLocations[itemLocation.OwShuffleMap];
			let abbreviation = leadsToMap.Abbreviation;
			
			iconDiv.innerText = `${abbreviation}${this._getWalkInfo(itemLocation)}`;
			
			let owOffset = this._owIconTextHeight / 2;
			let mapGroup = leadsToMap.MapGroup;
			iconDiv.style.top = `${topStyle - owOffset}px`; 
			iconDiv.style.color = Data.getColorForMapGroup(mapGroup);
			addCssClass(iconDiv, "item-icon-ow-entrance");
			return;
		}
		
		let groupId = itemLocation.ItemGroup;
		if (groupId === ItemGroups.GOSSIP_STONE) {
			addCssClass(iconDiv, "item-icon-gossip-stone");
		}
		
		// All other types will use the actual icon dimensions
		iconDiv.style.width = `${this._iconDimension}px`;
		iconDiv.style.height = `${this._iconDimension}px`;
		iconDiv.style.backgroundImage = EntranceUI.getEntranceGroupIconOrSelectedEntrance(itemLocation);
	},
	
	/**
	 * Gets the walk info string
	 * @param itemLocation: The item location info
	 * @return: A string containing the walk info, in the following forms:
	 * - the empty string means you haven't been here, or there's no way to get to the location from here
	 * - 3 | 4 would mean you need 3 more entrances as child, and 4 as adult
	 * - - | 2 means child can't get there, but adult needs 2
	 * - 3 | - means child needs 3, but adult can't get there
	 * - 5 means both need 5 more entrances
	 */
	_getWalkInfo: function(itemLocation) {
		let childWalkInfo = itemLocation.childWalkValue;
		let adultWalkInfo = itemLocation.adultWalkValue;
		let childWalkString = "";
		let adultWalkString = "";
		
		if (childWalkInfo === undefined && adultWalkInfo === undefined) { return ""; }
		
		childWalkString = childWalkInfo === undefined ? "-" : childWalkInfo;
		adultWalkString = adultWalkInfo === undefined ? "-" : adultWalkInfo;
		
		if (childWalkInfo === adultWalkInfo) { return ` ${childWalkInfo}`; }
		
		return ` ${childWalkString} | ${adultWalkString}`;
	},
	
	/**
	 * Handles moving the map when it's moved over and applies the scale value
	 * @param event - used to get the mouse position
	 */
	onMouseMove: function(event) {
		if (this._mapFrozen) { return; }
		
		let mapDiv = document.getElementById("mapDiv");
		let mapImageAndIcons = document.getElementById("mapImageAndIcons");
		let rect = mapDiv.getBoundingClientRect();

		let x = (event.clientX - rect.left) / mapImageAndIcons.offsetWidth * 100 + "%";
	    let y = (event.clientY - rect.top) / mapImageAndIcons.offsetHeight * 100 + "%";
	    mapImageAndIcons.style["transform-origin"] = `${x} ${y}`;
	    this._applyScaling(this._scaleValue);
	},
	
	/**
	 * Handles the mouse out - this will zoom the map back to the default value if
	 * it's not currently frozen
	 */
	onMouseOut: function(event) {
		if (this._mapFrozen) { return; }
		this._applyScaling(this._defaultScaleValue);
	},
	
	/**
	 * Freezes and unfreezes the map when clicked
	 */
	onMapClicked: function() {
		this._mapFrozen = !this._mapFrozen;
	},
	
	/**
	 * Zooms the map precisely with your scroll wheel
	 * @param event: contains scroll information
	 */
	onMapScrolledOver: function(event) {
		event.preventDefault(); // Make sure the page doesn't scroll
		
	    if (event.wheelDelta > 0) {
	    	this._scaleValue += 0.2;
	        if (this._scaleValue > 4) { this._scaleValue = 4; }
	    } else {
	    	this._scaleValue -= 0.2;
	        if (this._scaleValue < 1) { this._scaleValue = 1; }
	    }
	    this._applyScaling(this._scaleValue);
	},
	
	/**
	 * Applies the scaling values to the map
	 * @param scaleValue: the scale value to use
	 */
	_applyScaling: function(scaleValue) {
		let thisDiv = document.getElementById("mapImageAndIcons");
	    thisDiv.dataset.scale = scaleValue;
	    thisDiv.style.transform = "scale(" + scaleValue + ")";
		
	    let inverseScale = 1 / scaleValue;
	    let _this = this;
	    Object.keys(this._iconDivs).forEach(function(key) {
	    	let iconDiv = _this._iconDivs[key];
	    	iconDiv.dataset.scale = inverseScale;
	    	iconDiv.style.transform = "scale(" + inverseScale + ")";
	    });
	},
	
	/**
	 * Jumps to the given icon div
	 */
	jumpToIcon: function(locationName, floor) {
		if (floor && this._currentFloor !== floor) {
			let groupedItemLocationInfo = getGroupedLocationInfo(this._currentMapName);
			this.setMap(this._currentMapName, groupedItemLocationInfo, floor);
		}

		let iconDiv = this._iconDivs[locationName];
		let mapDiv = document.getElementById("mapDiv");
		let x = ((iconDiv.offsetLeft) / mapDiv.offsetWidth) * 100 + "%";
		let y = ((iconDiv.offsetTop + (this._iconDimension / 2)) / mapDiv.offsetHeight) * 100 + "%";
		
		let mapImageAndIcons = document.getElementById("mapImageAndIcons");
		mapImageAndIcons.style["transform-origin"] = `${x} ${y}`;
		addCssClass(iconDiv, "item-icon-highlight");
		this._mapFrozen = true;
		this._applyScaling(2);
	},
	
	/**
	 * Highlights an icon based on the location name
	 */
	highlightIcon: function(itemLocationName) {
		let icon = this._iconDivs[itemLocationName];
		if (!icon) { return; }
		
		this.removeHighlightFromIcons();
		addCssClass(icon, "item-icon-highlight");
	},
	
	/**
	 * Removes highlights from all icons
	 */
	removeHighlightFromIcons: function() {
		let _this = this;
		Object.keys(this._iconDivs).forEach(function(key) {
	    	let iconDiv = _this._iconDivs[key];
	    	removeCssClass(iconDiv, "item-icon-highlight");
	    });
	}
};