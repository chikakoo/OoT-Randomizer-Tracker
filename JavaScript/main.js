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

	_assignItemLocationMapsAndRegions();
	
	if (Settings.RandomizerSettings.dungeonSetting === DungeonSettings.MASTER_QUEST) {
		addAllMQDungeons();
	} else { 
		addAllStandardDungeons(); // Mixed mode will start as standard by default
	}
	purgeLocations();

	RegionWalker.walk();
	
	LocationSidebar.refreshLocationList();
	setUpItemTracker();
	displayLocation("Kokiri Forest");
};

/**
 * Goes through all the item locations and assigns them their matching region and map
 * This is to cut down on lines/tedium/potential errors in the file
 */
let _assignItemLocationMapsAndRegions = function() {
	[MapLocations, StandardDungeons, MQDungeons].forEach(function(mapObject) {
		Object.keys(mapObject).forEach(function(mapName) {
			let regions = mapObject[mapName].Regions;
			Object.keys(regions).forEach(function(regionName) {
				let itemLocations = regions[regionName].ItemLocations;
				Object.keys(itemLocations).forEach(function(itemLocationName) {
					let itemLocation = itemLocations[itemLocationName];
					itemLocation.Map = mapName;
					itemLocation.Region = regionName;
				});
			});
		});
	});

	Object.keys(OwExits).forEach(function(mapName) {
		Object.keys(OwExits[mapName]).forEach(function(exitName) {
			let exit = OwExits[mapName][exitName];
			exit.ExitMap = mapName;
		});
	});
};

/**
 * Updates all the UI elements - used when something changes that could affect everything
 */
let refreshAll = function() {
	_performItemDisabling();

	RegionWalker.walk();

	updateItemDisplay();
	LocationSidebar.refreshLocationList();
	Walk.calculate();
	MapUI.refreshIcons();
	SpawnsPage.updateSongItemTooltips();

	if (_currentLocationName === "Notes") {
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
		let mapLocation = MapLocations[mapName];
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
			if (shouldDisableItemLocationGroup(itemLocation.ItemGroup, mapLocation.MapGroup === MapGroups.DUNGEONS, itemLocation.ScrubSanityNotRequired)) {
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

			// Beans
			if (Settings.RandomizerSettings.autoPlantBeans && itemLocation.IsBean) {
				itemLocation.disabled = true;
				return;
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
 * @returns True if we should disable the item location, false otherwise
 */
let shouldDisableItemLocationGroup = function(itemGroup, isDungeon, isScrubSanityRequired) {
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
				break;
			case ItemGroups.CRATE:
				shuffleLocationSettingValue = Settings.RandomizerSettings.crateSetting;
				break;

			// Scrubs
			case ItemGroups.SCRUB:
				return !Settings.RandomizerSettings.scrubSanity && !isScrubSanityRequired;

			// Shops
			case ItemGroups.SHOP:
				return !Settings.RandomizerSettings.shopSanity;

			// Cows
			case ItemGroups.COW:
				return !Settings.RandomizerSettings.cowSanity;

			// Locked Doors
			case ItemGroups.LOCKED_DOOR:
				return Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.KEYSY;

			// Gossip Stones
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