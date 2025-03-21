/**
 * Contains the functions involved with gathering data for walking to a given location, which is a feature
 * available in OW shuffle to help the user find out how to get somewhere
 */
Walk = {
	/**
	 * The current map name of the location being walked to
	 * This is the empty string when unset
	 */
    currentLocation: "",
    	
	/**
	 * The current item location name of what is being walked to
	 * This is the empty string when unset
	 */
	currentItemLocationName: "",
	
	/**
	 * The current item location that is being walked to
	 * This is null when unset
	 */
    currentItemLocation: null,

    /**
	 * An object containing visited info for both ages
	 * Current loop is used to determine whether it's worth traversing still (a value equal to or
	 * greater than the current loop isn't worth it)
	 * Contains items in the form: { Age.ADULT: {"<map name>|<region name>": currentLoop, ...}, Age.CHILD: [...] }
	 */
	_visitedInfo: {},
	
	/**
	 * An array of all the maps that could potentially lead to the marked location
     * Used when marking up the sidebar
	 */
	_relevantMaps: [],

    /**
	 * Stamps the childWalkValue and adultWalkValue properties on all necessary item locations
	 */
	calculate: function() {
		if (!this.currentItemLocation) { return; }
		
		let rootMap = this.currentLocation;
		let rootRegion = this.currentItemLocation.ExitRegion ? this.currentItemLocation.ExitRegion : this.currentItemLocation.Region;
		this._relevantMaps = [rootMap];
		
		this._checkRegions(rootMap, rootRegion);
		
		LocationSidebar.updateForWalk(this._relevantMaps);
		this.updateTravelDiv();
    },

    /**
	 * Check all the item locations leading out from the root
	 */
	_checkRegions: function(map, region) {
        this._visitedInfo = {};
        this._visitedInfo[Age.CHILD] = [];
        this._visitedInfo[Age.ADULT] = [];
		
		if (Data.canAccessMap(Age.CHILD, map, region)) {
			this._markAllItemLocations([{ map: map, fromRegion: region, fromExit: null }], Age.CHILD, 0, true);
		}
		
		if (Data.canAccessMap(Age.ADULT, map, region)) {
			this._markAllItemLocations([{ map: map, fromRegion: region, fromExit: null }], Age.ADULT, 0, true);
		}
    },

    /**
	 * Marks item locations in a reverse walk
	 */
	_markAllItemLocations: function(walkToInfo, age, currentLoop, isFirstLoop) {
		let _this = this;
		
		walkToInfo.forEach(function(info) {
			let map = info.map;
			let fromRegion = info.fromRegion;
            let entrances = _this._getAllOwEntrances(map, fromRegion, age, {}, currentLoop);

            Object.values(entrances).forEach(function(entrance) {
				let entranceData = {
					map: entrance.ExitMap,
					region: entrance.ExitRegion,
					exit: info.fromExit
				};

				if (entranceData.map && entranceData.region) {
					let walkValue = isFirstLoop ? 0 : WalkData.getWalkValue(map, entrance.OwShuffleExitName, entranceData.exit);
					let loopValueToUse = currentLoop + walkValue;
					if (age === Age.CHILD) {
						entrance.childWalkValue = loopValueToUse;
					} else if (age === Age.ADULT) {
						entrance.adultWalkValue = loopValueToUse;
					}
					_this._markAllItemLocations([{ map: entranceData.map, fromRegion: entranceData.region, fromExit: entrance.Name }], age, loopValueToUse);
				}
            });
		});
    },
    
    /**
     * Gets all the entrances that could have lead to the given map and region
     */
    _getAllOwEntrances: function(map, region, age, owEntrances, currentLoop) {
        let key = `${map}|${region}`;
		if (Object.keys(this._visitedInfo[age]).includes(key) && this._visitedInfo[age][key] <= currentLoop) { 
			return owEntrances;
		}
        this._visitedInfo[age][key] = currentLoop;
		let _this = this;

		let walkMap = RegionWalker.walkMap;
		let walkMapKey = RegionWalker._createWalkMapKey(map, region);
		if (walkMap[age] && walkMap[age][walkMapKey] && walkMap[age][walkMapKey].from) {
			walkMap[age][walkMapKey].from.forEach(function(walkInfo) {
				let parts = walkInfo.split("|");
				let foundMap = parts[0].trim();
				let foundRegion = parts[1].trim();
				let foundExit = parts[2].trim();

				// Recurse to get the rest of the OW exits on the same map if we've found a region link
				// Otherwise, just add the associated OwExit to the object
				if (foundExit === "sameMap") {
					_this._getAllOwEntrances(map, foundRegion, age, owEntrances, currentLoop);
				} else {
					let owEntranceKey = `${foundMap}|${foundExit}`;
					owEntrances[owEntranceKey] = OwExits[foundMap][foundExit];
					if (!_this._relevantMaps.includes(foundMap)) { _this._relevantMaps.push(foundMap); }
				}
			});
		}
		return owEntrances;
	},
	
	/**
	 * Updates the travel div in the main screen
	 * @param {Number} destinationIndex - the Xth smallest value to show
	 */
	updateTravelDiv: function(destinationIndex) {
		if (!this.currentItemLocation || !LocationSidebar.isLocationAMap()) { return; }
		if (!destinationIndex) {
			destinationIndex = 0;
		}
		
		// These are objects of the following form:
		// <keyed by # of exits to take>: [ item locations with that number of exits ]
		let childValues = {};
		let adultValues = {};
		
		//TODO; make a new function to only get OwExits in dataRetriever (see the other TODO)
		let itemLocations = Data.getAllItemLocations(ItemLocationDisplay.currentLocationName); 
		itemLocations.forEach(function(itemLocation) {
			let isInteriorOrGrottoExit = Data.isInteriorOrGrotto(itemLocation);
			let doesOwShuffleApply = Settings.RandomizerSettings.shuffleOverworldEntrances || isInteriorOrGrottoExit;
			if (!itemLocation.OwShuffleExitName && doesOwShuffleApply) { 
				return;
			}

			let childWalkValue = itemLocation.childWalkValue;
			if (itemLocation.childWalkValue !== undefined) {
				childValues[childWalkValue] = childValues[childWalkValue] || [];
				childValues[childWalkValue].push(itemLocation);
			}
			
			let adultWalkValue = itemLocation.adultWalkValue;
			if (itemLocation.adultWalkValue !== undefined) {
				adultValues[adultWalkValue] = adultValues[adultWalkValue] || [];
				adultValues[adultWalkValue].push(itemLocation);
			}
		});
		
		let childKeyValuesStrArray = Object.keys(childValues).map(Number);
		let childKeyValues = Int32Array.from(childKeyValuesStrArray);
		childKeyValues.sort();
		let childLocations = [];
		if (childKeyValues && childKeyValues.length > 0 && childKeyValues.length > destinationIndex) {
			childLocations = childValues[childKeyValues[destinationIndex]];
		}
		
		let adultKeyValuesStrArray = Object.keys(adultValues).map(Number);
		let adultKeyValues = Int32Array.from(adultKeyValuesStrArray);
		let adultLocations = [];
		if (adultKeyValues && adultKeyValues.length > 0 && adultKeyValues.length > destinationIndex) {
			adultLocations = adultValues[adultKeyValues[destinationIndex]];
		}

		if (childKeyValues.length + adultKeyValues.length > 0 &&
			childKeyValues.length < destinationIndex &&
			adultKeyValues.length < destinationIndex) {
			this.updateTravelDiv(0);
			return;
		}
		
		this._changeTravelDiv(childLocations, adultLocations, destinationIndex);
	},
	
	/**
	 * Actually does the changes to the travel div
	 * @param childLocations: The optimal exits that Child can take to get to the destination
	 * @param childLocations: The optimal exits that Adult can take to get to the destination
	 * @param currentIndex: The current index we're showing in the travel div - will be incremented as the button is clicked
	 */
	_changeTravelDiv: function(childLocations, adultLocations, currentIndex) {
		let travelDiv = document.getElementById("travelDiv");
		if (!travelDiv) { return; }
		travelDiv.innerHTML = "";

		let advanceButton = dce("button");
		advanceButton.innerText = "^";
		advanceButton.onclick = function(event) {
			event.stopPropagation();
			Walk.updateTravelDiv(currentIndex + 1);
		};
		travelDiv.appendChild(advanceButton);
		
		let childString = childLocations.length === 0 ? "No child path" : childLocations.map(itemLoc => itemLoc.Name).join("; ");
		let adultString = adultLocations.length === 0 ? "No adult path" : adultLocations.map(itemLoc => itemLoc.Name).join("; ");

		if (childString === adultString) {
			travelDiv.appendChild(this._createClickableTravelSpans(childLocations));
			return;
		}

		let dividerSpan = dce("span");
		dividerSpan.innerText = "|";

		travelDiv.appendChild(this._createClickableTravelSpans(childLocations, "No child path"));		
		travelDiv.appendChild(dividerSpan);
		travelDiv.appendChild(this._createClickableTravelSpans(adultLocations, "No adult path"));
	},
	
	/**
	 * Creates clickable spans listing the exit names that one can take to get to the destination
	 * Clicking on the spans will open the location that it leads to, for convenience
	 * @param locations: The list of itemLocations that are the exits you can take
	 * @param defaultString: If there were no exits to take, this string will be displayed instead
	 */
	_createClickableTravelSpans: function(locations, defaultString) {
		let spanContainer = dce("span");
		let _this = this;
		if (locations.length === 0) {
			spanContainer.innerText = defaultString;
		}
		
		for (let i = 0; i < locations.length; i++) {
			let location = locations[i];
			let locationSpan = dce("span");
			locationSpan.innerText = i === locations.length - 1 ? `${location.Name}` : `${location.Name};`;
			spanContainer.appendChild(locationSpan);
			
			let isInteriorOrGrotto = Data.isInteriorOrGrotto(location);
			let doesOwShuffleApply = Settings.RandomizerSettings.shuffleOverworldEntrances || isInteriorOrGrotto;
			let owShuffle = doesOwShuffleApply && location.OwShuffleExitName;
			let isRandomizedOwl = location.IsOwl && Settings.RandomizerSettings.randomizeOwlDrops;
			let isShuffled = owShuffle || isRandomizedOwl;
			let entranceDataSet = {
				map: isShuffled ? location.OwShuffleMap : location.Map,
				region: isShuffled ? location.OwShuffleMap : location.Region
			};
			let hasEntranceDataSet = entranceDataSet.map && entranceDataSet.region;
			if (!hasEntranceDataSet) { 
				return spanContainer;
			}

			let locationToDisplay = entranceDataSet.map;
			addCssClass(locationSpan, "travel-div-hover-style");
			locationSpan.onclick = function() {
				ItemLocationDisplay.displayLocation(locationToDisplay);
				_this.updateTravelDiv();
			}
		}
		return spanContainer;
	}
}