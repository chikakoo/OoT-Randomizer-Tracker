let MapGroups = {
	FOREST: 0,
	FIELD_MARKET: 1,
	KAKARIKO: 2,
	MOUNTAIN: 3,
	WATER: 4,
	DESERT: 5,
	DUNGEONS: 6,
    INTERIORS: 7
};

let ItemGroups = {
	CHEST: 0,
	GIFT: 1,
	FREESTANDING: 2,
	COW: 3,
	SKULLTULA: 4,
	SCRUB: 5,
	SHOP: 6,
	SONG: 7,
	FREESTANDING_RUPEES_AND_HEARTS: 8,
	WONDERITEM: 9,
	SILVER_RUPEE: 10,
	POT: 11,
	CRATE: 12,
	BEEHIVE: 13,
	NON_ITEM: 14,
	INTERIOR: 15,
	GROTTO: 16,
	BOSS_ENTRANCE: 17,
	GROUP: 18,
	OW_ENTRANCE: 19,
	GOSSIP_STONE: 20,
	LOCKED_DOOR: 21
};

let getItemGroupName = function(groupId) {
	switch(Number(groupId)) {
		case ItemGroups.CHEST: return "Chest";
		case ItemGroups.GIFT: return "Prizes and Gifts";
		case ItemGroups.FREESTANDING: return "Piece of Heart";
		case ItemGroups.COW: return "Cow";
		case ItemGroups.SKULLTULA: return "Skulltula";
		case ItemGroups.SCRUB: return "Scrub";
		case ItemGroups.SHOP: return "Shop";
		case ItemGroups.SONG: return "Songs";
		case ItemGroups.NON_ITEM: return "Magic Bean";
		case ItemGroups.INTERIOR: return "Interiors";
		case ItemGroups.GROTTO: return "Grottos";
		case ItemGroups.BOSS_ENTRANCE: return "Boss Key";
		case ItemGroups.OW_ENTRANCE: return "Compass";
		case ItemGroups.GOSSIP_STONE: return "Mask of Truth";
		case ItemGroups.LOCKED_DOOR: return "Locked Doors";
		case ItemGroups.FREESTANDING_RUPEES_AND_HEARTS: return "Rupees and Hearts";
		case ItemGroups.WONDERITEM: return "Wonderitem";
		case ItemGroups.SILVER_RUPEE: return "Silver Rupee";
		case ItemGroups.POT: return "Pot";
		case ItemGroups.CRATE: return "Crate";
		case ItemGroups.BEEHIVE: return "Beehive";
		default: return null;
	}
};

/**
 * Gets the item group image path to display
 * @param {number} groupId - The ID of the group image to look up
 * @param {Object} itemLocation - The item location to display
 * @returns The group image path, in the following priority order
 * - 1. MapImageName of the itemLocation, as it's the overridden display icon
 * - 2. The image from the item group name
 */
let getItemGroupImagePath = function(groupId, itemLocation) {
	let imageName = itemLocation.MapImageName;
	if (!imageName) {
		imageName = itemLocation.IsDungeonEntrance
			? "Dungeon Map"
			: getItemGroupName(groupId);
	}

	return getItemGroupImageFromName(imageName);
};

/**
 * 
 * @param {string} name - The name of the image name
 * @returns The item group image from the given name
 */
let getItemGroupImageFromName = function(name) {
	return name ? `url("Images/${name}.png")` : "";
};

/**
* Gets the background string for an item location
* @param itemLocation - the item location to get the group image for
*/
let getItemLocationGroupIcon = function(itemLocation) {
	if (itemLocation.ItemGroup === ItemGroups.GROUP && itemLocation.DefaultEntranceGroupName) {
		let groupName = itemLocation.DefaultEntranceGroupName;
		return EntranceUI.getEntranceGroupIcon(ItemLocationGroups[groupName], groupName);
	} else if (itemLocation.MapImageName) {
		return getItemGroupImageFromName(itemLocation.MapImageName);
	} else {
		let itemGroup = itemLocation.OverrideItemGroup
			? itemLocation.OverrideItemGroup
			: itemLocation.ItemGroup;
		return getItemGroupImagePath(itemGroup, itemLocation);
	}
 };

/**
 * Adds all the standard dungeons to the map locations
 */
let addAllStandardDungeons = function() {
	Object.keys(StandardDungeons).forEach(function(key) {
		let dungeon = StandardDungeons[key];
		MapLocations[key] = dungeon;
        MQDungeons[key].IsInUse = false;
	});
};

/**
 * Adds all master quest dungeons to the map locations
 */
let addAllMQDungeons = function() {
	Object.keys(MQDungeons).forEach(function(key) {
		let dungeon = MQDungeons[key];
		MapLocations[key] = dungeon;
		MQDungeons[key].IsInUse = true;
	});
};

/**
 * The map types - just an easy way to tell between standard and MQ
 */
let MapTypes = {
	STANDARD: 0,
	MASTER_QUEST: 1
};

/**
 * Toggles the map type
 */
let toggleDungeonMapType = function(mapName) {
	let map = MapLocations[mapName];
	if (map.MapGroup !== MapGroups.DUNGEONS) {
		return;
	}

	if (map.IsMasterQuest) {
		setDungeonTypeOfMap(mapName, MapTypes.STANDARD);
	} else {
		setDungeonTypeOfMap(mapName, MapTypes.MASTER_QUEST);
	}
    SocketClient.syncDungeonType(mapName);
    purgeLocations(); // Make sure that boss entrances are appropriately purged!
};

/**
 * Lets you set a particular map to the given type based on the name
 */
let setDungeonTypeOfMap = function(mapName, mapType) {
	if (mapType === MapTypes.STANDARD) {
		MapLocations[mapName] = StandardDungeons[mapName];
		MQDungeons[mapName].IsInUse = false;
	} else if (mapType === MapTypes.MASTER_QUEST) {
		MapLocations[mapName] = MQDungeons[mapName];
		MQDungeons[mapName].IsInUse = true;
	}
	LockedDoorWalker.compute(mapName);
	ItemTracker.setUp();
};