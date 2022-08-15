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
	NON_ITEM: 8,
	ENTRANCE: 9,
	OW_ENTRANCE: 10,
	GOSSIP_STONE: 11,
	LOCKED_DOOR: 12,

	//TODO: adjust these numbers - should go before NON_ITEM probably, and the other freestanding should be grouped
	POT: 13,
	CRATE: 14,
	//Freestanding rupees
	//Freestanding hearts
	BEEHIVE: 15
};

let getItemGroupName = function(groupId) {
	switch(Number(groupId)) {
		case ItemGroups.CHEST: return "Chests";
		case ItemGroups.GIFT: return "Prizes and Gifts";
		case ItemGroups.FREESTANDING: return "Freestanding Items";
		case ItemGroups.COW: return "Cows";
		case ItemGroups.SKULLTULA: return "Gold Skulltulas";
		case ItemGroups.SCRUB: return "Business Scrubs";
		case ItemGroups.SHOP: return "Shops";
		case ItemGroups.SONG: return "Songs";
		case ItemGroups.NON_ITEM: return "Non-items";
		case ItemGroups.ENTRANCE: return "Entrances"; //TODO: relabel this to interior/grotto somehow
		case ItemGroups.OW_ENTRANCE: return "OW Entrances";
		case ItemGroups.GOSSIP_STONE: return "Gossip Stones";
		case ItemGroups.LOCKED_DOOR: return "Locked Doors";
		case ItemGroups.POT: return "Pot";
		// Freestanding rupees
		// Freestanding hearts
		case ItemGroups.BEEHIVE: return "Beehive";
		case ItemGroups.CRATE: return "Crate";
		default: return null;
	}
};

let getItemGroupImagePath = function(groupId) {
	let groupNameString = getItemGroupName(groupId);
	if (groupNameString === null) { return ""; }
	
	return `url("Images/Group Name ${groupNameString}.png")`;
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
};