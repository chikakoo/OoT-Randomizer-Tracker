//TODO: this would need to be reworked with the region rework changes...
// ALSO - would need to add the medigoron/carpet checks to the data file, since they're new checks


/**
 * A parser for the spoiler log locations object - used to insert notes into the program automatically
 */
SpoilerLogNotesParser = {
	/**
	 * Items we don't care about seeing in the results
	 */
	junkItems: [
		"Ice Trap",
		"Recovery Heart",
		"Heart Container",
		"Piece of Heart",
		"Deku Seeds",
		"Deku Nuts",
		"Deku Stick (",
		"Bombs",
		"Arrows",
		"Rupee",
		"Buy", // Handles every normal shop item - not the new randomized ones
		"Gold Skulltula Token",
		"Map",
		"Compass"
	],
	
	/**
	 * Returns whether an item string is a junk item
	 * @param item - the item name, as a string
	 * @return - true or false - whether it's a junk item
	 */
	isJunkItem: function(item) {
		let isJunk = false;
		
		this.junkItems.forEach(function(junkItem) {
			if (item.startsWith(junkItem)) {
				isJunk = true;
				return;
			}
		});
		
		return isJunk;
	},
		
	/**
	 * Parses the spoiler data and loads the data into the tracker
	 * @param spoilerData - the locations object from the spoiler log
	 * @return - the message to show the user
	 */
	parseAndLoadData: function(spoilerData) {
		let playerNumber = Settings.PlayerNumber || 1;
		let otherPlayerNumber = playerNumber === 1 ? 2 : 1;
		let worldObjectKey = `World ${playerNumber}`;

		let spoilerLocationData = spoilerData[worldObjectKey];
		if (!spoilerLocationData) {
			spoilerLocationData = spoilerData;
		}
		
		// Get the data we need to modify our own objects
		let locationData = {};
		let success = true;
		let result = "Notes loaded successfully!";
		let triforcesFound = 0;
		let _this = this;
		Object.keys(spoilerLocationData).forEach(function(spoilerLocationName) { 
			if (!success) { return; }
			
			if (RandoLocationsToIgnore.includes(spoilerLocationName)) {
				return;
			}
			
			let spoilerLocationObj = spoilerLocationData[spoilerLocationName];
			let trackerLocationObj = RandoToTrackerLocationsMap[spoilerLocationName]
			
			if (typeof spoilerLocationObj === "string") {
				spoilerLocationObj = { item: spoilerLocationObj };
			}
			
			if (spoilerLocationObj.item === "Triforce Piece") {
				triforcesFound++;
				return;
			}

			if (!trackerLocationObj) {
				success = false;
				result = `ERROR: No map found for location "${spoilerLocationName}"`;
				return;
			}
			
			if (spoilerLocationObj.player && spoilerLocationObj.player === playerNumber) {
				return;
			}
			
			let itemName = spoilerLocationObj.item;
			if (_this.isJunkItem(itemName)) {
				return;
			}
			
			_this._addToLocationData(locationData, trackerLocationObj, spoilerLocationObj);
		});
		
		let otherWorldObjectKey = `World ${otherPlayerNumber}`;
		let otherSpoilerLocationData = spoilerData[otherWorldObjectKey];
		if (otherSpoilerLocationData) {
			// Get the Triforce from the other world
			Object.keys(otherSpoilerLocationData).forEach(function(spoilerLocationName) { 
				if (!success) { return; }
				
				if (RandoLocationsToIgnore.includes(spoilerLocationName)) {
					return;
				}
				
				let spoilerLocationObj = otherSpoilerLocationData[spoilerLocationName];
				let trackerLocationObj = RandoToTrackerLocationsMap[spoilerLocationName]
				
				if (!trackerLocationObj) {
					success = false;
					result = `ERROR: No map found for location "${spoilerLocationName}"`;
					return;
				}
				
				if (spoilerLocationObj.item === "Triforce Piece") {
					_this._addToLocationData(locationData, trackerLocationObj, spoilerLocationObj);
				}
			});
		}
		
		if (!success) {
			return result;
		}
		
		// Modify the notes data
		Object.keys(MapLocations).forEach(function(mapName) {
			let spoilerMapData = locationData[mapName];
			if (!spoilerMapData) {
				return;
			}
			
			let mapData = MapLocations[mapName];
			mapData.ItemLocations.forEach(function(itemLocation) {
				if (!locationData[mapName]) { return; }
				
				let notesToAdd = spoilerMapData[itemLocation.Name];
				if (!notesToAdd) {
					return;
				}
				
				if (itemLocation.notes) {
					itemLocation.notes += "; "
				} else {
					itemLocation.notes = "";
				}
				
				itemLocation.notes += notesToAdd;
				
				delete locationData[mapName][itemLocation.Name];
				if (locationData[mapName].length === 0) {
					delete locationData[mapName];
				}
			});
		});
		
		// Check for any locations that were somehow missed
		if (Object.keys(locationData).length > 0) {
			results = "Notes loaded successfully, except for the following:"
			Object.keys(locationData).forEach(function(mapName) {
				let mapData = locationData[mapName];
				Object.keys(mapData).forEach(function(itemName) {
					results += `\n${mapName}: ${itemName}`;
				});
			});
		}
		
		return `${result} Found ${triforcesFound} triforce piece(s) in this world.`;
	},

	/**
	 * Adds the appropriate notes to the location data object - modifies the locationData parameter
	 * @param locationData - the location data that's being tracked (this is what is being modified)
	 * @param trackerLocationObj - the map between the spoiler location and the tracker location
	 * @param spoilerLocationObj - the data in the spoiler log - includes the item name and player number
	 */
	_addToLocationData: function(locationData, trackerLocationObj, spoilerLocationObj) {
		locationData[trackerLocationObj.map] = locationData[trackerLocationObj.map] || {};
		
		let locationDataNotes = locationData[trackerLocationObj.map][trackerLocationObj.location];
		if (locationDataNotes) {
			locationDataNotes += "; "
		} else {
			locationDataNotes = "";
		}
		
		if (spoilerLocationObj.price) {
			locationDataNotes += `${spoilerLocationObj.price} `;
		}
		
		let itemPieces = spoilerLocationObj.item.split("(");
		let itemName = itemPieces[0].trim();
		locationDataNotes += itemName;

		if (itemName === "Small Key" || itemName === "Boss Key") {
			locationDataNotes += ` //${itemPieces[1].split(")")[0].trim()}`;
		}
		
		let isTriforce = spoilerLocationObj.item === "Triforce Piece";
		if (spoilerLocationObj.player && !isTriforce) {
			locationDataNotes += ` //p${spoilerLocationObj.player}`;
		} else if (isTriforce) {
			locationDataNotes += " //On other world!";
		}
		
		locationData[trackerLocationObj.map][trackerLocationObj.location] = locationDataNotes;
	},
	
	/**
	 * Runs through the rando data and ensures it matches up with the tracker data
	 * Run this in the console
	 */
	_testRandoData: function() {
		Object.keys(RandoToTrackerLocationsMap).forEach(function(randoLocation) {
			let randoObj = RandoToTrackerLocationsMap[randoLocation];
			let map = randoObj.map;
			let itemLocation = randoObj.location;
			
			if (!MapLocations[map]) {
				
				return;
			}
			
			let foundLoc = false;
			MapLocations[map].ItemLocations.forEach(function(trackerLocation) {
				if (trackerLocation.Name === itemLocation) {
					foundLoc = true;
				}
			});
			
			if (!foundLoc) {
				console.log(`ERROR: Invalid location "${itemLocation}"`);
			}
		});
	}
};