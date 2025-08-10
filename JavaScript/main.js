/**
 * Leave prompt
 */
window.onbeforeunload = function() {
  return "Please make sure you save before leaving!";
};

/**
 * The main function - handles all of the initial creation of the page
 */
let onPageLoad = function() {
	SocketClient.connect();

	_assignItemLocationAndExitValues();
	
	if (Settings.RandomizerSettings.dungeonSetting === DungeonSettings.MASTER_QUEST) {
		addAllMQDungeons();
	} else { 
		addAllStandardDungeons(); // Mixed mode will start as standard by default
	}
	purgeLocations();

	RegionWalker.walk();
	
	LocationSidebar.refreshLocationList();
	ItemTracker.setUp();
	ItemLocationDisplay.displayLocation("Kokiri Forest");
	LockedDoorWalker.computeAll();
};

/**
 * Goes through all the item locations and assigns them their matching region and map
 * This is to cut down on lines/tedium/potential errors in the file
 */
let _assignItemLocationAndExitValues = function() {
	[MapLocations, StandardDungeons, MQDungeons].forEach(function(mapObject) {
		Object.keys(mapObject).forEach(function(mapName) {
			let regions = mapObject[mapName].Regions;
			Object.keys(regions).forEach(function(regionName) {
				let itemLocations = regions[regionName].ItemLocations;
				let regionDisplayGroup = regions[regionName].DisplayGroup;
				let mostRecentRegionDisplayGroup = null;
				Object.keys(itemLocations).forEach(function(itemLocationName) {
					let itemLocation = itemLocations[itemLocationName];
					itemLocation.Name = itemLocationName;
					itemLocation.Map = mapName;
					itemLocation.Region = regionName;
					if (regionDisplayGroup && !itemLocation.DisplayGroup) { 
						// Use the most recently found display group, if available
						// Otherwise, we use the one that is on the region level
						itemLocation.DisplayGroup = mostRecentRegionDisplayGroup
							? mostRecentRegionDisplayGroup
							: regionDisplayGroup; 
					}
					mostRecentRegionDisplayGroup = itemLocation.DisplayGroup;
					itemLocation.IsDungeon = mapObject[mapName].MapGroup === MapGroups.DUNGEONS;

					_addToSpoilerLogItemMap(itemLocation);
				});

				let exits = regions[regionName].Exits;
				mostRecentRegionDisplayGroup = null;
				Object.keys(exits).forEach(function(exitName) {
					let exit = exits[exitName];
					exit.Name = exitName;
					if (regionDisplayGroup && exit.OwExit) {
						exit.OwExit.DisplayGroup ??= mostRecentRegionDisplayGroup
							? mostRecentRegionDisplayGroup
							: regionDisplayGroup;
					}
					mostRecentRegionDisplayGroup = exit?.OwExit?.DisplayGroup;
				});
			});
		});
	});

	Object.keys(OwExits).forEach(function(mapName) {
		Object.keys(OwExits[mapName]).forEach(function(exitName) {
			let exit = OwExits[mapName][exitName];
			exit.Name = exitName;
			exit.ExitMap = mapName;
			exit.IsDungeon = exit.ItemGroup === ItemGroups.BOSS_ENTRANCE;
		});
	});
};

/**
 * Adds the item location to the spoiler log item map
 * Assumes it has been populated with its map and region
 */
let _addToSpoilerLogItemMap = function(itemLocation) {
	if (itemLocation.SpoilerLogName) {
		if (itemLocation.SpoilerLogCount) {
			for (let i = 1; i <= itemLocation.SpoilerLogCount; i++) {
				let spoilerLogEntry = itemLocation.SpoilerLogName.replace("{#}", i);
				SpoilerLogItemMap[spoilerLogEntry] = itemLocation;
			}
		} else {
			SpoilerLogItemMap[itemLocation.SpoilerLogName] = itemLocation;
		}
	}
};

/**
 * Updates all the UI elements - used when something changes that could affect everything
 */
let refreshAll = function() {
	_performItemDisabling();

	RegionWalker.walk();

	ItemLocationDisplay.updateItemDisplay();
	LocationSidebar.refreshLocationList();
	Walk.calculate();
	MapUI.refreshIcons();
	SpawnsPage.updateSongItemTooltips();

	if (ItemLocationDisplay.currentLocationName === "Notes") {
		NotesPage.display();
	}
};

/**
 * Purges locations based on the randomizer settings
 */
let purgeLocations = function() {
	_performItemDisabling();
};

/**
 * Disable all appropriate item groups
 */
