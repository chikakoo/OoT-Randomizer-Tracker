//TODO: rename Walk2 to Walk!

/**
 * Contains the functions involved with gathering data for walking to a given location, which is a feature
 * available in OW shuffle to help the user find out how to get somewhere
 */
Walk2 = {
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
		if (!this.currentItemLocation || !Settings.RandomizerSettings.shuffleOverworldEntrances) { return; }
		
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
			this._markAllItemLocations([{ map: map, fromRegion: region }], Age.CHILD, 0);
		}
		
		if (Data.canAccessMap(Age.ADULT, map, region)) {
			this._markAllItemLocations([{ map: map, fromRegion: region }], Age.ADULT, 0);
		}
    },

    /**
	 * Marks item locations in a reverse walk
	 */
	_markAllItemLocations: function(walkToInfo, age, currentLoop) {
		let _this = this;
		
		walkToInfo.forEach(function(info) {
			let map = info.map;
			let fromRegion = info.fromRegion;
            let entrances = _this._getAllOwEntrances(map, fromRegion, age, {}, currentLoop);
			let entranceArray = [];
            Object.keys(entrances).forEach(function(entranceName) {
				let entrance = entrances[entranceName];
				let entranceData = {
					map: entrance.OneWayEntrance ? entrance.ExitMap : entrance.OwShuffleMap,
					region: entrance.OneWayEntrance ? entrance.ExitRegion : entrance.OwShuffleRegion,
					exitName: entrance.OneWayEntrance ? entrance.Name : entrance.OwShuffleExitName
				};

				if (entranceData.map && entranceData.region && entranceData.exitName) {
					entranceArray.push({ map: entranceData.map, fromRegion: entranceData.region });

					let otherEntrance = OwExits[entranceData.map][entranceData.exitName];
					if (age === Age.CHILD) {
						otherEntrance.childWalkValue = currentLoop;
					} else if (age === Age.ADULT) {
						otherEntrance.adultWalkValue = currentLoop;
					}
				}
            });

            _this._markAllItemLocations(entranceArray, age, currentLoop + 1);
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
        let regionInfo = MapLocations[map].Regions[region];
        Object.keys(regionInfo.Entrances).forEach(function(entranceName) {
			let entrance = regionInfo.Exits[entranceName];

			// If it's a one way entrance, deal with it accordingly
			if (!entrance) {
				let oneWayEntrance = regionInfo.Entrances[entranceName];
				if (oneWayEntrance) {
					if (oneWayEntrance.IsDefaultOwl) {
						oneWayEntrance = oneWayEntrance.OwExit;
					}

					let canGetToEntrance = Data.getItemObtainability(oneWayEntrance, age);
					let isAccessibleDefaultOwl = canGetToEntrance && oneWayEntrance.IsDefaultOwl && !Settings.RandomizerSettings.randomizeOwlDrops;
					let isAccessibleOneWayEntrance = canGetToEntrance && oneWayEntrance.OneWayEntrance;

					if (isAccessibleDefaultOwl || isAccessibleOneWayEntrance) {
						if (!_this._relevantMaps.includes(oneWayEntrance.ExitMap)) { _this._relevantMaps.push(oneWayEntrance.ExitMap); }
						owEntrances[entranceName] = oneWayEntrance;
					}
				}
			}

            // If it's already an OW Exit, add it to the list if you can actually enter it from the other side
            else if (entrance.OwExit) {
				let owExit = entrance.OwExit;
				let hasComputedEntrance = owExit.ComputedEntrance;
				let hasEntranceData = owExit.OwShuffleMap && owExit.OwShuffleExitName;

				if (!owExit.OneWayEntrance &&  
					(
						(!hasComputedEntrance && hasEntranceData) ||
						(hasComputedEntrance && owExit.ComputedEntrance())
					)
				) {
					if (owExit.ComputedEntrance) {
						let computedEntrance = owExit.ComputedEntrance();
						owExit.OwShuffleMap = computedEntrance.map;
						owExit.OwShuffleRegion = computedEntrance.region;
						owExit.OwShuffleExitName = computedEntrance.exit;
					}
						
					let otherSideEntrance = OwExits[owExit.OwShuffleMap][owExit.OwShuffleExitName];

					if (Data.getItemObtainability(otherSideEntrance, age)) {
						if (!_this._relevantMaps.includes(owExit.OwShuffleMap)) { _this._relevantMaps.push(owExit.OwShuffleMap); }
						owEntrances[entranceName] = owExit;
					}
				}
            }

            // Otherwise, we must recurse to all the possible OW entrances on this map
            else if (Data.getLocationAccessibility(MapLocations[map].Regions[entranceName], age)) {
                _this._getAllOwEntrances(map, entranceName, age, owEntrances, currentLoop);
            }
        });

        return owEntrances;
	},
	
	/** 
	 * Updates the travel div in the main screen
	 */
	updateTravelDiv: function() {
		if (!this.currentItemLocation || !Settings.RandomizerSettings.shuffleOverworldEntrances) { return; }
		if (!LocationSidebar.isLocationAMap()) { 
			return; 
		}
		
		// These are objects of the following form:
		// <keyed by # of exits to take>: [ item locations with that number of exits ]
		let childValues = {};
		let adultValues = {};
		
		let itemLocations = Data.getAllItemLocations(_currentLocationName); //TODO; make a new function to only get OwExits in dataRetriever (see the other TODO)
		itemLocations.forEach(function(itemLocation) {
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
		
		let childKeyValues = Object.keys(childValues).map(Number);
		let childLocations = [];
		if (childKeyValues && childKeyValues.length > 0) {
			childLocations = childValues[Math.min(...childKeyValues)];
		}
		
		let adultKeyValues = Object.keys(adultValues).map(Number);
		let adultLocations = [];
		if (adultKeyValues && adultKeyValues.length > 0) {
			adultLocations = adultValues[Math.min(...adultKeyValues)];
		}
		
		this._changeTravelDiv(childLocations, adultLocations);
	},
	
	/**
	 * Actually does the changes to the travel div
	 * @param childLocations: The optimal exits that Child can take to get to the destination
	 * @param childLocations: The optimal exits that Adult can take to get to the destination
	 */
	_changeTravelDiv: function(childLocations, adultLocations) {
		let travelDiv = document.getElementById("travelDiv");
		if (!travelDiv) { return; }
		travelDiv.innerHTML = "";
		
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
			
			let isOWShuffleDataSet = location.OwShuffleMap && location.OwShuffleRegion;
			let isRandomizedOwl = location.IsOwl && Settings.RandomizerSettings.randomizeOwlDrops;
			if ((!location.IsOwl && !isOWShuffleDataSet) || (isRandomizedOwl && !isOWShuffleDataSet)) { 
				return spanContainer;
			}

			let locationToDisplay = location.OwShuffleMap;
			if (location.IsOwl && !Settings.RandomizerSettings.randomizeOwlDrops) {
				locationToDisplay = location.Map; // In this case, we're using the default location since it's not randomized
			}
			
			addCssClass(locationSpan, "travel-div-hover-style");
			locationSpan.onclick = function() {
				displayLocation(locationToDisplay);
				_this.updateTravelDiv();
			}
		}
		return spanContainer;
	}
}