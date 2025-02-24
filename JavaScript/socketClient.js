SocketClient = {
	_socket: null,

	shouldSync: function() {
		return this._socket !== null && !SaveAndLoad.currentlyLoading;
	},
	
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

		// Sync up settings
		this._socket.on("sync_settings", function(settings) {
			Object.keys(settings).forEach(function(settingKey) {
				if (Settings[settingKey]) {
					Settings[settingKey] = settings[settingKey];
				}
			});
		});

		// Sync dungeon types - object contains: <mapName>: <dungoenTypeEnumValue>
		this._socket.on("sync_all_dungeon_types", function(dungeons) {
			Object.keys(dungeons).forEach(function(dungeonName) {
				setDungeonTypeOfMap(dungeonName, dungeons[dungeonName]);
			});
		});

		// Syncs a single dungeon type
		this._socket.on("sync_dungeon_type", function(dungeonName, dungeonType) {
			setDungeonTypeOfMap(dungeonName, dungeonType);
			refreshAll();
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
				case "ChildTradeItems":
					consoleOutput += `; Upgrade: ${item.currentUpgrade}`;
					
					ChildTradeItems[itemKey].playerHas = item.playerHas;
					ChildTradeItems[itemKey].currentUpgrade = item.currentUpgrade;
					break;
				case "AdultTradeItems":
					consoleOutput += `; Upgrade: ${item.currentUpgrade}`;
					
					AdultTradeItems[itemKey].playerHas = item.playerHas;
					AdultTradeItems[itemKey].currentUpgrade = item.currentUpgrade;
					break;
				case "Equipment":
					consoleOutput += `; Upgrade: ${item.currentUpgrade}`;
					
					Equipment[itemKey].playerHas = item.playerHas;
					Equipment[itemKey].currentUpgrade = item.currentUpgrade;
					
					if (itemKey === "EMPTY_BOTTLES") {
						Equipment[itemKey].count = item.count;
						consoleOutput = `Empty bottles were updated - Count: ${item.count}`;
					} else if (itemKey === "SKULLTULA_TOKENS") {
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

					delete Songs[itemKey].songNotes;
					Songs[itemKey].songNotes = item.songNotes;
					
					break;
				case "Medallions":
					Medallions[itemKey].playerHas = item.playerHas;
					break;
				case "Keys":
					consoleOutput = `${itemKey} keys were updated - Count: ${item.keyCount}; Have BK: ${item.playerHas}`;
					
					Keys[itemKey].playerHas = item.playerHas;
					Keys[itemKey].keyCount = item.keyCount;
					break;
				case "SilverRupees": 
					consoleOutput = `${itemKey} silver rupees were updated`;

					SilverRupees[itemKey].collectedRupees = item.collectedRupees;
					break;
				case "OcarinaButtons":
					consoleOutput = `${itemKey} ocarina buttons were updated`;

					OcarinaButtons[itemKey].playerHas = item.playerHas;
					break;
			}
			
			console.log(consoleOutput);
			
			ItemTracker.setUp(); // For the UI of the item tracker itself
			refreshAll();
		});
		
		// Syncs up all item locations
		this._socket.on("sync_all_item_locations", this.updateAllItemLocations);
		
		// Sync up when an item location is updated
		this._socket.on("item_location_updated", function(itemLocation) {
			let map = Data.usesOwExits(itemLocation)
				? itemLocation.ExitMap 
				: itemLocation.Map;
	    	console.log(`${itemLocation.Name} was updated at ${map} - Checked: ${itemLocation.playerHas}`);

			SocketClient.updateItemLocation(itemLocation);
			
			if (ItemLocationDisplay.currentLocationName === map) {
				ItemLocationDisplay.refreshNotes(itemLocation);
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
			let map = itemLocation.ItemGroup === ItemGroups.OW_ENTRANCE || Data.isEntrance(itemLocation)
				? itemLocation.ExitMap 
				: itemLocation.Map;

			console.log(`${itemLocation.Name} was updated at ${map} - Checked: ${itemLocation.playerHas}`);
			SocketClient.updateItemLocation(itemLocation);
			
			if (ItemLocationDisplay.currentLocationName === map) {
				ItemLocationDisplay.refreshNotes(itemLocation);
			}
		});
		
		refreshAll();
	},
	
	/**
	 * Syncs up one item location, given the map and location name
	 */
	updateItemLocation: function(itemLocation) {
		let isInOwExits = Data.usesOwExits(itemLocation);
		let map = isInOwExits ? itemLocation.ExitMap : itemLocation.Map;
		let region = isInOwExits ? itemLocation.ExitRegion : itemLocation.Region;
		let name = itemLocation.Name.trim();
		let matchingLocation = Data.usesOwExits(itemLocation)
			? OwExits[map][name]
			: MapLocations[map].Regions[region].ItemLocations[name];

		Data.setItemObtained(matchingLocation, itemLocation.playerHas);
		matchingLocation.notes = itemLocation.notes;
		matchingLocation.OverrideObtainableChild = itemLocation.OverrideObtainableChild;
		matchingLocation.OverrideObtainableAdult = itemLocation.OverrideObtainableAdult;

		matchingLocation.LinkedExit = itemLocation.LinkedExit;
		matchingLocation.OwShuffleExitName = itemLocation.OwShuffleExitName;
		matchingLocation.OwShuffleMap = itemLocation.OwShuffleMap;
		matchingLocation.OwShuffleRegion = itemLocation.OwShuffleRegion;

		this._updateOwDropdown(matchingLocation);

		// An entrance was sent with a group selected
		// We need to select the group and run the post-click, as well a refresh the dropdown
		let sentGroup = Data.getEntranceGroup(itemLocation);
		if (sentGroup) {
			let groupProperty = Data.usesDefaultGroup(itemLocation) ? "DefaultEntranceGroup" : "EntranceGroup";
			matchingLocation[groupProperty] = sentGroup;

			let group = EntranceUI.getEntranceData(matchingLocation)[sentGroup.name];
			if (group.postClick) {
				group.postClick(matchingLocation, true);
			}
			EntranceData.runPostClicks(matchingLocation);

			if (!itemLocation.IsItemLocationGroup) {
				this._updateInteriorOrGrottoDropdown(matchingLocation);

				// In case this entrance leads to an overworld, we ALSO need to refresh those dropdowns
				let matchingOwShuffleMap = matchingLocation.OwShuffleMap;
				let matchingOwShuffleExitName = matchingLocation.OwShuffleExitName;
				if (matchingOwShuffleMap && matchingOwShuffleExitName) {
					let linkedLocation = OwExits[matchingOwShuffleMap][matchingOwShuffleExitName];
					this._updateOwDropdown(linkedLocation);
				}
			}
		} 
		
		// An entrance was sent, and there's no group selected
		// We should clear the group and refresh the dropdown appropriately
		else if (Data.isEntrance(itemLocation) && !sentGroup) {
			// Grab this data before clearing the group!
			let matchingOwShuffleMap = matchingLocation.OwShuffleMap;
			let matchingOwShuffleExitName = matchingLocation.OwShuffleExitName;

			EntranceUI.clearGroupChoice(matchingLocation);
			this._updateInteriorOrGrottoDropdown(matchingLocation);

			// In case this entrance leads to an overworld, we ALSO need to refresh those dropdowns
			if (matchingOwShuffleMap && matchingOwShuffleExitName) {
				let linkedLocation = OwExits[matchingOwShuffleMap][matchingOwShuffleExitName];
				this._updateOwDropdown(linkedLocation);
			}
		}
		
		if (ItemLocationDisplay.currentLocationName === map) {
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
	 * Updates the dropdown of the given item location (assumed to be an OW Entrance)
	 * Does nothing if not applicable to the item location
	 * @param itemLocation - the item location to update
	 */
	_updateOwDropdown: function(itemLocation) {
		let locDropdown = DropdownUI.getItemLocationDropdown(itemLocation);
		let entranceDropdown = DropdownUI.getEntranceDropdown(itemLocation);
		let isInteriorOrGrotto = Data.isNonItemGroupEntrance(itemLocation);
		if (locDropdown && (entranceDropdown || isInteriorOrGrotto)) {
			DropdownUI.refreshEntranceDropdowns(itemLocation, locDropdown, entranceDropdown);
		}
	},

	/**
	 * Updates the dropdown of the given item location (assumed to be an interior or grotto)
	 * @param itemLocation - the item location to update
	 */
	_updateInteriorOrGrottoDropdown: function(itemLocation) {
		let locDropdown = DropdownUI.getItemLocationDropdown(itemLocation);
		if (locDropdown) {
			DropdownUI.refreshEntranceDropdowns(itemLocation, locDropdown);
		}
	},
	
	/**
	 * Updates the inventory item
	 * @param itemType - the object name of the item (Items, Equipment, Songs, Medallions, Keys)
	 * @param itemKey - the item name in the object (e.g. HOOKSHOT)
	 * @param item - the actual item object
	 */
	inventoryUpdated: function(itemType, itemKey, item) {
		if (this.shouldSync()) {
			this._socket.emit("inventory_updated", itemType, itemKey, item);
		}
	},
	
	/**
	 * Updates the item location
	 * @param itemLocation - the item location object that was updated
	 */
	itemLocationUpdated: function(itemLocation) {
		if (this.shouldSync()) {
			this._socket.emit("item_location_updated", itemLocation);
		}
	},

	/**
	 * Spawn location updated
	 */
	spawnLocationUpdated: function(randomizedSpawnLocations) {
		if (this.shouldSync()) {
			this._socket.emit("spawn_location_updated", randomizedSpawnLocations);
		}
	},

	/**
	 * Syncs over the OW shuffle location info
	 */
	owLocationUpdated: function(fromMapName, from, toMapName, toLocationName, clear) {
		if (this.shouldSync()) {
			this._socket.emit("ow_location_updated", fromMapName, from, toMapName, toLocationName, clear);
		}
	},
	
	/**
	 * Syncs all clients to the data that this client has
	 */
	syncAll: function() {
		if (this.shouldSync()) { 
			this._syncSettings();
			this._syncAllDungeonTypes();
			this._syncAllInventory();
			this._syncAllItemLocations();
			this._socket.emit("spawn_location_updated", Data.randomizedSpawnLocations);
		}
	},

	/**
	 * Syncs all the settings that are not trick-specific
	 */
	_syncSettings: function() {
		let settingsToSync = {
			ItemLocationsToExclude: Settings.ItemLocationsToExclude,
			RandomizerSettings: Settings.RandomizerSettings
		};
		this._socket.emit("sync_settings", settingsToSync);
	},

	/**
	 * Syncs all dungeon types - that is, turns them to MQ if necessary
	 */
	_syncAllDungeonTypes: function() {
		let dungeons = {};
		Object.keys(MapLocations).forEach(function (mapName) {
			let map = MapLocations[mapName];
			if (map.MapGroup === MapGroups.DUNGEONS) {
				dungeons[mapName] = map.IsMasterQuest ? MapTypes.MASTER_QUEST : MapTypes.STANDARD;
			}
		});
		this._socket.emit("sync_all_dungeon_types", dungeons);
	},

	/**
	 * Syncs the given dungeon's type
	 * @param {String} dungeonName The name of the dungeon
	 */
	syncDungeonType: function(dungeonName) {
		if (this.shouldSync()) {
			let dungeonType = MapLocations[dungeonName].IsMasterQuest ? MapTypes.MASTER_QUEST : MapTypes.STANDARD;
			this._socket.emit("sync_dungeon_type", dungeonName, dungeonType);
		}
	},

	/**
	 * Syncs the entire inventory with all clients
	 */
	_syncAllInventory: function() {
		this._syncAllInventoryOfType("Items", Items);
		this._syncAllInventoryOfType("ChildTradeItems", ChildTradeItems);
		this._syncAllInventoryOfType("AdultTradeItems", AdultTradeItems);
		this._syncAllInventoryOfType("Equipment", Equipment);
		this._syncAllInventoryOfType("Songs", Songs);
		this._syncAllInventoryOfType("Medallions", Medallions);
		this._syncAllInventoryOfType("Keys", Keys);
		this._syncAllInventoryOfType("SilverRupees", SilverRupees);
		this._syncAllInventoryOfType("OcarinaButtons", OcarinaButtons);
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
		if (this.shouldSync()) {
			this._socket.emit("sync_all_item_locations", Data.getAllItemLocations(null, null, true));
		}
	}
};