let _performItemDisabling = function() {
	let maxTokens = Settings.RandomizerSettings.maxRequiredTokens;
	let mapNames = Object.keys(MapLocations);
	mapNames.forEach(function (mapName) {
		let itemsToExcludeMapInfo = Settings.ItemLocationsToExclude.Maps && Settings.ItemLocationsToExclude.Maps[mapName];
		
		Data.getAllItemLocations(mapName, null, true).forEach(function(itemLocation) {
			// Reset the cache - the values aren't valid anymore
			delete itemLocation.canDoChildCache;
			delete itemLocation.canDoAdultCache;
			
			// Entrances
			itemLocation.disabled = !Data.shouldDisplayItemLocation(itemLocation);

			// This will disable the group selection and select the appropriate group where appropriate
			if (!Data.setUpDefaultEntranceGroup(itemLocation)) {
				itemLocation.disabled = true;
				return;
			};
			
			// Disable based on the item group
			let itemGroup = itemLocation.OverrideItemGroup !== undefined
				? itemLocation.OverrideItemGroup
				: itemLocation.ItemGroup;
			if (shouldDisableItemLocationGroup(
					itemGroup, itemLocation.IsDungeon, itemLocation.ScrubSanityNotRequired, itemLocation.IsEmpty)) {
				itemLocation.disabled = true;
				return;
			}
			
			// Token Rewards
			if (mapName === "Kakariko Village" && itemLocation.Name.includes("Gold Skulltula Reward")) {
				let numberOfTokens = Number(itemLocation.Name.split(" ")[0].trim());
				if (numberOfTokens > maxTokens) {
					itemLocation.disabled = true;
					return;
				}
			}

			// Co-op locations when it's not co-op
			if (itemLocation.CoOpOnly && !SocketClient.isCoOp()) {
				itemLocation.disabled = true;
				return;
			}
			
			// All specifically excluded items
			if (itemsToExcludeMapInfo && itemsToExcludeMapInfo.includes(itemLocation.Name)) {
				itemLocation.disabled = true;
				return;
			}
			
			// Items with custom exclusion functions
			if (itemLocation.RequiredToAppear && !itemLocation.RequiredToAppear()) {
				itemLocation.disabled = true;
				return;
			}
		});
	});
};

/**
 * Returns whether we should disable the item location group based on their item group
 * @param {Number} itemGroup - the item group to check
 * @param {Boolean} isDungeon - (false by default) whether the item location is in a dungeon
 * @param {Boolean} isScrubSanityRequired (false by default) whether scrub sanity is required for this scrub item
 * @param {Boolean} isEmpty (false by default) wher this is an empty pot or crate location
 * @returns True if we should disable the item location, false otherwise
 */
let shouldDisableItemLocationGroup = function(itemGroup, isDungeon, isScrubSanityRequired, isEmpty) {
		let shuffleLocationSettingValue = null;
		switch(itemGroup) {
			case ItemGroups.SKULLTULA:
				shuffleLocationSettingValue = Settings.RandomizerSettings.skulltulaSetting;
				break;
			case ItemGroups.FREESTANDING_RUPEES_AND_HEARTS:
				shuffleLocationSettingValue = Settings.RandomizerSettings.rupeeAndHeartSetting;
				break;
			case ItemGroups.POT:
				shuffleLocationSettingValue = Settings.RandomizerSettings.potSetting;
				if (isEmpty && !Settings.RandomizerSettings.shuffleEmptyPots) {
					return true;
				}
				break;
			case ItemGroups.CRATE:
				shuffleLocationSettingValue = Settings.RandomizerSettings.crateSetting;
				if (isEmpty && !Settings.RandomizerSettings.shuffleEmptyCrates) {
					return true;
				}
				break;

			case ItemGroups.WONDERITEM:
				return !Settings.RandomizerSettings.shuffleWonderitems;
			case ItemGroups.SILVER_RUPEE:
				return !Settings.RandomizerSettings.shuffleSilverRupees;
			case ItemGroups.SCRUB:
				return !Settings.RandomizerSettings.scrubSanity && !isScrubSanityRequired;
			case ItemGroups.SHOP:
				return !Settings.RandomizerSettings.shopSanity;
			case ItemGroups.COW:
				return !Settings.RandomizerSettings.cowSanity;
			case ItemGroups.BEEHIVE:
				return !Settings.RandomizerSettings.shuffleBeehives;
			case ItemGroups.LOCKED_DOOR:
				return Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.KEYSY;
			case ItemGroups.GOSSIP_STONE:
				return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.HIDE;
		}

		// Check any shuffle location setting: Gold Skulltulas, Rupees and Hearts, Pots, and Crates
		switch (shuffleLocationSettingValue) {
			case ShuffleLocationSettings.OFF:
				return true;
			case ShuffleLocationSettings.ALL:
				return false;
			case ShuffleLocationSettings.DUNGEON_ONLY:
				return !isDungeon;
			case ShuffleLocationSettings.OW_ONLY:
				return isDungeon;
		}

		// We didn't find a reason to disable the item
		return false;
};

let _locationSmaller = false;