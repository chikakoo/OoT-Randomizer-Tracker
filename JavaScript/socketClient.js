SocketClient = {
	_socket: null,
	
	isCoOp: function() {
		return typeof io !== 'undefined';
	},
	
	connect: function() {
		if (!this.isCoOp()) {
			return;
		}
		
		this._socket = io();
		this._socket.connect('http://127.0.0.1:25565');

		// Connect/Disconnect listeners
		this._socket.on('connect', function() {
			console.log("Connected to the server");
		});
		
		this._socket.on('disconnect', function() {
			console.log('Disconnected from the server');
		});
		
		// Sync up when the inventory is updated
		this._socket.on("inventory_updated", function(itemType, itemKey, item) {
			let consoleOutput = `${itemKey} was updated - Have: ${item.playerHas}`;
			
			switch(itemType) {
				case "Items":
					consoleOutput += `; Upgrade: ${item.currentUpgrade}`;
					
					Items[itemKey].playerHas = item.playerHas;
					Items[itemKey].currentUpgrade = item.currentUpgrade;
					break;
				case "Equipment":
					consoleOutput += `; Upgrade: ${item.currentUpgrade}`;
					
					Equipment[itemKey].playerHas = item.playerHas;
					Equipment[itemKey].currentUpgrade = item.currentUpgrade;
					
					if (itemKey === "SKULLTULA_TOKENS") {
						Equipment[itemKey].count = item.count;
						consoleOutput = `Gold skulltulas were updated - Count: ${item.count}`;
					} else if (itemKey === "TRIFORCE_SHARDS") {
						Equipment[itemKey].count = item.count;
						consoleOutput = `Triforce shards were updated - Count: ${item.count}`;
					}

					break;
				case "Songs":
					Songs[itemKey].playerHas = item.playerHas;
					if (item.warpMap && item.warpRegion) {
						Songs[itemKey].warpMap = item.warpMap;
						Songs[itemKey].warpRegion = item.warpRegion;
						delete Songs[itemKey].noWarp;
					} else if (item.noWarp) {
						delete Songs[itemKey].warpMap;
						delete Songs[itemKey].warpRegion;
						Songs[itemKey].noWarp = item.noWarp;
					}

					if (item.entranceName) {
						Songs[itemKey].entranceName = item.entranceName;
					} else {
						delete Songs[itemKey].entranceName;
					}

					break;
				case "Medallions":
					Medallions[itemKey].playerHas = item.playerHas;
					break;
				case "Keys":
					consoleOutput = `${itemKey} keys were updated - Count: ${item.keyCount}; Have BK: ${item.playerHas}`;
					
					Keys[itemKey].playerHas = item.playerHas;
					Keys[itemKey].keyCount = item.keyCount;
					break;
			}
			
			console.log(consoleOutput);
			
			setUpItemTracker(); // For the UI of the item tracker itself
			refreshAll();
		});
		
		// Syncs up all item locations
		this._socket.on("sync_all_item_locations", this.updateAllItemLocations);
		
		// Sync up when an item location is updated
		this._socket.on("item_location_updated", function(itemLocation) {
			let map = itemLocation.Map;
	    	console.log(`${itemLocation.Name} was updated at ${map} - Checked: ${itemLocation.playerHas}`);
			SocketClient.updateItemLocation(itemLocation);
			
			if (_currentLocationName === map) {
				_refreshNotes(itemLocation);
			}
			
			refreshAll();
		});

		// Sync up the randomized spawn locations
		this._socket.on("spawn_location_updated", function(randomizedSpawnLocations) {
			Data.randomizedSpawnLocations = randomizedSpawnLocations;
			refreshAll();
		});
	},
	
	/**
	 * Update all item locations - used when syncing everything to save on network calls
	 */
	updateAllItemLocations(allItemLocations) {
		allItemLocations.forEach(function(itemLocation) {
			let map = itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE ? itemLocation.ExitMap : itemLocation.Map;

			console.log(`${itemLocation.Name} was updated at ${map} - Checked: ${itemLocation.playerHas}`);
			SocketClient.updateItemLocation(itemLocation);
			
			if (_currentLocationName === map) {
				_refreshNotes(itemLocation);
			}
		});
		
		refreshAll();
	},
	
	/**
	 * Syncs up one item location, given the map and location name
	 */
	updateItemLocation: function(itemLocation) {
		let map = itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE ? itemLocation.ExitMap : itemLocation.Map;
		let region = itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE ? itemLocation.ExitRegion : itemLocation.Region;
		let name = itemLocation.Name;
		let matchingLocation;

		if (itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE) {
			matchingLocation = OwExits[map][name];

			let hasOwData = itemLocation.OwShuffleMap && itemLocation.OwShuffleExitName;
			Data.setOWLocationFound(map, itemLocation, itemLocation.OwShuffleMap, itemLocation.OwShuffleExitName, !hasOwData);

			if (_currentLocationName === map) {
				refreshEntranceDropdowns(itemLocation);
			}
		}
		else {
			matchingLocation = MapLocations[map].Regions[region].ItemLocations[name]
		}
		
		matchingLocation.playerHas = itemLocation.playerHas;
		matchingLocation.notes = itemLocation.notes;

		if (itemLocation.EntranceGroup) {
			matchingLocation.EntranceGroup = itemLocation.EntranceGroup;
		}
		
		if (_currentLocationName === map) {
			let expandIconDiv = document.getElementById(`${itemLocation.Name}-expand-icon`);
			let moreInfoNotesDiv = document.getElementById(`${itemLocation.Name}-inline-notes`);
			
			if (expandIconDiv && moreInfoNotesDiv) {
				moreInfoNotesDiv.innerText = itemLocation.notes || "";
				removeCssClass(expandIconDiv, "item-location-has-notes");
				
				if (itemLocation.notes) {
					addCssClass(expandIconDiv, "item-location-has-notes");
				}
			}	
		}
	},
	
	/**
	 * Updates the inventory item
	 * @param itemType - the object name of the item (Items, Equipment, Songs, Medallions, Keys)
	 * @param itemKey - the item name in the object (e.g. HOOKSHOT)
	 * @param item - the actual item object
	 */
	inventoryUpdated: function(itemType, itemKey, item) {
		if (this._socket) {
			this._socket.emit("inventory_updated", itemType, itemKey, item);
		}
	},
	
	/**
	 * Updates the item location
	 * @param itemLocation - the item location object that was updated
	 */
	itemLocationUpdated: function(itemLocation) {
		if (this._socket) {
			this._socket.emit("item_location_updated", itemLocation);
		}
	},

	/**
	 * Spawn location updated
	 */
	spawnLocationUpdated: function(randomizedSpawnLocations) {
		if (this._socket) {
			this._socket.emit("spawn_location_updated", randomizedSpawnLocations);
		}
	},

	/**
	 * Syncs over the OW shuffle location info
	 */
	owLocationUpdated: function(fromMapName, from, toMapName, toLocationName, clear) {
		if (this._socket) {
			this._socket.emit("ow_location_updated", fromMapName, from, toMapName, toLocationName, clear);
		}
	},
	
	/**
	 * Syncs all clients to the data that this client has
	 */
	syncAll: function() {
		if (this._socket) { 
			this._syncAllInventory();
			this._syncAllItemLocations();
			this._socket.emit("spawn_location_updated", Data.randomizedSpawnLocations);
		}
	},
	/**
	 * Syncs the entire inventory with all clients
	 */
	_syncAllInventory: function() {
		this._syncAllInventoryOfType("Items", Items);
		this._syncAllInventoryOfType("Equipment", Equipment);
		this._syncAllInventoryOfType("Songs", Songs);
		this._syncAllInventoryOfType("Medallions", Medallions);
		this._syncAllInventoryOfType("Keys", Keys);
	},
	
	/**
	 * Syncs all the items of the given type with all clients
	 * @param itemType - the item type string (e.g. "Items")
	 * @param itemObj - the actual item object (e.g. Items)
	 */
	_syncAllInventoryOfType: function(itemType, itemObj) {
		let _this = this;
		Object.keys(itemObj).forEach(function(itemKey) {
			let item = itemObj[itemKey];
			_this.inventoryUpdated(itemType, itemKey, item);
		});
	},
	
	/**
	 * Syncs all the item location data
	 */
	_syncAllItemLocations: function() {
		if (this._socket) {
			this._socket.emit("sync_all_item_locations", Data.getAllItemLocations(null, null, true));
		}
	}
};
