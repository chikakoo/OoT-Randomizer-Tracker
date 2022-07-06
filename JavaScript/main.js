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
		let itemsToExcludeMapInfo = Settings.ItemLocationsToExclude[mapName];
		
		Data.getAllItemLocations(mapName, null, true).forEach(function(itemLocation) {
			// Reset the cache - the values aren't valid anymore
			delete itemLocation.canDoChildCache;
			delete itemLocation.canDoAdultCache;
			
			// Entrances
			itemLocation.disabled = !Data.shouldDisplayItemLocation(itemLocation);
			
			// Gold Skulltulas
			if (itemLocation.ItemGroup === ItemGroups.SKULLTULA) {
				switch (Settings.RandomizerSettings.skulltulaSetting) {
					case SkulltulaSettings.NONE_REQUIRED:
						itemLocation.disabled = true;
						return;
					case SkulltulaSettings.DUNGEON_ONLY:
						if (mapLocation.MapGroup !== MapGroups.DUNGEONS) { 
							itemLocation.disabled = true; 
							return;
						}
						break;
					case SkulltulaSettings.OW_ONLY:
						if (mapLocation.MapGroup === MapGroups.DUNGEONS) {
							itemLocation.disabled = true;
							return;
						}
				}
			}
			
			// Token Rewards
			if (mapName === "Kakariko Village" && itemLocation.Name.includes("Gold Skulltula Reward")) {
				let numberOfTokens = Number(itemLocation.Name.split(" ")[0].trim());
				if (numberOfTokens > maxTokens) {
					itemLocation.disabled = true;
					return;
				}
			}
			
			// Scrubs
			if (!Settings.RandomizerSettings.scrubSanity && itemLocation.ItemGroup === ItemGroups.SCRUB && !itemLocation.ScrubSanityNotRequired) {
				itemLocation.disabled = true;
				return;
			}

			// Beans
			if (Settings.RandomizerSettings.autoPlantBeans && itemLocation.IsBean) {
				itemLocation.disabled = true;
				return;
			}
			
			// Shops
			if (!Settings.RandomizerSettings.shopSanity && itemLocation.ItemGroup === ItemGroups.SHOP) {
				itemLocation.disabled = true;
				return;
			}
			
			// Cows
			if (!Settings.RandomizerSettings.cowSanity && itemLocation.ItemGroup === ItemGroups.COW) {
				itemLocation.disabled = true;
				return;
			}

			// Keys
			if (Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.KEYSY && itemLocation.ItemGroup === ItemGroups.LOCKED_DOOR) {
				itemLocation.disabled = true;
				return;
			}
			
			// Gossip Stones
			if (Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.HIDE && itemLocation.ItemGroup === ItemGroups.GOSSIP_STONE) {
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

let _locationSmaller = false;