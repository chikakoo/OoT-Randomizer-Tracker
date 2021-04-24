let MapGroups = {
	FOREST: 0,
	FIELD_MARKET: 1,
	KAKARIKO: 2,
	MOUNTAIN: 3,
	WATER: 4,
	DESERT: 5,
	DUNGEONS: 6
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
	LOCKED_DOOR: 12
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
		case ItemGroups.ENTRANCE: return "Entrances";
		case ItemGroups.OW_ENTRANCE: return "OW Entrances";
		case ItemGroups.GOSSIP_STONE: return "Gossip Stones";
		case ItemGroups.LOCKED_DOOR: return "Locked Doors";
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
	if (Data.getDoesEntranceShuffleApply(mapName)) {
		let shuffledMapName = MapLocations[mapName].ShuffledDungeon;
		if (!shuffledMapName) {
			return;
		}

		map = MapLocations[shuffledMapName];
		mapName = shuffledMapName;
	}

	if (map.IsMasterQuest) {
		_setDungeonTypeOfMap(mapName, MapTypes.STANDARD);
	} else {
		_setDungeonTypeOfMap(mapName, MapTypes.MASTER_QUEST);
	}
};
/**
 * Lets you set a particular map to the given type based on the name
 */
let _setDungeonTypeOfMap = function(mapName, mapType) {
	if (mapType === MapTypes.STANDARD) {
		MapLocations[mapName] = StandardDungeons[mapName];
		MQDungeons[mapName].IsInUse = false;
	} else if (mapType === MapTypes.MASTER_QUEST) {
		MapLocations[mapName] = MQDungeons[mapName];
		MQDungeons[mapName].IsInUse = true;
	}
};

let OwExits = {
    "Kokiri Forest": {
        "Lost Woods Bottom": {
            Name: "Lost Woods Bottom",
            ExitRegion: "main",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 46, y: 130 },
            Age: Age.EITHER,
            LongDescription: "This is the bottom entrance to the Lost Woods.",
            CustomRequirement: function(age) {
                if (age === Age.ADULT || Settings.RandomizerSettings.openForest) { return true; }
				
				let beatDekuTree = Data.itemLocationObtained("Deku Tree", "bossRoom", "Blue Warp");
				let canPokeySkip = Settings.GlitchesToAllow.pokeySkip && 
					Data.hasSwordWeapon(age) &&
                    Equipment.DEKU_SHIELD.playerHas;

                return beatDekuTree || canPokeySkip;
            }
        },
        "Lost Woods Top": {
            Name: "Lost Woods Top",
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 133, y: 13 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Lost Woods that is up the vines."
        },
        "Deku Tree Entrance": {
            Name: "Deku Tree Entrance",
            ExitRegion: "afterMido",
            Map: "Deku Tree",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 263, y: 65 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Deku Tree.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true,
            CustomRequirement: function(age) {
                let isEntranceShuffle = Data.getDoesEntranceShuffleApply("Deku Tree");
                return isEntranceShuffle ? true : age === Age.CHILD;
            }
        }
    },

    "Lost Woods": {
        "To Kokiri Forest": {
            Name: "To Kokiri Forest",
            ExitRegion: "firstHalf",
            Map: "Kokiri Forest",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 165, y: 187 },
            Age: Age.EITHER,
            LongDescription: "This is ANY of the entrances leading back to Kokiri."
        },
        "Goron City": {
            Name: "Goron City",
            ExitRegion: "firstHalf",
            Map: "Goron City",
            Region: "lostWoods",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 209, y: 111 },
            Age: Age.EITHER,
            LongDescription: "This is the exit to Goron City."
        },
        "Zora's River": {
            Name: "Zora's River",
            ExitRegion: "firstHalf",
            Map: "Zora's River",
            Region: "upstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 284, y: 126 },
            Age: Age.EITHER,
            CustomRequirement: function(age) {
                let canGetToRiver = Equipment.SCALE.playerHas || 
                    (age === Age.CHILD && Settings.GlitchesToAllow.zorasRiverScaleless && Data.hasSwordWeapon(age));
                return canGetToRiver;
            },
            LongDescription: "This is the exit to Zora's River that you get to by diving."
        },
        "To Lost Woods Bridge": {
            Name: "To Lost Woods Bridge",
            ExitRegion: "firstHalf",
            Map: "Lost Woods Bridge",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 86, y: 251},
            Age: Age.ADULT,
            OneWayEntrance: true,
            CustomRequirement: function(age) {
                return Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade === 2 || Data.itemLocationObtained("Lost Woods", "firstHalf", "*Plant Bean by Bridge");
            },
            OwShuffleMap: "Lost Woods Bridge",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Kokiri Forest Bridge",
            ReadOnly: true,
            LongDescription: "This is taken via the magic bean, hover boots, or by longshotting to the bridge."
        },
        "Sacred Forest Meadow": {
            Name: "Sacred Forest Meadow",
            ExitRegion: "secondHalf",
            Map: "Sacred Forest Meadow",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 211, y: 21 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Sacred Forest Meadow."
        }
    },

    "Lost Woods Bridge": {
        "Hyrule Field Bridge": {
            Name: "Hyrule Field Bridge",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 132, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the Hyrule Field exit from the bridge."
        },
        "Kokiri Forest Bridge": {
            Name: "Kokiri Forest Bridge",
            ExitRegion: "main",
            Map: "Kokiri Forest",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 221, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the Kokiri Forest exit from the bridge."
        },
        "Bridge to Lost Woods": {
            Name: "Bridge to Lost Woods",
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 148, y: 74 },
            ReadOnly: true,
            OwShuffleMap: "Lost Woods",
            OwShuffleRegion: "firstHalf",
            OwShuffleExitName: "To Kokiri Forest",
            Age: Age.ADULT,
            LongDescription: "Longshot from the bridge to the ladder to get to the lost woods.",
            CustomRequirement: function(age) {
                return Items.HOOKSHOT.currentUpgrade === 2;
            }
        }
    },

    "Sacred Forest Meadow": {
        "Lost Woods": {
            Name: "Lost Woods",
            ExitRegion: "main",
            Map: "Lost Woods",
            Region: "secondHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 178, y: 288 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back into the Lost Woods."
        },
        "Minuet Teleport Pad": {
            Name: "Minuet Teleport Pad",
            ExitRegion: "afterGate",
            Map: "Sacred Forest Meadow",
            Region: "afterGate",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Minuet of Forest teleport pad at the end of the Sacred Forest Meadow.",
        },
        "Forest Temple Entrance": {
            Name: "Forest Temple Entrance",
            ExitRegion: "afterGate",
            Map: "Forest Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 190, y: 10 },
            Age: Age.ADULT,
            LongDescription: "This is the entrance to the Forest Temple.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true,
            RequiredItems: [Items.HOOKSHOT]
        }
    },

    "Hyrule Field": {
        "Kokiri Forest": {
            Name: "Kokiri Forest",
            ExitRegion: "main",
            Map: "Kokiri Forest",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 326, y: 172 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Kokiri Forest."
        },
        "Zora's River": {
            Name: "Zora's River",
            ExitRegion: "main",
            Map: "Zora's River",
            Region: "downstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 320, y: 68 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's River. The water and land exits will go to the same place."
        },
        "Kakariko Village": {
            Name: "Kakariko Village",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 276, y: 17 },
            Region: "main",
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Kakariko."
        },
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market Entrance",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 197, y: 24 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Market."
        },
        "Lon Lon Ranch": {
            Name: "Lon Lon Ranch",
            ExitRegion: "main",
            Map: "Lon Lon Ranch",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 164, y: 72 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Lon Lon Ranch in the center of the map."
        },
        "Gerudo Valley": {
            Name: "Gerudo Valley",
            ExitRegion: "main",
            Map: "Gerudo Valley",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 29, y: 137 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Gerudo Valley."
        },
        "Lake Hylia": {
            Name: "Lake Hylia",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 64, y: 290 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Lake Hylia."
        }
    },

    "Lon Lon Ranch": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 218, y: 32 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule Field."
        }
    },

    "Market Entrance": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 166, y: 31},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        },
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 166, y: 261},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule field."
        }
    },

    "Market": {
        "Market Entrance": {
            Name: "Market Entrance",
            ExitRegion: "main",
            Map: "Market Entrance",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 261, y: 246},
            Age: Age.EITHER,
            LongDescription: "This is the path to the market entrance."
        },
        "Hyrule Castle": {
            Name: "Hyrule Castle",
            ExitRegion: "main",
            Map: "Castle",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 261, y: 47},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Castle."
        },
        "Temple of Time": {
            Name: "Temple of Time",
            ExitRegion: "main",
            Map: "Temple of Time",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 350, y: 136},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Temple of Time area."
        }
    },

    "Temple of Time": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 23, y: 239},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        }
    },

    "Castle": {
        "Market": {
            Name: "Market",
            ExitRegion: "main",
            Map: "Market",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 100, y: 290, floor: "ANY" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the main market area."
        },

        "Ganon's Castle Entrance": {
            Name: "Ganon's Castle Entrance",
            ExitRegion: "main",
            Map: "Ganon's Castle",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 }, // We'll never care about this
            Age: Age.ADULT,
            LongDescription: "This is the entrance to the Deku Tree.",
            OneWayEntrance: true,
            IsDungeonEntrance: true,
            disabled: true, // This shouldn't show up as a task; disabling will still let the region walker walk here
            ReadOnly: true,
            CustomRequirement: function(age) {
				switch (Settings.RandomizerSettings.medallionSetting) {
					case MedallionSettings.VANILLA:
						return Items.LIGHT_ARROW.playerHas &&
							Data.hasRequiredMedallions({ 
								RequiredMedallions: [Medallions.SHADOW_MEDALLION, Medallions.SPIRIT_MEDALLION] 
							});
					case MedallionSettings.OPEN:
						return true;
					case MedallionSettings.ALL_MEDALLIONS:
						return Data.hasRequiredMedallions({
							RequiredMedallions: [
								Medallions.FOREST_MEDALLION,
								Medallions.FIRE_MEDALLION,
								Medallions.WATER_MEDALLION,
								Medallions.SHADOW_MEDALLION,
								Medallions.SPIRIT_MEDALLION,
								Medallions.LIGHT_MEDALLION
							]
						});
					case MedallionSettings.ALL_DUNGEONS:
						return Data.hasRequiredMedallions({
							RequiredMedallions: [
								Medallions.KOKIRIS_EMERALD,
								Medallions.GORONS_RUBY,
								Medallions.ZORAS_SAPPHIRE,
								Medallions.FOREST_MEDALLION,
								Medallions.FIRE_MEDALLION,
								Medallions.WATER_MEDALLION,
								Medallions.SHADOW_MEDALLION,
								Medallions.SPIRIT_MEDALLION,
								Medallions.LIGHT_MEDALLION
							]
						});
					case MedallionSettings.ALL_STONES:
						return Data.hasRequiredMedallions({
							RequiredMedallions: [
								Medallions.KOKIRIS_EMERALD,
								Medallions.GORONS_RUBY,
								Medallions.ZORAS_SAPPHIRE
							]
						});
					case MedallionSettings.SKULLTULAS:
						return Equipment.SKULLTULA_TOKENS.count >= Settings.RandomizerSettings.medallionSkulltulaSetting;
                    default: return true;
                }
            }
        }
    },

    "Kakariko Village": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 14, y: 213},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Hyrule Field."
        },
        "Graveyard": {
            Name: "Graveyard",
            ExitRegion: "main",
            Map: "Graveyard",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 302, y: 234},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the graveyard."
        },
        "Death Mountain Trail": {
            Name: "Death Mountain Trail",
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 126, y: 33},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to Death Mountain."
        },
        "Bottom of the Well Entrance": {
            Name: "Bottom of the Well Entrance",
            ExitRegion: "main",
            Map: "Bottom of the Well",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 227, y: 170 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Bottom of the Well.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true,
            CustomRequirement: function(age) {
                if (!Data.canBeAge(Age.CHILD)) { return false; }
                if (age === Age.ADULT && !Settings.RandomizerSettings.shuffleDungeonEntrances) {
                    return false;
                }
                
                // Cucco dive
                let canGetThereEarly = age === Age.CHILD && 
                    Settings.GlitchesToAllow.botwCuccoDive && 
                    Data.hasSwordWeapon(age) && 
                    Data.hasShield(age);
				if (canGetThereEarly) { return true; }
                
                // Get in normally - non-interior shuffle
                if (!Settings.RandomizerSettings.shuffleInteriorEntrances) {
                    return Data.canPlaySong(Songs.SONG_OF_STORMS);
                }
                
                return Data.interiorShuffleIsWindmillDrained;
            }
        }
    },

    "Graveyard": {
        "Kakariko Village": {
            Name: "Kakariko Village",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 17, y: 180},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the village."
        },
        "Nocturne Teleport Pad": {
            Name: "Nocturne Teleport Pad",
            ExitRegion: "top",
            Map: "Graveyard",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Nocturne of Shadow teleport pad on the top part of the graveyard.",
        },
        "Shadow Temple Entrance": {
            Name: "Shadow Temple Entrance",
            ExitRegion: "top",
            Map: "Shadow Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 275, y: 140 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Shadow Temple.",
            OneWayEntrance: true,
            IsDungeonEntrance: true,
            ReadOnly: true
        }
    },

    "Death Mountain Trail": {
        "Kakariko Village": {
            Name: "Kakariko Village",
            ExitRegion: "main",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 126, y: 290},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the village."
        },
        "Goron City": {
            Name: "Goron City",
            ExitRegion: "main",
            Map: "Goron City",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 237, y: 150},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Goron City."
        },
        "Death Mountain Crater": {
            Name: "Death Mountain Crater",
            ExitRegion: "upper",
            Map: "Death Mountain Crater",
            Region: "top",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 233, y: 10},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the crater at the top of the mountain"
        },
        "Owl": {
            Name: "Owl",
            ExitRegion: "upper",
            Map: "Kakariko Village",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsOwl: true,
            OneWayEntrance: true,
            MapInfo: {x: 226, y: 25},
            Age: Age.CHILD,
            LongDescription: "This is the owl at the top of the mountain by the crater entrance."
        },
        "Dodongo's Cavern Entrance": {
            Name: "Dodongo's Cavern Entrance",
            ExitRegion: "main",
            Map: "Dodongo's Cavern",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 175, y: 172 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Dodongo's Cavern.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true,
            CustomRequirement: function(age) {
				return age === Age.ADULT || Data.hasExplosivesOrStrength();
            }
        }
    },

    "Death Mountain Crater": {
        "Mountain Top": {
            Name: "Mountain Top",
            ExitRegion: "top",
            Map: "Death Mountain Trail",
            Region: "upper",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 86, y: 263},
            Age: Age.EITHER,
            LongDescription: "This is the entrance at the top of the crater."
        },
        "Goron City": {
            Name: "Goron City",
            ExitRegion: "middle",
            Map: "Goron City",
            Region: "darunia",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 47, y: 89},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Goron City."
        },
        "Bolero Teleport Pad": {
            Name: "Bolero Teleport Pad",
            ExitRegion: "bottom",
            Map: "Death Mountain Crater",
            Region: "bottom",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Bolero of Fire teleport pad at the bottom of Death Mountain Crater.",
        },
        "Fire Temple Entrance": {
            Name: "Fire Temple Entrance",
            ExitRegion: "bottom",
            Map: "Fire Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 190, y: 10 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Fire Temple.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true,
            CustomRequirement: function(age) {
                return age === Age.ADULT || Settings.RandomizerSettings.shuffleDungeonEntrances;
            }
        }
    },

    "Goron City": {
        "Death Mountain Trail": {
            Name: "Death Mountain Trail",
            ExitRegion: "main",
            Map: "Death Mountain Trail",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 181, y: 264},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the trail at the top of the city."
        },
        "Lost Woods": {
            Name: "Lost Woods",
            ExitRegion: "lostWoods",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 211, y: 179},
            Age: Age.EITHER,
            LongDescription: "This is the entrance blocked by rocks on the second floor."
        },
        "Death Mountain Crater": {
            Name: "Death Mountain Crater",
            ExitRegion: "darunia",
            Map: "Death Mountain Crater",
            Region: "middle",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 185, y: 10},
            Age: Age.ADULT,
            LongDescription: "This is the entrance behind darunia's room - push back the statue."
        }
    },

    "Zora's River": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "downstream",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 13, y: 246},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Field at the start of the river - either exit will take you to the same place."
        },
        "Lost Woods": {
            Name: "Lost Woods",
            ExitRegion: "upstream",
            Map: "Lost Woods",
            Region: "firstHalf",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 330, y: 119},
            Age: Age.EITHER,
            RequiredItems: [Equipment.SCALE],
            LongDescription: "This is the entrance you get to by diving into the water near the waterfall."
        },
        "Zora's Domain": {
            Name: "Zora's Domain",
            ExitRegion: "inWaterfall",
            Map: "Zora's Domain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 332, y: 61 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the domain - play Zelda's Lullaby on the symbol by the waterfall."
        },
    },

    "Zora's Domain": {
        "Zora's River": {
            Name: "Zora's River",
            ExitRegion: "main",
            Map: "Zora's River",
            Region: "upstream",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 77, y: 190},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's River."
        },
        "Lake Hylia": {
            Name: "Lake Hylia",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 173, y: 241},
            Age: Age.CHILD,
            LongDescription: "This is the entrance to Zora's River you can get to by diving into the water.",
            RequiredItems: [Equipment.SCALE]
        },
        "Zora's Fountain": {
            Name: "Zora's Fountain",
            ExitRegion: "behindKing",
            Map: "Zora's Fountain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 219, y: 44},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's Fountain behind King Zora."
        }
    },

    "Zora's Fountain": {
        "Zora's Domain": {
            Name: "Zora's Domain",
            ExitRegion: "main",
            Map: "Zora's Domain",
            Region: "behindKing",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 69, y: 139},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Zora's Domain."
        },
        "Jabu Jabu's Belly Entrance": {
            Name: "Jabu Jabu's Belly Entrance",
            ExitRegion: "main",
            Map: "Jabu Jabu's Belly",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 142, y: 97 },
            Age: Age.CHILD,
            LongDescription: "This is the entrance to Jabu Jabu.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true
        },
        "Ice Cavern Entrance": {
            Name: "Ice Cavern Entrance",
            ExitRegion: "main",
            Map: "Ice Cavern",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 185, y: 19 },
            Age: Age.ADULT,
            LongDescription: "This is the entrance to the Ice Cavern.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true
        }
    },

    "Lake Hylia": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 133, y: 12},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to Hyrule Field."
        },
        "Zora's Domain": {
            Name: "Zora's Domain",
            ExitRegion: "main",
            Map: "Zora's Domain",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 169, y: 89},
            Age: Age.CHILD,
            LongDescription: "This is the entrance to Zora's Domain.",
            RequiredItems: [Equipment.SCALE],
        },
        "Owl": {
            Name: "Owl",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            IsOwl: true,
            OneWayEntrance: true,
            MapInfo: {x: 85, y: 177},
            Age: Age.CHILD,
            LongDescription: "This is the owl by the gravestone across the bridge."
        },
        "Serenade Teleport Pad": {
            Name: "Serenade Teleport Pad",
            ExitRegion: "main",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Serenade of Water teleport pad on the island in Lake Hylia.",
        },
        "Water Temple Entrance": {
            Name: "Water Temple Entrance",
            ExitRegion: "main",
            Map: "Water Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 204, y: 215 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Water Temple.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true,
            CustomRequirement: function(age) {
                let canEnterNormally = Equipment.IRON_BOOTS.playerHas && Items.HOOKSHOT.playerHas;
				let canDiveDown = Items.HOOKSHOT.currentUpgrade === 2 && Equipment.SCALE.currentUpgrade === 2;
				if (age === Age.ADULT && (canEnterNormally || canDiveDown)) {
					return true;
				};
                if (!Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
                
				let defeatedMorpha = Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
				let canHitSwitch = age === Age.ADULT || (Data.hasDamagingItem(age) && Equipment.SCALE.currentUpgrade === 2);
				return defeatedMorpha && canHitSwitch;
            }
        }
    },

    "Gerudo Valley": {
        "Hyrule Field": {
            Name: "Hyrule Field",
            ExitRegion: "main",
            Map: "Hyrule Field",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 304, y: 114},
            Age: Age.EITHER,
            LongDescription: "This is the eastern exit."
        },
        "Gerudo Fortress": {
            Name: "Gerudo Fortress",
            ExitRegion: "acrossBridge",
            Map: "Gerudo Fortress",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 62, y: 51},
            Age: Age.EITHER,
            LongDescription: "This is the western exit."
        },
        "To Lake Hylia": {
            Name: "To Lake Hylia",
            ExitRegion: "chasm",
            Map: "Lake Hylia",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 275, y: 275},
            Age: Age.EITHER,
            Region: "main",
            OneWayEntrance: true,
            OwShuffleMap: "Lake Hylia",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Hyrule Field",
            ReadOnly: true,
            LongDescription: "This is the river exit to the lake. It will ALWAYS lead to the lake."
        }
    },

    "Gerudo Fortress": {
        "Gerudo Valley": {
            Name: "Gerudo Valley",
            ExitRegion: "main",
            Map: "Gerudo Valley",
            Region: "acrossBridge",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 158, y: 284},
            Age: Age.EITHER,
            LongDescription: "This is the exit back to the valley."
        },
        "Haunted Wasteland": {
            Name: "Haunted Wasteland",
            ExitRegion: "wastelandEntrance",
            Map: "Haunted Wasteland",
            Region: "entrance",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 77, y: 112},
            Age: Age.EITHER,
            LongDescription: "This is the exit to the wasteland."
        },
        "Training Grounds Entrance": {
            Name: "Training Grounds Entrance",
            ExitRegion: "main",
            Map: "Training Grounds",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 124, y: 197 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Gerudo Training Grounds.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true,
            CustomRequirement: function(age) {
				if (age === Age.CHILD) {
					return Settings.GlitchesToAllow.gtgChildAllowed;
                }
                
				return Settings.GlitchesToAllow.gtgAdultNoCard || Data.areGerudoGuardsTame();
            }
        }
    },

    "Haunted Wasteland": {
        "Gerudo Fortress": {
            Name: "Gerudo Fortress",
            ExitRegion: "entrance",
            Map: "Gerudo Fortress",
            Region: "wastelandEntrance",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 310, y: 281},
            Age: Age.EITHER,
            LongDescription: "This is the entrance back to the fortress."
        },
        "Desert Colossus": {
            Name: "Desert Colossus",
            ExitRegion: "exit",
            Map: "Desert Colossus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: {x: 45, y: 133},
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the colossus."
        }
    },

    "Desert Colossus": {
        "Haunted Wasteland": {
            Name: "Haunted Wasteland",
            ExitRegion: "main",
            Map: "Haunted Wasteland",
            Region: "exit",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 318, y: 111 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the wasteland."
        },
        "Requiem Teleport Pad": {
            Name: "Requiem Teleport Pad",
            ExitRegion: "main",
            Map: "Requiem Teleport Pad",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 },
            Hide: true,
            LongDescription: "The Requiem of Spirit teleport pad at Desert Colossus.",
        },
        "Spirit Temple Entrance": {
            Name: "Spirit Temple Entrance",
            ExitRegion: "main",
            Map: "Spirit Temple",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 63, y: 150 },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the Spirit Temple.",
            OneWayEntrance: true, // This is only used for Spirit Temple to Desert Colossus checks
            IsDungeonEntrance: true,
            ReadOnly: true
        },
        "Spirit Temple Hands": {
            Name: "Spirit Temple Hands",
            ExitRegion: "main",
            ComputedEntrance: function() {
                return Data.getDungeonEntranceInfo("Spirit Temple");
            },
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: -100, y: -100 }, // We don't really want to see this
            Hide: true,
            ReadOnly: true,
            Age: Age.EITHER,
            LongDescription: "These are the hands at the top of the Spirit Temple.",
            CustomRequirement(age) {
                return false;
            }
        },
    },

    "Spirit Temple": {
        "Desert Colossus": {
            Name: "Desert Colossus",
            ExitRegion: "silverGauntsStatueHand",
            Map: "Desert Colossus",
            Region: "main",
            ItemGroup: ItemGroups.OW_ENTRANCE,
            MapInfo: { x: 174, y: 241, floor: "F3" },
            Age: Age.EITHER,
            LongDescription: "This is the entrance to the wasteland.",
            ReadOnly: true,
            Hide: true,
            OneWayEntrance: true,
            OwShuffleMap: "Desert Colossus",
            OwShuffleRegion: "main",
            OwShuffleExitName: "Haunted Wasteland"
        }
    }
}

let MapLocations = {
    "Kokiri Forest": {
        Abbreviation: "KOKI",
        MapGroup: MapGroups.FOREST,
        Regions: {
            main: {
                Exits: {
                    afterMido: {
                        Name: "afterMido",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT || !Settings.RandomizerSettings.closedDeku) { return true; }
                            return (Equipment.KOKIRI_SWORD.playerHas && Equipment.DEKU_SHIELD.playerHas) || 
                                Data.itemLocationObtained("Kokiri Forest", "main", "Move Mido");
                        }
                    },
                    "Lost Woods Bottom": {
                        OwExit: OwExits["Kokiri Forest"]["Lost Woods Bottom"]
                    },
                    "Lost Woods Top": {
                        OwExit: OwExits["Kokiri Forest"]["Lost Woods Top"]
                    }
                },

                Entrances: {
                    afterMido: {},
                    "Lost Woods Bottom": {},
                    "Lost Woods Top": {}
                },

                ItemLocations: {
                    "Kokiri Sword": {
                        Name: "Kokiri Sword",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 100, y: 284 },
                        Age: Age.CHILD,
                        LongDescription: "This is the prize at the end of the boulder maze, though the Hole of Z."
                    },
                    "Mido's House Upper Left": {
                        Name: "Mido's House Upper Left",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 119, y: 104 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This chest is in Mido's house."
                    },
                    "Mido's House Lower Left": {
                        Name: "Mido's House Lower Left",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 128, y: 104 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This chest is in Mido's house."
                    },
                    "Mido's House Upper Right": {
                        Name: "Mido's House Upper Right",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 119, y: 95 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This chest is in Mido's house."
                    },
                    "Mido's House Lower Right": {
                        Name: "Mido's House Lower Right",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 128, y: 95 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This chest is in Mido's house."
                    },
                    "Song of Storms Grotto by Lost Woods": {
                        Name: "Song of Storms Grotto by Lost Woods",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 109, y: 36 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms by the Gossip Stone near the Lost Woods entrance to reveal a grotto with a chest.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Cow in Link's House": {
                        Name: "Cow in Link's House",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 169, y: 229 },
                        IsInterior: true,
                        RequiredItems: [Items.OCARINA],
                        Age: Age.ADULT,
                        LongDescription: "Beat Malon's challenge in Lon Lon Ranch as adult and she will award you with a cow in your house.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            return Data.canAccessMap(age, "Lon Lon Ranch", "main");
                        }
                    },
                    "Skulltula in Soil": {
                        Name: "Skulltula in Soil",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 284, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "Plant bugs in the soil near the Kokiri Shop.",
                        NeedsBottle: true
                    },
                    "Skulltula on Know-it-all House": {
                        Name: "Skulltula on Know-it-all House",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 70, y: 180 },
                        Age: Age.CHILD,
                        LongDescription: "Look on the side of the Know-it-all Brothers' house at night. You can get the token with a backflip if you don't have a Boomerang.",
                        NeedsNighttime: true
                    },
                    "Skulltula on the House of Twins": {
                        Name: "Skulltula on the House of Twins",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 261, y: 233 },
                        Age: Age.ADULT,
                        LongDescription: "Look in the middle of the House of Twins at night.",
                        NeedsNighttime: true,
                        CustomRequirement: function(age) {
                            if (Items.HOOKSHOT.playerHas) { return true; }
                            return Settings.GlitchesToAllow.houseOfTwinsSkullWithHovers && Equipment.HOVER_BOOTS.playerHas;
                        }
                    },
                    "Kokiri Shop": {
                        Name: "Kokiri Shop",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: { x: 245, y: 128 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Found in the middle of the village."
                    },
                    "Plant Bean by Kokiri Shop": {
                        Name: "Plant Bean by Kokiri Shop",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 284, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the Kokiri Shop. It is not used to get any items."
                    },
                    "Move Mido": {
                        Name: "Move Mido",
                        ItemGroup: ItemGroups.NON_ITEM,
                        RequiredToAppear: function()  { return Settings.RandomizerSettings.closedDeku; },
                        MapInfo: { x: 300, y: 175 },
                        Age: Age.CHILD,
                        LongDescription: "Move Mido by talking to him while you have a Deku Shield and the Kokiri Sword. Necessary to access the Deku Tree if closed Deku is on.",
                        RequiredItems: [Equipment.KOKIRI_SWORD, Equipment.DEKU_SHIELD]
                    },
                    "Gossip Stone by Lost Woods": {
                        Name: "Gossip Stone by Lost Woods",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 102, y: 37 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is by the lost woods entrance at the top area of the forest.",
                    },
                    "Gossip Stone in Song of Storms Grotto": {
                        Name: "Gossip Stone in Song of Storms Grotto",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 109, y: 36 },
                        Age: Age.EITHER,
                        IsGrotto: true,
                        LongDescription: "This stone is in the Song of Storms grotto by the lost woods entrance at the top area of the forest.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    
                    // Entrances
                    "Link's House": {
                        Name: "Link's House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kokiri Forest",
                        Region: "main",
                        MapInfo: { x: 170, y: 236 },
                        IsInterior: true,
                        IsComplexEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the house with the ladder."
                    },
                    "Saria's House": {
                        Name: "Saria's House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kokiri Forest",
                        Region: "main",
                        MapInfo: { x: 204, y: 228 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the house to your right if you face away from Link's house."
                    },
                    "Mido's House": {
                        Name: "Mido's House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kokiri Forest",
                        Region: "main",
                        MapInfo: { x: 125, y: 100 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the house closet to the entrance to the Lost Woods."
                    },
                    "Know-It-All House": {
                        Name: "Know-It-All House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kokiri Forest",
                        Region: "main",
                        MapInfo: { x: 84, y: 179 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the house by the fenced off training area."
                    },
                    "House of Twins": {
                        Name: "House of Twins",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kokiri Forest",
                        Region: "main",
                        MapInfo: { x: 252, y: 248 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the house across from the shop."
                    },
                    "Shop Entrance": {
                        Name: "Shop Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kokiri Forest",
                        Region: "main",
                        MapInfo: { x: 245, y: 128 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Found in the middle of the village."
                    },
                    "Song of Storms Grotto by Lost Woods Entrance": {
                        Name: "Song of Storms Grotto by Lost Woods Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 109, y: 36 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms by the Gossip Stone near the Lost Woods entrance to reveal this grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    }
                }
            },

            afterMido: {
                Exits:
                {
                    "main": {},
                    "Deku Tree Entrance": {
                        OwExit: OwExits["Kokiri Forest"]["Deku Tree Entrance"]
                    }
                }, 
                
                Entrances: {
                    main: {}
                },

                ItemLocations: {
                    "Gossip Stone Left of Deku Tree": {
                        Name: "Gossip Stone Left of Deku Tree",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 252, y: 13 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the left side of the deku tree.",
                        Region: "afterMido"
                    },
                    "Gossip Stone Right of Deku Tree": {
                        Name: "Gossip Stone Right of Deku Tree",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 303, y: 94 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the right side of the deku tree. You can get back here by climbing on one of the roots on the left side and navigating around to the other side.",
                        Region: "afterMido"
                    }
                }
            }
        }
    },

    "Lost Woods": {
		Abbreviation: "LOST",
        MapGroup: MapGroups.FOREST,
        Regions: {
            firstHalf: {
                Exits: {
                    secondHalf: {
                        Name: "secondHalf",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Settings.GlitchesToAllow.midoSkip || Data.canPlaySong(Songs.SARIAS_SONG);
                        }
                    },
                    "To Kokiri Forest": {
                        OwExit: OwExits["Lost Woods"]["To Kokiri Forest"]
                    },
                    "Goron City": {
                        OwExit: OwExits["Lost Woods"]["Goron City"]
                    },
                    "Zora's River": {
                        OwExit: OwExits["Lost Woods"]["Zora's River"]
                    },
                    "To Lost Woods Bridge": {
                        OwExit: OwExits["Lost Woods"]["To Lost Woods Bridge"]
                    },
                    "Bridge To Lost Woods": {
                        CustomRequirement: function() {
                            return false; // This one is the one-way
                        }
                    }
                },
    
                Entrances: {
                    secondHalf: {},
                    "To Kokiri Forest": {},
                    "Goron City": {},
                    "Zora's River": {},
                    "Bridge to Lost Woods": OwExits["Lost Woods Bridge"]["Bridge to Lost Woods"]
                },
    
                ItemLocations: {
                    "Target Shooting Prize": {
                        Name: "Target Shooting Prize",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 219, y: 172 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go right one screen. Shoot the target in the center three times in a row with your Slingshot to get this prize.",
                        RequiredItems: [Items.FAIRY_SLINGSHOT]
                    },
                    "Skull Kid's Gift": {
                        Name: "Skull Kid's Gift",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 96, y: 172 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left one screen. Stand on the lower stump and play Saria's Song to get this gift",
                        RequiredSongs: [Songs.SARIAS_SONG],
                        DifficultOcarinaItems: true
                    },
                    "Ocarina Memory Game": {
                        Name: "Ocarina Memory Game",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 240, y: 186 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go right one screen. Go down the cliff and stand on the lower stump. Take out your Ocarina and win the Simon game to get this prize.",
                        NeedsOcarina: true,
                        DifficultOcarinaItems: true
                    },
                    "Grotto by Goron City": {
                        Name: "Grotto by Goron City",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 218, y: 118 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, go right and then left. Remove the rock on this screen to reveal a grotto with this chest.",
                        NeedToBlastOrSmash: true
                    },
                    "Skulltula in Soil by Bridge": {
                        Name: "Skulltula in Soil by Bridge",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 84, y: 222 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left, and then left. Plant bugs in the soil in this room.",
                        NeedsBottle: true
                    },
                    "Scrub by Bridge": {
                        Name: "Scrub by Bridge",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 91, y: 273 },
                        ScrubSanityNotRequired: true, // Deku stick upgrade
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, go left and follow the path to its end. You'll find the scrub at the end."
                    },
                    "Sell Skull Mask": {
                        Name: "Sell Skull Mask",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 88, y: 172 },
                        Age: Age.CHILD,
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "5" }],
                        RequiredSongs: [Songs.SARIAS_SONG],
                        LongDescription: "First, play Saria's song to the Skull kid. Next, Talk to him while wearing the Skull Mask to sell it to him - this unlocks the Spooky Mask. Recommended to do this AFTER you get the forest stage item.",
                    },
                    "Gossip Stone by Bridge Scrub": {
                        Name: "Gossip Stone by Bridge Scrub",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 80, y: 281 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is by the business scrub by the bridge.",
                    },
                    "Gossip Stone in Grotto by Goron City": {
                        Name: "Gossip Stone in Grotto by Goron City",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 218, y: 118 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This stone is by the generic grotto by Goron City.",
                        NeedToBlastOrSmash: true
                    },
                    "*Plant Bean by Bridge": {
                        Name: "*Plant Bean by Bridge",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 84, y: 222 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the bridge connecting Kokiri Forest and Hyrule Field. It can be used to get on the bridge."
                    },
                    "Grotto by Goron City Entrance": {
                        Name: "Grotto by Goron City Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 218, y: 118 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, go right and then left. Remove the rock on this screen to reveal this grotto.",
                        NeedToBlastOrSmash: true
                    }
                }
            },

            secondHalf: {
                Exits: {
                    firstHalf: {
                        Name: "firstHalf",
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || Data.canPlaySong(Songs.SARIAS_SONG);
                        }
                    },
                    
                    "To Kokiri Forest": {
                        OwExit: OwExits["Lost Woods"]["To Kokiri Forest"]
                    },

                    "Sacred Forest Meadow": {
                        OwExit: OwExits["Lost Woods"]["Sacred Forest Meadow"]
                    }
                },

                Entrances: {
                    firstHalf: {},
                    "Sacred Forest Meadow": {}
                },

                ItemLocations: {
                    "Forest Stage Skull Mask": {
                        Name: "Forest Stage Skull Mask",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 160, y: 86 },
                        IsGrotto: true,
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. In the back of this room, walk around until you fall into a hole. Put on the Skull Mask and stand front and center to get this item.",
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "5" }]
                    },
                    "Forest Stage Mask of Truth": {
                        Name: "Forest Stage Mask of Truth",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 158, y: 91 },
                        IsGrotto: true,
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. In the back of this room, walk around until you fall into a hole. Put on the Mask of Truth and stand front and center to get this item.",
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "8" }]
                    },
                    "Skulltula in Soil by Forest Stage": {
                        Name: "Skulltula in Soil by Forest Stage",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 187, y: 66 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. Plant bugs in the soil in this room.",
                        NeedsBottle: true
                    },
                    "Skulltula by Forest Stage": {
                        Name: "Skulltula by Forest Stage",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 188, y: 56 },
                        Age: Age.ADULT,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. Plant a magic bean here as a child. Come back as an adult at night and ride the plant up.",
                        NeedsNighttime: true,
                        CustomRequirement: function(age) {
                            let canRideUp = Data.itemLocationObtained("Lost Woods", "secondHalf", "*Plant Bean by Forest Stage");
                            let canGetWithHookshot = Settings.GlitchesToAllow.lwSkullWithoutBean && Items.BOMBCHU.playerHas && Items.HOOKSHOT.playerHas;
                            return canRideUp || canGetWithHookshot;
                        }
                    },
                    "Right Scrub by Forest Stage": {
                        Name: "Right Scrub by Forest Stage",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 194, y: 72 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. This is the right scrub in this room."
                    },
                    "Left Scrub by Forest Stage": {
                        Name: "Left Scrub by Forest Stage",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 184, y: 101 },
                        Age: Age.CHILD,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. This is the left scrub in this room."
                    },
                    "Front Scrub in Grotto Near the Sacred Forest Meadow": {
                        Name: "Front Scrub in Grotto Near the Sacred Forest Meadow",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 202, y: 27 },
                        ScrubSanityNotRequired: true, // Deku nut upgrade
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, straight, left. Remove the rock in this room. This is the front scrub.",
                        NeedToBlastOrSmash: true
                    },
                    "Back Scrub in Grotto Near the Sacred Forest Meadow": {
                        Name: "Back Scrub in Grotto Near the Sacred Forest Meadow",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 202, y: 31 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, straight, left. Remove the rock in this room. This is the back scrub.",
                        NeedToBlastOrSmash: true
                    },
                    "*Plant Bean by Forest Stage": {
                        Name: "*Plant Bean by Forest Stage",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 187, y: 66 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot near the entrance to the Forest Stage. It's used to get a skulltula above as an adult."
                    },
                    "Forest Stage Grotto": {
                        Name: "Forest Stage Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 160, y: 86 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, then left again. In the back of this room, walk around until you fall into this grotto."
                    },
                    "Grotto Near the Sacred Forest Meadow": {
                        Name: "Grotto Near the Sacred Forest Meadow",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 202, y: 31 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "From the Kokiri Forest entrance, take this path: right, left, right, left, straight, left. Remove the rock in this room to reveal the grotto.",
                        NeedToBlastOrSmash: true
                    }
                }
            }
        },
    },
    
    "Lost Woods Bridge": {
        Abbreviation: "LWBG",
		MapGroup: MapGroups.FOREST,
		Regions: {
			main: {
                Exits: {
                    "Hyrule Field Bridge": {
                        OwExit: OwExits["Lost Woods Bridge"]["Hyrule Field Bridge"]
                    },
                    "Bridge to Lost Woods": {
                        OwExit: OwExits["Lost Woods Bridge"]["Bridge to Lost Woods"]
                    },
                    "Kokiri Forest Bridge": {
                        OwExit: OwExits["Lost Woods Bridge"]["Kokiri Forest Bridge"]
                    },
                },

                Entrances: {
                    "Hyrule Field Bridge": {},
                    "Kokiri Forest Bridge": {},
                    "Bridge to Lost Woods": {}
                },

                ItemLocations: {
                    "Saria's Gift": {
                        Name: "Saria's Gift",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 198, y: 149 },
                        Age: Age.EITHER,
                        LongDescription: "You get this by taking the Lost Woods bridge exit from Kokiri Forest. It's normally the Fairy Ocarina.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                                let toKokiriExit = OwExits["Lost Woods Bridge"]["Kokiri Forest Bridge"];
                                if (!toKokiriExit.OwShuffleMap || !toKokiriExit.OwShuffleExitName) {
                                    return false
                                }

                                let otherSideExit = OwExits[toKokiriExit.OwShuffleMap][toKokiriExit.OwShuffleExitName];
                                return Data.getItemObtainability(otherSideExit, age);
                            }

                            let bridgeExit = OwExits["Kokiri Forest"]["Lost Woods Bottom"];
                            return Data.getItemObtainability(bridgeExit, age);
                        }
                    }
                }
            }
		}
    },

    "Sacred Forest Meadow": {
        Abbreviation: "SFM",
        MapGroup: MapGroups.FOREST,
        Regions: {
            main: {
                Exits: {
                    afterGate: {
                        Name: "afterGate",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Data.hasDamagingItem(age);
                        }
                    },

                    "Lost Woods": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Lost Woods"]
                    }
                },

                Entrances: {
                    afterGate: {},
                    "Lost Woods": {}
                },

                ItemLocations: {
                    "Grotto by Entrance": {
                        Name: "Grotto by Entrance",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 177, y: 274 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This hidden grotto is roughly halfway between the Lost Woods entrance and the maze entrance. Kill the two Wolfos inside to spawn the chest.",
                        IsHiddenGrotto: true
                    },

                    // Entrances
                    "Grotto near Lost Woods": {
                        Name: "Grotto near Lost Woods",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 177, y: 274 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This hidden grotto is roughly halfway between the Lost Woods entrance and the maze entrance. It can be revealed with an explosive or a hammer.",
                        IsHiddenGrotto: true
                    },
                }
            },

            afterGate: {
                Exits: {
                    main: {
                        Name: "main"
                    },
                    "Forest Temple Entrance": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Forest Temple Entrance"]
                    },
                    "Minuet Teleport Pad": {
                        OwExit: OwExits["Sacred Forest Meadow"]["Minuet Teleport Pad"]
                    }
                },

                Entrances: {
                    main: {},
                    "Minuet Teleport Pad": {}
                },

                ItemLocations: {
                    "Skulltula on Wall": {
                        Name: "Skulltula on Wall",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 219, y: 144 },
                        Age: Age.ADULT,
                        Region: "afterGate",
                        LongDescription: "At night, climb the ladder from the Forest Temple side. The skulltula will be on the left wall.",
                        RequiredItems: [Items.HOOKSHOT],
                        NeedsNighttime: true
                    },
                    "Song of Storms Grotto Front Scrub": {
                        Name: "Song of Storms Grotto Front Scrub",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 207, y: 50 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "Play the Song of Storms in the corner of the room with the Forest Temple entrance to reveal the grotto. Facing the forest temple, this is the lower-right corner.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Song of Storms Grotto Back Scrub": {
                        Name: "Song of Storms Grotto Back Scrub",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x:207 , y: 53 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "Play the Song of Storms in the corner of the room with the Forest Temple entrance to reveal the grotto. Facing the forest temple, this is the lower-right corner.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Saria's Song": {
                        Name: "Saria's Song",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 200, y: 27 },
                        Age: Age.CHILD,
                        Region: "afterGate",
                        LongDescription: "After obtaining Zelda's Letter, make your way to the end of the maze to get this item.",
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "3" }]
                    },
                    "Minuet of Forest": {
                        Name: "Minuet of Forest",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 190, y: 42 },
                        Age: Age.ADULT,
                        Region: "afterGate",
                        LongDescription: "Make your way to the end of the maze to get this item."
                    },
                    "Gossip Stone by Forest Temple": {
                        Name: "Gossip Stone by Forest Temple",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 176, y: 53 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "This stone is in the southwest corner of the area the forest temple is in."
                    },
                    "East Gossip Stone on Maze": {
                        Name: "East Gossip Stone on Maze",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 207, y: 228 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "This stone is on top of the maze. It's the one that's more to the east."
                    },
                    "West Gossip Stone on Maze": {
                        Name: "West Gossip Stone on Maze",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 149, y: 176 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "This stone is on top of the maze. It's the one that's more to the west."
                    },
                    
                    // Entrances
                    "Grotto in Maze Center": {
                        Name: "Grotto in Maze Center",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 194, y: 147 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "This is the grotto in the center of the maze. You normally need to climb the ladder to get here."
                    },
                    "Song of Storms Grotto": {
                        Name: "Song of Storms Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 207 , y: 53 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        Region: "afterGate",
                        LongDescription: "Play the Song of Storms in the corner of the room with the Forest Temple entrance to reveal the grotto. Facing the forest temple, this is the lower-right corner.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    }
                }
            }
        }
    },

    "Hyrule Field": {
        Abbreviation: "HFLD",
        MapGroup: MapGroups.FIELD_MARKET,
        Regions: {
            main: {
                Exits: {
                    "Kokiri Forest": {
                        OwExit: OwExits["Hyrule Field"]["Kokiri Forest"]
                    },
                    "Zora's River": {
                        OwExit: OwExits["Hyrule Field"]["Zora's River"]
                    },
                    "Kakariko Village": {
                        OwExit: OwExits["Hyrule Field"]["Kakariko Village"]
                    },
                    "Market": {
                        OwExit: OwExits["Hyrule Field"]["Market"]
                    },
                    "Lon Lon Ranch": {
                        OwExit: OwExits["Hyrule Field"]["Lon Lon Ranch"]
                    },
                    "Gerudo Valley": {
                        OwExit: OwExits["Hyrule Field"]["Gerudo Valley"]
                    },
                    "Lake Hylia": {
                        OwExit: OwExits["Hyrule Field"]["Lake Hylia"]
                    }
                },

                Entrances: {
                    "Kokiri Forest": {},
                    "Zora's River": {},
                    "Kakariko Village": {},
                    "Market": {},
                    "Lon Lon Ranch": {},
                    "Gerudo Valley": {},
                    "Lake Hylia": {},
                    "Lake Hylia Owl": {
                        IsDefaultOwl: true,
                        OwExit: OwExits["Lake Hylia"]["Owl"]
                    }
                },

                ItemLocations: {
                    "Ocarina of Time in Moat": {
                        Name: "Ocarina of Time in Moat",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: {x: 207, y: 36},
                        Age: Age.CHILD,
                        LongDescription: "After obtaining all the spiritual stones, stand by the drawbridge to the Market. After the cutscene, grab the Ocarina from the moat.",
                        RequiredMedallions: [
                            Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE
                        ]
                    },
                    "Grotto by Drawbridge": {
                        Name: "Grotto by Drawbridge",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 170, y: 39},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Remove the rock to the left of the Market drawbridge to reveal a grotto with this chest.",
                        NeedToBlastOrSmash: true
                    },
                    "Grotto in Southwest Forest": {
                        Name: "Grotto in Southwest Forest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 201, y: 227},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "In the southwest (a bit south of the Kokiri Forest entrance), there's a small forest that has a rock you can break. There's a chest in a grotto underneath it.",
                        NeedToBlastOrSmash: true
                    },
                    "Grotto by North River Tree": {
                        Name: "Grotto by North River Tree",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: {x: 91, y: 57},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "To the west of the Market entrance, there's a lone tree to the south of a river. Bomb or hammer near the tree to reveal a grotto. The item is a heart piece at the bottom of the water inside.",
                        IsHiddenGrotto: true,
                        IsGoldenScaleWater: true
                    },
                    "Open Grotto Near Lake Hylia Fences": {
                        Name: "Open Grotto Near Lake Hylia Fences",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: {x: 112, y: 272},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This is an open grotto just to the east of the square of fences by the Lake Hylia entrance."
                    },
                    "Cow in Grotto by Gerudo": {
                        Name: "Cow in Grotto by Gerudo",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: {x: 45, y: 103},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Near the entrance to Gerudo Valley, there's a circle of small rocks. As a child, you can bomb the center to reveal a grotto. As adult, you must hammer the red rock. There is a cow behind one of the webs that you must burn.",
                        CustomRequirement: function(age) {
                            if (!Data.canUseFireItem(age)) { return false; }
                            return Data.canUseHammer(age) || (age === Age.CHILD && Data.hasExplosives());
                        }
                    },
                    "Skulltula in Grotto by Kakariko": {
                        Name: "Skulltula in Grotto by Kakariko",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 237, y: 23},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "North of the entrance to Kakariko, there's a tree with a hidden grotto. The skulltula is high up on a spiderweb inside.",
                        IsHiddenGrotto: true,
                        IsAtShortDistance: true
                    },
                    "Skulltula in Grotto by Gerudo": {
                        Name: "Skulltula in Grotto by Gerudo",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 50, y: 103},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Near the entrance to Gerudo Valley, there's a circle of small rocks. As a child, you can bomb the center to reveal a grotto. As adult, you must hammer the red rock. The skulltula is high up near a cow after burning the spider webs.",
                        NeedsFire: true,
                        IsAtShortDistance: true,
                        CustomRequirement: function(age) {
                            return Data.canUseHammer(age) || (age === Age.CHILD && Data.hasExplosives());
                        }
                    },
                    "Scrub in Grotto by Lake Hylia Fences": {
                        Name: "Scrub in Grotto by Lake Hylia Fences",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: {x: 91, y: 267},
                        ScrubSanityNotRequired: true,
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "There's a hidden grotto in the center of the fences by Lake Hylia. Bomb or hammer there to get in. The scrub is inside.",
                        IsHiddenGrotto: true
                    },
                    "Sell Bunny Hood": {
                        Name: "Sell Bunny Hood",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 184, y: 145 },
                        Age: Age.CHILD,
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "7" }],
                        RequiredMedallions: [
                            Medallions.KOKIRIS_EMERALD,
                            Medallions.GORONS_RUBY,
                            Medallions.ZORAS_SAPPHIRE
                        ],
                        LongDescription: "Once you have all spiritual stones, a guy will appear in Hyrule Field that runs around Lon Lon Ranch. Talk to him while wearing the Bunny Hood to sell it to him - this unlocks the Mask of Truth.",
                    },
                    "Gossip Stone in Grotto by Drawbridge": {
                        Name: "Gossip Stone in Grotto by Drawbridge",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: {x: 170, y: 39},
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the grotto by the drawbridge blocked by the yellow rock.",
                        NeedToBlastOrSmash: true
                    },
                    "Gossip Stone in Grotto in Southwest Forest": {
                        Name: "Gossip Stone in Grotto in Southwest Forest",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: {x: 201, y: 227},
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the grotto in the southwest forest that is blocked by a rock.",
                        NeedToBlastOrSmash: true
                    },
                    "Gossip Stone in Open Grotto": {
                        Name: "Gossip Stone in Open Grotto",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: {x: 112, y: 272},
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the open grotto near the Lake Hylia fences.",
                    },
                    "Gossip Stone in Grotto by Gerudo": {
                        Name: "Gossip Stone in Grotto by Gerudo",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: {x: 50, y: 103},
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Near the entrance to Gerudo Valley, there's a circle of small rocks. As a child, you can bomb the center to reveal a grotto. As adult, you must hammer the red rock. The stone is behind one of the webs that you must burn.",
                        CustomRequirement: function(age) {
                            if (!Data.canUseFireItem(age)) { return false; }
                            return Data.canUseHammer(age) || (age === Age.CHILD && Data.hasExplosives());
                        }
                    },
                    
                    // Entrances
                    "Grotto in Drawbridge Rock": {
                        Name: "Grotto in Drawbridge Rock",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 170, y: 39},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Remove the rock to the left of the Market drawbridge to reveal this grotto.",
                        NeedToBlastOrSmash: true
                    },
                    "Grotto in Southwest Forest Rock": {
                        Name: "Grotto in Southwest Forest Rock",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 201, y: 227},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "In the southwest (a bit south of the Kokiri Forest entrance), there's a small forest that has a rock you can break to reveal this grotto.",
                        NeedToBlastOrSmash: true
                    },
                    "Hidden Grotto by North River Tree": {
                        Name: "Hidden Grotto by North River Tree",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 91, y: 57},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "To the west of the Market entrance, there's a lone tree to the south of a river. Bomb or hammer near the tree to reveal this grotto.",
                        IsHiddenGrotto: true
                    },
                    "Grotto in Rock North of River": {
                        Name: "Grotto in Rock North of River",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 102, y: 20},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "On the north side of the river to the west of the Market entrance, there's a grotto under a yellow rock.",
                        NeedToBlastOrSmash: true
                    },
                    "Open Grotto East of Lake Hylia Fences": {
                        Name: "Open Grotto East of Lake Hylia Fences",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 112, y: 272},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This is an open grotto just to the east of the square of fences by the Lake Hylia entrance."
                    },
                    "Hidden Grotto by Kakariko": {
                        Name: "Hidden Grotto by Kakariko",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 237, y: 23},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "North of the entrance to Kakariko, there's a tree with a hidden grotto - bomb or hammer to open it.",
                        IsHiddenGrotto: true
                    },
                    "Grotto by Gerudo": {
                        Name: "Grotto by Gerudo",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 50, y: 103},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Near the entrnace to Gerudo Valley, there's a circle of small rocks. As a child, you can bomb the center to reveal a grotto. As adult, you must hammer the red rock.",
                        CustomRequirement: function(age) {
                            return Data.canUseHammer(age) || (age === Age.CHILD && Data.hasExplosives());
                        }
                    },
                    "Grotto by Lake Hylia Fences": {
                        Name: "Grotto by Lake Hylia Fences",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 91, y: 267},
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "There's a hidden grotto in the center of the fences by Lake Hylia. Bomb or hammer there to get in. The scrub is inside.",
                        IsHiddenGrotto: true
                    }
                }
            }
        }
    },

    "Lon Lon Ranch": {
		Abbreviation: "LON",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                Exits: {
                    "Hyrule Field": {
                        OwExit: OwExits["Lon Lon Ranch"]["Hyrule Field"]
                    }
                },

                Entrances: {
                    "Hyrule Field": {}
                },

                ItemLocations: {
                    "Talon's Super Cucco Minigame": {
                        Name: "Talon's Super Cucco Minigame",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 230, y: 54 },
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "After waking up Talon with the Chicken at Hyrule Castle, go to his house in Lon Lon Ranch. If you win the Super Cucco Minigame there (costs 10 rupees the first play), he'll give you an item.",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Castle", "main", "Wake up Talon");
                        }
                    },
                    "Cow Shed Item in Back": {
                        Name: "Cow Shed Item in Back",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 80, y: 260 },
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "Head to the back of Lon Lon Ranch to find the cow shed. Behind the boxes and through a crawlspace you'll find an item."
                    },
                    "Left Cow in Stable": {
                        Name: "Left Cow in Stable",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 189, y: 58 },
                        IsInterior: true,
                        RequiredItems: [Items.OCARINA],
                        Age: Age.EITHER,
                        LongDescription: "Enter the first door on your right when entering Lon Lon Ranch. This is the cow in the back on the left side."
                    },
                    "Right Cow in Stable": {
                        Name: "Right Cow in Stable",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 195, y: 58 },
                        RequiredItems: [Items.OCARINA],
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Enter the first door on your right when entering Lon Lon Ranch. This is the cow in the back on the right side."
                    },
                    "Left Cow in Cow Shed": {
                        Name: "Left Cow in Cow Shed",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 103, y: 258 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Enter the building in the back of the ranch. This is the cow in on the left side when you enter.",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return Items.OCARINA.playerHas || Equipment.KOKIRI_SWORD.playerHas; }
                            return true;
                        }
                    },
                    "Right Cow in Cow Shed": {
                        Name: "Right Cow in Cow Shed",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 109, y: 258 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Enter the first door on your right when entering Lon Lon Ranch. This is the cow more to the right when you enter.",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return Items.OCARINA.playerHas || Equipment.KOKIRI_SWORD.playerHas; }
                            return true;
                        }
                    },
                    "Skulltula on Talon's House": {
                        Name: "Skulltula on Talon's House",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 240, y: 67 },
                        Age: Age.CHILD,
                        LongDescription: "At night, there's a skulltula high up on Talon's House.",
                        NeedsNighttime: true,
                        IsAtShortDistance: true
                    },
                    "Skulltula in Tree by Entrance": {
                        Name: "Skulltula in Tree by Entrance",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 280, y: 100 },
                        Age: Age.CHILD,
                        LongDescription: "The tree is just passed the houses to the left. Roll into it to reveal the skulltula. Use a pot from the beginning to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true,
                    },
                    "Skulltula on Rain Shed": {
                        Name: "Skulltula on Rain Shed",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 233, y: 231  },
                        Age: Age.CHILD,
                        LongDescription: "At night, run around to the back of the corral to find this skulltula. Use a pot from the beginning to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true,
                        NeedsNighttime: true
                    },
                    "Skulltula on Southwest Wall": {
                        Name: "Skulltula on Southwest Wall",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 44, y: 214 },
                        Age: Age.CHILD,
                        LongDescription: "At night, there's a skulltula on the southeast wall of the ranch. Facing the cow shed, it's a little bit to the right.",
                        NeedsNighttime: true,
                        IsAtShortDistance: true
                    },
                    "Left Scrub in Open Grotto": {
                        Name: "Left Scrub in Open Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 280, y: 240 },
                        IsGrotto: true,
                        Age: Age.CHILD,
                        LongDescription: "There's an open grotto at the far southwest corner of the ranch with this scrub."
                    },
                    "Middle Scrub in Open Grotto": {
                        Name: "Middle Scrub in Open Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 285, y: 240 },
                        IsGrotto: true,
                        Age: Age.CHILD,
                        LongDescription: "There's an open grotto at the far southwest corner of the ranch with this scrub."
                    },
                    "Right Scrub in Open Grotto": {
                        Name: "Right Scrub in Open Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 290, y: 240 },
                        IsGrotto: true,
                        Age: Age.CHILD,
                        LongDescription: "There's an open grotto at the far southwest corner of the ranch with this scrub."
                    },
                    "Epona's Song": {
                        Name: "Epona's Song",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 174, y: 170 },
                        Age: Age.CHILD,
                        LongDescription: "You can get this after waking up Talon with the Chicken. After speaking to Malon a few times, take out your Ocarina to get the item.",
                        NeedsOcarina: true,
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Castle", "main", "Wake up Talon");
                        }
                    },
                    
                    // Entrances
                    "Talon's House": {
                        Name: "Talon's House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 230, y: 54 },
                        Map: "Lon Lon Ranch",
                        Region: "main",
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the first door on your left when you first enter the ranch."
                    },
                    "Stable": {
                        Name: "Stable",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 198, y: 54 },
                        Map: "Lon Lon Ranch",
                        Region: "main",
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the first door on your right when you first enter the ranch."
                    },
                    "Cow Shed": {
                        Name: "Cow Shed",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 106, y: 265 },
                        IsInterior: true,
                        Map: "Lon Lon Ranch",
                        Region: "main",
                        Age: Age.EITHER,
                        LongDescription: "Head to the back of Lon Lon Ranch to find this building."
                    },
                    "Open Grotto in Southwest Corner": {
                        Name: "Open Grotto in Southwest Corner",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 290, y: 240 },
                        IsGrotto: true,
                        Age: Age.CHILD,
                        LongDescription: "There's an open grotto as a child at the far southwest corner of the ranch."
                    }
                }
            }
		}
    },
    
    "Market Entrance": {
		Abbreviation: "MENT",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                Exits: {
                    "Hyrule Field": {
                        OwExit: OwExits["Market Entrance"]["Hyrule Field"]
                    },

                    "Market": {
                        OwExit: OwExits["Market Entrance"]["Market"]
                    }
                },

                Entrances: {
                    "Hyrule Field": {},
                    "Market": {}
                },

                ItemLocations: {
                    "Big Poe Reward": {
                        Name: "Big Poe Reward",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 252, y: 200},
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "After gathering all the Big Poes the guy at the market entrance wants, he gives you this reward. You don't actually need Epona to get Big Poes, but it's not a 100% chance a big one will spawn if you aren't on her.",
                        RequiredItems: [Items.FAIRY_BOW],
                        NeedsBottle: true
                    },
                    "Skulltula in Pot-filled House": {
                        Name: "Skulltula in Pot-filled House",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: {x: 252, y: 220},
                        IsInterior: true,
                        Age: Age.CHILD,
                        OverrideItemGroupCondition: true,
                        LongDescription: "Break the rightmost box in the back of the room to reveal the skulltula. If you don't have an item, simply hit it with a pot!"
                    },
                    
                    // Entrances
                    "Guard House by Entrance": {
                        Name: "Guard House by Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: {x: 203, y: 233},
                        Map: "Market Entrance",
                        Region: "main",
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the door near the Hyrule Field entrance."
                    }
                }
            }
		}
    },
    
	"Market": {
		Abbreviation: "MRKT",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                Exits: {
                    "Market Entrance": {
                        OwExit: OwExits["Market"]["Market Entrance"]
                    },

                    "Hyrule Castle": {
                        OwExit: OwExits["Market"]["Hyrule Castle"]
                    },

                    "Temple of Time": {
                        OwExit: OwExits["Market"]["Temple of Time"]
                    }
                },

                Entrances: {
                    "Market Entrance": {},
                    "Hyrule Castle": {},
                    "Temple of Time": {}
                },

                ItemLocations: {
                    "Slingshot Minigame": {
                        Name: "Slingshot Minigame",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 234, y: 120},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "Pay 20 rupees and win the slingshot minigame. This is the building just to the left of the Hyrule Castle entrance. You do not need the slingshot to play this game."
                    },
                    "Bombchu Bowling Bomb Bag Prize": {
                        Name: "Bombchu Bowling Bomb Bag Prize",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 205, y: 172},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "Pay 30 rupees and win the Bomb Bag prize at the Bombchu Bowling Alley. This is between the two market alley entrances.",
                        CustomRequirement: function(age) {
                            return Data.canPlayBombchuBowling(age);
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlayBombchuBowling(age);
                        }
                    },
                    "Bombchu Bowling Heart Piece Prize": {
                        Name: "Bombchu Bowling Heart Piece Prize",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 198, y: 172},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "Pay 30 rupees and win the Heart Piece prize at the Bombchu Bowling Alley. This is between the two market alley entrances.",
                        CustomRequirement: function(age) {
                            return Data.canPlayBombchuBowling(age);
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlayBombchuBowling(age);
                        }
                    },
                    "Reward from Returning Dog": {
                        // Not marked as interior because it's not included in the entrance shuffle currently
                        Name: "Reward from Returning Dog",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 104, y: 230},
                        Age: Age.CHILD,
                        LongDescription: "If you start near the entrance, the dog you want is just to the left behind the market stall. From there, beeline to the right to get to the left market alley. Go to the more rightmost of the two doors and turn in the dog."
                    },
                    "Treasure Chest Minigame": {
                        Name: "Treasure Chest Minigame",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 215, y: 230},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "This is the building to the right of the market entrance exit - it's only open at night. You must basically win a 50/50 game 5 times in a row to get the item. It's 10 rupees per try. You can win 100% of the time with the Lens of Truth.",
                        RequiredItems: [Items.LENS_OF_TRUTH, Equipment.MAGIC],
                        OneWayInteriorSpawnEntrance: true
                    },
                    "Borrow Keaton Mask": {
                        Name: "Borrow Keaton Mask",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 286, y: 120},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "After showing the Kakariko Village guard Zelda's Letter, head to the mask shop to borrow this mask.",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter");
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter");
                        }
                    },
                    "Borrow Skull Mask": {
                        Name: "Borrow Skull Mask",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 286, y: 120},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "After selling the Keaton Mask to the Kakariko Guard, head to the mask shop to borrow this mask.",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Kakariko Village", "main", "Sell Keaton Mask");
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.itemLocationObtained("Kakariko Village", "main", "Sell Keaton Mask");
                        }
                    },
                    "Borrow Spooky Mask": {
                        Name: "Borrow Spooky Mask",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 286, y: 120},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "After selling the Skull Mask to the Skull Kid in Lost Woods, head to the mask shop to borrow this mask.",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Lost Woods", "firstHalf", "Sell Skull Mask");
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.itemLocationObtained("Lost Woods", "firstHalf", "Sell Skull Mask");
                        }
                    },
                    "Borrow Bunny Hood": {
                        Name: "Borrow Bunny Hood",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 286, y: 120},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "After selling the Spooky Mask to the graveyard kid, head to the mask shop to borrow this mask.",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Graveyard", "main", "Sell Spooky Mask");
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.itemLocationObtained("Graveyard", "main", "Sell Spooky Mask");
                        }
                    },
                    "Borrow Mask of Truth": {
                        Name: "Borrow Mask of Truth",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 286, y: 120},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "After selling the Bunny Hood to the running guy in Hyrule Field, head to the mask shop to borrow this mask.",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Hyrule Field", "main", "Sell Bunny Hood");
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.itemLocationObtained("Hyrule Field", "main", "Sell Bunny Hood");
                        }
                    },
                    "Bazaar": {
                        Name: "Bazaar",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: {x: 308, y: 191},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "Starting at the market entrance, this is the first building you can enter going counter-clockwise.",
                        OneWayInteriorSpawnEntrance: true
                    },
                    "Potion Shop": {
                        Name: "Potion Shop",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: {x: 308, y: 159},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "Starting at the market entrance, this is the second building you can enter going counter-clockwise."
                    },
                    "Bombchu Shop": {
                        Name: "Bombchu Shop",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: {x: 130, y: 232},
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "This shop is only open at night. Starting at the market entrance, go straight right into the alley. Take the first door on the left wall to get to the shop.",
                        OneWayInteriorSpawnEntrance: true
                    },
                    
                    // Entrances
                    "Archery Minigame": {
                        Name: "Archery Minigame",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 234, y: 120},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "This is the building just to the left of the Hyrule Castle entrance."
                    },
                    "Happy Mask Shop Entrance": {
                        Name: "Happy Mask Shop Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 286, y: 120},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "This is the building just to the right of the Hyrule Castle entrance."
                    },
                    "Potion Shop Entrance": {
                        Name: "Potion Shop Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 308, y: 159},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "Starting at the market entrance, this is the second building you can enter going counter-clockwise."
                    },
                    "Bazaar Entrance": {
                        Name: "Bazaar Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 308, y: 191},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "Starting at the market entrance, this is the first building you can enter going counter-clockwise."
                    },
                    "Treasure Chest Minigame Entrance": {
                        Name: "Treasure Chest Minigame Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 215, y: 230},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "This is the building to the right of the market entrance exit - it's only open at night.",
                    },
                    "Bombchu Bowling Entrance": {
                        Name: "Bombchu Bowling Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 205, y: 174},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "This building is the one between the two market alley entrances."
                    },
                    "Bombchu Shop Entrance": {
                        Name: "Bombchu Shop Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 130, y: 232},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "This door only opens at night. Starting at the market entrance, go straight right into the alley. Take the first door on the left wall to get to the door."
                    },
                    "Door in Right Market Alley": {
                        Name: "Door in Right Market Alley",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Market",
                        Region: "main",
                        MapInfo: {x: 112, y: 112},
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "This door only opens at night. This is the door on the screen if you enter the alley from the entrance by the archery building."
                    }
                }
            }
		},
    },
    
    "Temple of Time": {
		Abbreviation: "ToT",
		MapGroup: MapGroups.FIELD_MARKET,
		Regions: {
            main: {
                Exits: {
                    "Market": {
                        OwExit: OwExits["Temple of Time"]["Market"]
                    }
                },

                Entrances: {
                    "Market": {}
                },

                ItemLocations: {
                    "Prelude of Light": {
                        Name: "Prelude of Light",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: {x: 343, y: 45},
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "When you have the Forest Medallion, enter the room with the Master Sword pedestal to receive the item.",
                        RequiredMedallions: [Medallions.FOREST_MEDALLION],
                        CustomRequirement: function(age) {
                            if (!Settings.RandomizerSettings.openDoorOfTime) {
                                return Data.canPlaySong(Songs.SONG_OF_TIME);
                            }
                            return true;
                        }
                    },
                    "Light Arrows": {
                        Name: "Light Arrows",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: {x: 261, y: 45},
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "When you have the Shadow and Spirit Medallions, simply enter the Temple of Time as adult to receive the item.",
                        RequiredMedallions: [Medallions.SHADOW_MEDALLION, Medallions.SPIRIT_MEDALLION]
                    },
                    "Right Gossip Stone": {
                        Name: "Right Gossip Stone",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 242 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's all the way to the right."
                    },
                    "Center Right Gossip Stone": {
                        Name: "Center Right Gossip Stone",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 219 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's one to the left of the rightmost one."
                    },
                    "Center Left Gossip Stone": {
                        Name: "Center Left Gossip Stone",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 197 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's one to the right of the leftmost one."
                    },
                    "Left Gossip Stone": {
                        Name: "Left Gossip Stone",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 102, y: 172 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This is the stone that's all the way to the left."
                    },
                    
                    // Entrances
                    "Temple Entrance": {
                        Name: "Temple Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Temple of Time",
                        Region: "main",
                        MapInfo: {x: 198, y: 37},
                        IsInterior: true,
                        IsComplexEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the entrance into the temple."
                    }
                }
            }
		}
	},
    
    "Castle": {
		Abbreviation: "CSTL",
		MapGroup: MapGroups.FIELD_MARKET,
		Floors: ["HYR", "GAN"],
		StartingFloorIndex: 0,
		Regions: {
            main: {
                Exits: {
                    "Market": {
                        OwExit: OwExits["Castle"]["Market"]
                    },

                    "Ganon's Castle Entrance": {
                        OwExit: OwExits["Castle"]["Ganon's Castle Entrance"]
                    }
                },

                Entrances: {
                    "Market": {}
                },
    
                ItemLocations: {
                    //-- Hyrule castle
                    "Gift from Malon": {
                        Name: "Gift from Malon",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 123, y: 248, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "Malon is waiting by the vines to the right. If she isn't there, leave the map and come back. Talk to her to receive an item."
                    },
                    "Hyrule Great Fairy Fountain": {
                        Name: "Hyrule Great Fairy Fountain",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 285, y: 231, floor: "HYR" },
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "After climbing the vines and jumping off the building, follow the right wall until you reach a rock. Bomb it and enter the crawlspace. Play Zelda's Lullaby to receive an item.",
                        NeedToBlastOrSmash: true,
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY);
                        }
                    },
                    "Skulltula in Tree": {
                        Name: "Skulltula in Tree",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 97, y: 245, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "Roll into the first tree to set this skulltula free."
                    },
                    "Wake up Talon": {
                        Name: "Wake up Talon",
                        ItemGroup: ItemGroups.NON_ITEM,
                        Age: Age.CHILD,
                        MapInfo: { x: 193, y: 38, floor: "HYR" },
                        LongDescription: "Wait for the Weird Egg to hatch, then wake up Talon. This unlocks a few things in Lon Lon Ranch.",
                        RequiredItems: [Items.MASK_SLOT]
                    },
                    "Skulltula in Song of Storms Grotto": {
                        Name: "Skulltula in Song of Storms Grotto",
                        ItemGroup: ItemGroups.SKULLTULA,
                        Age: Age.CHILD,
                        MapInfo: { x: 200, y: 92, floor: "HYR" },
                        IsGrotto: true,
                        LongDescription: "There's a tree in the corner near the milk boxes at the castle. Play the Song of Storms there to open a grotto. The skulltula is behind one of the explodable walls.",
                        IsAtShortDistance: true,
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Zelda's Lullaby": {
                        Name: "Zelda's Lullaby",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 167, y: 33, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "After waking up Talon with the Chicken, push the crates down so that you can jump to the crawlspace. Sneak past the guards to meet Zelda to get her letter. After that, try to leave the area to receive this item from Impa.",
                        RequiredItems: [Items.MASK_SLOT]
                    },
                    "Gossip Stone by Vines": {
                        Name: "Gossip Stone by Vines",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 137, y: 269, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "This stone near the top of the vines."
                    },
                    "Gossip Stone by Climbable Stones": {
                        Name: "Gossip Stone by Climbable Stones",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 72, y: 99, floor: "HYR" },
                        Age: Age.CHILD,
                        LongDescription: "This stone near the climbable stones near the castle moat."
                    },
                    "Gossip Stone in Song of Storms Grotto": {
                        Name: "Gossip Stone in Song of Storms Grotto",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 200, y: 92, floor: "HYR" },
                        IsGrotto: true,
                        Age: Age.CHILD,
                        LongDescription: "There's a tree in the corner near the milk boxes at the castle. Play the Song of Storms there to open a grotto. The stone is behind one of the explodable walls.",
                        RequiredSongs: [Songs.SONG_OF_STORMS],
                        NeedsExplosives: true
                    },
                    
                    // Entrances
                    "Hyrule Great Fairy Fountain Entrance": {
                        Name: "Hyrule Great Fairy Fountain Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Castle",
                        Region: "main",
                        MapInfo: { x: 285, y: 231, floor: "HYR" },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.CHILD,
                        LongDescription: "After climbing the vines and jumping off the building, follow the right wall until you reach a rock. Bomb it and enter the crawlspace.",
                        NeedToBlastOrSmash: true,
                    },
                    "Song of Storms Grotto": {
                        Name: "Song of Storms Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Age: Age.CHILD,
                        MapInfo: { x: 200, y: 92, floor: "HYR" },
                        IsGrotto: true,
                        LongDescription: "There's a tree in the corner near the milk boxes at the castle. Play the Song of Storms there to open this grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },

                    //-- Ganon's castle
                    "Ganon Great Fairy Fountain": {
                        Name: "Ganon Great Fairy Fountain",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 308, y: 161, floor: "GAN" },
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "At the end of the main path is a giant block you can pull up with Golden Gauntlets. Inside is a Great Fairy Fountain. Alternatively, you can use hover boots and a shield to clip past the block.",
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            return Equipment.STRENGTH.currentUpgrade === 3 ||
                                (
                                    Settings.GlitchesToAllow.doubleDefenseEarly &&
                                    Equipment.HOVER_BOOTS.playerHas && 
                                    (Equipment.HYLIAN_SHIELD.playerHas || Equipment.MIRROR_SHIELD.playerHas)
                                );
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY);
                        }
                    },
                    "Skulltula on Broken Arch": {
                        Name: "Skulltula on Broken Arch",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 258, y: 171, floor: "GAN" },
                        Age: Age.ADULT,
                        LongDescription: "A little bit down the path is a broken archway. The skulltula is found on the opposite side of it.<br/><br/>If you don't have hookshot, walk as far as you can up the slope. Hold Z-target and press B to vertical slash the skulltula. Now still as far up as you can be, target the skulltula and press A to jumpslash and retrieve the item.",
                    },
                    
                    // Entrances
                    "Ganon Great Fairy Fountain Entrance": {
                        Name: "Ganon Great Fairy Fountain Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Castle",
                        Region: "main",
                        MapInfo: { x: 308, y: 161, floor: "GAN" },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.ADULT,
                        LongDescription: "At the end of the main rock is a giant block you can pull up with Golden Gauntlets. Alternatively, you can use hover boots and a shield to clip past the block.",
                        CustomRequirement: function(age) {
                            return Equipment.STRENGTH.currentUpgrade === 3 ||
                                (
                                    Settings.GlitchesToAllow.doubleDefenseEarly &&
                                    Equipment.HOVER_BOOTS.playerHas && 
                                    (Equipment.HYLIAN_SHIELD.playerHas || Equipment.MIRROR_SHIELD.playerHas)
                                );
                        }
                    }
                }
            }
		}
	},
    
    "Kakariko Village": {
		Abbreviation: "KAK",
		MapGroup: MapGroups.KAKARIKO,
		Regions: {
            main: {
                Exits: {
                    beyondGate: {
                        Name: "beyondGate",
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || 
                                Data.itemLocationObtained("Kakariko Village", "main", "Show Guard Letter") || 
                                Settings.RandomizerSettings.openKakariko;
                        }
                    },

                    "Hyrule Field": {
                        OwExit: OwExits["Kakariko Village"]["Hyrule Field"]
                    },

                    "Graveyard": {
                        OwExit: OwExits["Kakariko Village"]["Graveyard"]
                    },

                    "Bottom of the Well Entrance": {
                        OwExit: OwExits["Kakariko Village"]["Bottom of the Well Entrance"]
                    }
                },

                Entrances: {
                    beyondGate: {},
                    "Hyrule Field": {},
                    "Graveyard": {},
                    "Death Mountain Trial Owl": {
                        IsDefaultOwl: true,
                        OwExit: OwExits["Death Mountain Trail"]["Owl"]
                    }
                },
                
                ItemLocations: {
                    "Open Grotto Behind Fences": {
                        Name: "Open Grotto Behind Fences",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 245, y: 123 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This grotto is located behind the fenced off area located behind the Potion Shop. Child can get there with a cucco or from sidehopping off the watchtower. Adult can simply walk through the Potion Shop."
                    },
                    "Grotto With Redeads": {
                        Name: "Grotto With Redeads",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 142, y: 169 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This hidden grotto is between the tree and Talon's house. There's a slightly darker texture that you need to either hammer or bomb. Kill the redeads inside to spawn the chest.",
                        IsHiddenGrotto: true,
                        NeedsSwordWeapon: true
                    },
                    "Bottle from Cucco Collection": {
                        Name: "Bottle from Cucco Collection",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 210, y: 244 },
                        Age: Age.CHILD,
                        LongDescription: "This is the prize that Anju gives you after collecting all 7 cuccos in the pen. Note that leaving the map will keep your progress."
                    },
                    "Gift from the Guy on the Roof": {
                        Name: "Gift from the Guy on the Roof",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 212, y: 124 },
                        Age: Age.EITHER,
                        LongDescription: "The guy on the roof of the house gives you an item. To get this as a child, climb the giant watchtower, position yourself at the upper left corner, then sidehop left without holding any direction. As an adult, you can either hookshot to the roof from the fence by the windmill, or do a jump to the potion shop roof from the ledge leading to Death Mountain."
                    },
                    "Gift From Anju": {
                        Name: "Gift From Anju",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 210, y: 240 },
                        Age: Age.ADULT,
                        LongDescription: "Simply talk to Anju (the cucco lady) as adult to get this."
                    },
                    "Archery Minigame": {
                        Name: "Archery Minigame",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 190, y: 190 },
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "Win the archery game to get a prize. You do need the Fairy Bow to play.",
                        RequiredItems: [Items.FAIRY_BOW],
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "10 Gold Skulltula Reward": {
                        Name: "10 Gold Skulltula Reward",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 138, y: 195 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the reward for collecting 10 skulltula tokens. The gift is given by the rightmost person in the house.",
                        CustomRequirement: function(age) {
                            return Equipment.SKULLTULA_TOKENS.count >= 10;
                        }
                    },
                    "20 Gold Skulltula Reward": {
                        Name: "20 Gold Skulltula Reward",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 137, y: 212 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the reward for collecting 20 skulltula tokens. The gift is given by the leftmost person in the house.",
                        CustomRequirement: function(age) {
                            return Equipment.SKULLTULA_TOKENS.count >= 20;
                        }
                    },
                    "30 Gold Skulltula Reward": {
                        Name: "30 Gold Skulltula Reward",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 119, y: 202 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the reward for collecting 30 skulltula tokens. The gift is given by the middle person in the house.",
                        CustomRequirement: function(age) {
                            return Equipment.SKULLTULA_TOKENS.count >= 30;
                        }
                    },
                    "40 Gold Skulltula Reward": {
                        Name: "40 Gold Skulltula Reward",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 125, y: 210 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the reward for collecting 40 skulltula tokens. The gift is given by the person next to the leftmost person in the house.",
                        CustomRequirement: function(age) {
                            return Equipment.SKULLTULA_TOKENS.count >= 40;
                        }
                    },
                    "50 Gold Skulltula Reward": {
                        Name: "50 Gold Skulltula Reward",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 124, y: 198 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the reward for collecting 50 skulltula tokens. The gift is given by the person next to the rightmost person in the house.",
                        CustomRequirement: function(age) {
                            return Equipment.SKULLTULA_TOKENS.count >= 50;
                        }
                    },
                    "Heart Piece in Impa's House": {
                        Name: "Heart Piece in Impa's House",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 182, y: 252 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "You can get this by going in the opening above the cucco pen. You can get there as a child via the owl on the top of Death Mountain, or by using a cucco. To do this, throw it up the building under construction (2 throws), then jump to the border (when the construction worker isn't there), then jump at the platform - don't drop the cucco. As adult, you must hookshot there. Hookshot first to the House of Skulltulas from the ledge by the entrance to Impa's house. Then, hookshot to Impa's house. Make your way to the ledge.<br/><br/>Alternatively, as adult, you can make your way directly under the opening, and simply hold forward to jump onto the ledge.",
                    },
                    "Heart Piece in Windmill": {
                        Name: "Heart Piece in Windmill",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 266, y: 148 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "As a child, you can get this with a well-aimed Boomerang. Adult must either go through the Dampe race, use a well-aimed hookshot and jumpslash, or do a trick to jump to the platform with nothing.",
                        CustomRequirement: function(age) {
                            if (Data.canUseBoomerang(age)) {
                                return true;
                            }
                            
                            return age === Age.ADULT && 
                            (
                                Settings.GlitchesToAllow.windmillHPWithNothing || // Trick to get there with nothing
                                (Settings.GlitchesToAllow.windmillHPWithHookshot && Items.HOOKSHOT.playerHas) || // Trick to get there with hookshot
                                (Data.canPlaySongs() && Songs.SONG_OF_TIME.playerHas) // Dampe race
                            );
                        }
                    },
                    "Cow Impa's House": {
                        Name: "Cow Impa's House",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 172, y: 252 },
                        IsInterior: true,
                        RequiredItems: [Items.OCARINA],
                        Age: Age.EITHER,
                        LongDescription: "You can get this by going in the opening above the cucco pen. You can get there as a child via the owl on the top of Death Mountain, or by using a cucco. To do this, throw it up the building under construction (2 throws), then jump to the border (when the construction worker isn't there), then jump at the platform - don't drop the cucco. As adult, you must hookshot there. Hookshot first to the House of Skulltulas from the ledge by the entrance to Impa's house. Then, hookshot to Impa's house. Make your way to the ledge.<br/><br/>Alternatively, as adult, you can make your way directly under the opening, and simply hold forward to jump onto the ledge.",
                    },
                    "Show Guard Letter": {
                        Name: "Show Guard Letter",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 107, y: 41 },
                        Age: Age.CHILD,
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "3" }],
                        LongDescription: "Show the guard Zelda's Letter. This unlocks the mask trading sequence.",
                    },
                    "Sell Keaton Mask": {
                        Name: "Sell Keaton Mask",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 123, y: 41 },
                        Age: Age.CHILD,
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "4" }],
                        LongDescription: "Talk to the guard while wearing the Keaton mask to sell it to him - this unlocks the Skull Mask.",
                    },
                    "Skulltula in Tree": {
                        Name: "Skulltula in Tree",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 97, y: 179 },
                        Age: Age.CHILD,
                        LongDescription: "At night, roll into the tree in the center of the village to reveal this skulltula. If you have no weapon, use a pot from near the guard by Death Mountain Trail.",
                        OverrideItemGroupCondition: true,
                        NeedsNighttime: true
                    },
                    "Skulltula on House of Skulltulas": {
                        Name: "Skulltula on House of Skulltulas",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 121, y: 218 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the House of Skulltulas. If you have no weapon, use a pot from near the guard by Death Mountain Trail.",
                        OverrideItemGroupCondition: true,
                        NeedsNighttime: true
                    },
                    "Skulltula at Construction Site": {
                        Name: "Skulltula at Construction Site",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 191, y: 201 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the pile of bricks at the construction site. If you have no weapon, use a pot from near the guard by Death Mountain Trail.",
                        OverrideItemGroupCondition: true,
                        NeedsNighttime: true
                    },
                    "Skulltula on Bazaar": {
                        Name: "Skulltula on Bazaar",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 96, y: 75 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the Bazaar (the building by the entrance to Death Mountain). It's near some pots. Use them to kill it if you have no weapon.",
                        OverrideItemGroupCondition: true,
                        NeedsNighttime: true
                    },
                    "Skulltula on Watchtower": {
                        Name: "Skulltula on Watchtower",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 169, y: 111 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the watchtower ladder. You can kill it with either the slingshot or a bombchu. If you don't have those, you can also climb up as far as you can, and press A to let go of the ladder, then spam the jumpslash button for your sword or stick for the kill.",
                        CustomRequirement: function(age) {
                            return Items.FAIRY_SLINGSHOT.playerHas || Items.BOMBCHU.playerHas || (Settings.GlitchesToAllow.watchtowerSkullJumpslash && Data.hasSwordWeapon(age));
                        },
                        NeedsNighttime: true
                    },
                    "Skulltula on Impa's Roof": {
                        Name: "Skulltula on Impa's Roof",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 172, y: 260 },
                        Age: Age.ADULT,
                        LongDescription: "At night, from the ledge near the entrance to Impa's House, hookshot to the House of Skulltula. From there, hookshot to Impa's house. You'll find the skulltula on the back wall.",
                        RequiredItems: [Items.HOOKSHOT],
                        NeedsNighttime: true
                    },
                    "Potion Shop": {
                        Name: "Potion Shop",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: { x: 177, y: 89 },
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.childShopClips; },
                        Age: Age.ADULT,
                        IsInterior: true,
                        LongDescription: "This is the building to the right if you are facing the Death Mountain entrance.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Settings.GlitchesToAllow.childShopClips && Data.hasSwordWeapon(age);
                        },
                        OneWayInteriorSpawnEntrance: true
                    },
                    "Bazaar": {
                        Name: "Bazaar",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: { x: 117, y: 89 },
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.childShopClips; },
                        Age: Age.ADULT,
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "This is the building to the left if you are facing the Death Mountain entrance.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Settings.GlitchesToAllow.childShopClips && Data.hasSwordWeapon(age);
                        },
                        OneWayInteriorSpawnEntrance: true
                    },
                    "Song of Storms": {
                        Name: "Song of Storms",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 266, y: 152 },
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "As an adult, head to the windmill. Take out your ocarina by the windmill guy to get this.",
                        NeedsOcarina: true					
                    },
                    "Nocturne of Shadow": {
                        Name: "Nocturne of Shadow",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 35, y: 209 },
                        Age: Age.ADULT,
                        LongDescription: "You can get this item if you have the forest, fire, and water medallions. Just enter Kakariko Village as an adult.",
                        RequiredMedallions: [Medallions.FOREST_MEDALLION, Medallions.FIRE_MEDALLION, Medallions.WATER_MEDALLION]
                    },
                    "Gossip Stone in Open Grotto": {
                        Name: "Gossip Stone in Open Grotto",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 245, y: 123 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This stone is located in the grotto behind the fenced off area located behind the Potion Shop. Child can get there with a cucco or from sidehopping off the watchtower. Adult can simply walk through the Potion Shop."
                    },
                    
                    // Entrances
                    "Open Grotto Behind Potion Shop": {
                        Name: "Open Grotto Behind Potion Shop",
                        ItemGroup: ItemGroups.ENTRANCE,
                        IsGrotto: true,
                        MapInfo: { x: 245, y: 123 },
                        Age: Age.EITHER,
                        LongDescription: "This grotto is located behind the fenced off area located behind the Potion Shop. Child can get there with a cucco or from sidehopping off the watchtower. Adult can simply walk through the Potion Shop."
                    },
                    "Hidden Grotto near Tree": {
                        Name: "Hidden Grotto near Tree",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 142, y: 169 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This hidden grotto is between the tree and Talon's house. There's a slightly darker texture that you need to either hammer or bomb.",
                        IsHiddenGrotto: true
                    },
                    "Archery Minigame Entrance": {
                        Name: "Archery Minigame Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 190, y: 190 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.ADULT,
                        LongDescription: "This is the building that was being constructed as a child. It's near the well."
                    },
                    "Back of Impa's House": {
                        Name: "Back of Impa's House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 182, y: 252 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the opening above the cucco pen. You can get there as a child via the owl on the top of Death Mountain, or by using a cucco. To do this, throw it up the building under construction (2 throws), then jump to the border (when the construction worker isn't there), then jump at the platform - don't drop the cucco.<br/><br/>As adult, you must hookshot there. Hookshot first to the House of Skulltulas from the ledge by the entrance to Impa's house. Then, hookshot to Impa's house. Make your way to the ledge.<br/><br/>Alternatively, as adult, you can make your way directly under the opening, and simply hold forward to jump onto the ledge.",
                    },
                    "Impa's House": {
                        Name: "Impa's House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 141, y: 254 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the building that Anju stands by. The entrance is on the opposite site of the cucco pen.",
                    },
                    "House of Skulltula": {
                        Name: "House of Skulltula",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 141, y: 214 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the building near Impa's house, with the fence near the door."
                    },
                    "Windmill": {
                        Name: "Windmill",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 266, y: 152 },
                        IsInterior: true,
                        IsComplexEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the windmill entrance - it's up the stairs near the well."
                    },
                    "Talon's House": {
                        Name: "Talon's House",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 162, y: 165 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the building straight ahead of the tree, that has crate with the cucco next to it as a child."
                    },
                    "Bazaar Entrance": {
                        Name: "Bazaar Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 117, y: 89 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.childShopClips; },
                        Age: Age.EITHER,
                        LongDescription: "This is the building to the left if you are facing the Death Mountain entrance.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Settings.GlitchesToAllow.childShopClips && Data.hasSwordWeapon(age);
                        }
                    },
                    "Potion Shop Front Entrance": {
                        Name: "Potion Shop Front Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 163, y: 92 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the building to the right if you are facing the Death Mountain entrance.",
                    },
                    "Potion Shop Back Entrance": {
                        Name: "Potion Shop Back Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 192, y: 96 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.childShopClips; },
                        Age: Age.EITHER,
                        LongDescription: "This entrance to this is where the open grotto is behind the fence. You can use your hookshot to get back here via the roofs. You can also jump onto the potion shop roof from the Death Mountain entrance with a good angle.",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Settings.GlitchesToAllow.childShopClips && Data.hasSwordWeapon(age);
                        }
                    },
                    "Granny's Potion Shop": {
                        Name: "Granny's Potion Shop",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Kakariko Village",
                        Region: "main",
                        MapInfo: { x: 240, y: 133 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.ADULT,
                        LongDescription: "This is the building behind the potion shop, near the fence that you do the \"ladder jump\" off of.",
                    }
                }
            },

            beyondGate: {
                Exits: {
                    main: {
                        Name: "main"
                    },
                    "Death Mountain Trail": {
                        OwExit: OwExits["Kakariko Village"]["Death Mountain Trail"]
                    }
                },

                Entrances: {
                    main: {},
                    "Death Mountain Trail": {}
                },

                ItemLocations: {}
            }
        }
	},
    
    "Graveyard": {
        Abbreviation: "GVYD",
        MapGroup: MapGroups.KAKARIKO,
        Regions: {
            main: {
                Exits: {
                    top: {
                        Name: "top",
                        CustomRequirement: function(age) {
                            return Data.canGetToGraveyardTopEarly(age);
                        }
                    },

                    royalFamilyTomb: {
                        Name: "royalFamilyTomb",
                        RequiredSongs: [Songs.ZELDAS_LULLABY]
                    },

                    shadowTemple: {
                        Name: "shadowTemple",
                        CustomRequirement: function(age) {
                            return Data.canGetToGraveyardTopEarly(age);
                        }
                    },

                    "Kakariko Village": {
                        OwExit: OwExits["Graveyard"]["Kakariko Village"]
                    }
                },

                Entrances: {
                    top: {},
                    "Kakariko Village": {}
                },

                ItemLocations: {
                    "Hookshot Chest from Dampe Race": {
                        Name: "Hookshot Chest from Dampe Race",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 166, y: 86 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "This is the prize for completing the Dampe Race. Dampe's grave is the farthest one to the left when you first enter - pull it to reach the race."
                    },
                    "Chest in Grave with Redead": {
                        Name: "Chest in Grave with Redead",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 237, y: 184 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Go to the Royal Tomb gravestone at the front of the graveyard - position your camera the other way, toward the entrance. The grave will be the second one to your left. Once inside, walk up to the redead and play the Sun's Song to spawn the chest.",
                        RequiredSongs: [Songs.SUNS_SONG]
                    },
                    "Chest in Grave with Flowers": {
                        Name: "Chest in Grave with Flowers",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 206, y: 144 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "There's a gravestone when you first enter that has flowers in front of it. Pull it back and enter to get to the chest."
                    },
                    "Dampe's Heart-Pounding Graveyard Tour": {
                        Name: "Dampe's Heart-Pounding Graveyard Tour",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 184, y: 176 },
                        Age: Age.CHILD,
                        LongDescription: "Get to the graveyard when it's barely night time. If you play the Sun's Song, make sure you do it where time passes, then quickly take the exit to Kakariko before it becomes too late. Simply talk to Dampe and pay him 10 rupees to get this item."
                    },
                    "Heart Piece from Dampe Race": {
                        Name: "Heart Piece from Dampe Race",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 166, y: 94 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "This is the prize for completing the Dampe Race in less than one minute. Dampe's grave is the farthest one to the left when you first enter - pull it to reach the race."
                    },
                    "Heart Piece in Crate": {
                        Name: "Heart Piece in Crate",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 147, y: 81 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.boomerangGraveyardHP; },
                        LongDescription: "Plant a magic bean in the soft soil as a child. Come back as adult to get the item from the crate. Alternatively, the Longshot can reach the crate if you stand on one of the graves.",
                        CustomRequirement: function(age) {
                            if (Data.canUseBoomerang(age)) { 
                                return Settings.GlitchesToAllow.boomerangGraveyardHP && Data.canUseBoomerang(age);
                            }
                            
                            if (age === Age.CHILD) { return false; }
                            
                            let beanIsPlanted = Data.itemLocationObtained("Graveyard", "main", "*Plant Bean by Dampe's Grave");
                            return Items.HOOKSHOT.currentUpgrade === 2 || beanIsPlanted;
                        }
                    },
                    "Skulltula in Soil": {
                        Name: "Skulltula in Soil",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 159, y: 91 },
                        Age: Age.CHILD,
                        LongDescription: "Plant bugs in the soft soil by Dampe's grave.",
                        NeedsBottle: true
                    },
                    "Skulltula on Back Right Wall": {
                        Name: "Skulltula on Back Right Wall",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 242, y: 264 },
                        Age: Age.CHILD,
                        LongDescription: "At night, this skulltula is high up on the back right wall of the graveyard.",
                        IsAtShortDistance: true
                    },
                    "Sell Spooky Mask": {
                        Name: "Sell Spooky Mask",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 184, y: 145 },
                        Age: Age.CHILD,
                        RequiredItems: [{ item: Items.MASK_SLOT, upgradeString: "6" }],
                        LongDescription: "Talk to the graveyard kid during the day while wearing the Spooky Mask to sell it to him - this unlocks the Bunny Hood.",
                    },
                    "*Plant Bean by Dampe's Grave": {
                        Name: "*Plant Bean by Dampe's Grave",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 159, y: 91 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by Dampe's Grave. It's used to get to the freestanding heart piece in the box above."
                    },

                    // Entrances
                    "Grave with Flowers": {
                        Name: "Grave with Flowers",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 206, y: 144 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "There's a gravestone when you first enter that has flowers in front of it. Pull it back and enter to get to the grotto."
                    },
                    "Unmarked Grave": {
                        Name: "Unmarked Grave",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 237, y: 184 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Go to the Royal Tomb gravestone at the front of the graveyard - position your camera the other way, toward the entrance. The grave will be the second one to your left."
                    },
                    "Dampe's Shed": {
                        Name: "Dampe's Shed",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Graveyard",
                        Region: "main",
                        MapInfo: { x: 94, y: 246 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Located in the southeast corner of the graveyard.",
                    },
                    "Dampe's Grave": {
                        Name: "Dampe's Grave",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 166, y: 86 },
                        IsGrotto: true,
                        IsComplexEntrance: true,
                        Age: Age.ADULT,
                        LongDescription: "Under the grave in the in the northwest corner of the graveyard.",
                    }
                },
            },

            top: {
                Exits: {
                    main: {
                        Name: "main"
                    },

                    royalFamilyTomb: {
                        Name: "royalFamilyTomb",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.unloadGrave;
                        }
                    },

                    shadowTemple: {
                        Name: "shadowTemple",
                        RequiredItems: [Equipment.MAGIC, Items.DINS_FIRE]
                    },

                    "Nocturne Teleport Pad": {
                        OwExit: OwExits["Graveyard"]["Nocturne Teleport Pad"]
                    }
                },

                Entrances: {
                    main: {},
                    "Nocturne Teleport Pad": {}
                },

                ItemLocations: {
                    "Gossip Stone at Top Area": {
                        Name: "Gossip Stone at Top Area",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 341, y: 125 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is near the Nocturne of Shadow warp pad."
                    }
                }
            },

            royalFamilyTomb: {
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {
                        Name: "main"
                    }
                },

                Entrances: {}, // Nothing will ever need to check how you got here
                
                ItemLocations: {
                    "Royal Family's Tomb Chest": {
                        Name: "Royal Family's Tomb Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 303, y: 143 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "First, play Zelda's Lullaby in front of the big grave in the back of the graveyard if you haven't already. Enter the hole. Once inside, light the two torches to spawn the chest.",
                        NeedsFire: true
                    },
                    "Sun's Song": {
                        Name: "Sun's Song",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 303, y: 156 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "First, play Zelda's Lullaby in front of the big grave in the back of the graveyard if you haven't already. Enter the hole and go through the tomb to get the item.",
                        NeedsDamagingItem: true
                    },
                    
                    // Entrances
                    "Royal Family's Tomb": {
                        Name: "Royal Family's Tomb",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 303, y: 143 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play Zelda's Lullaby in front of the big grave in the back of the graveyard to reveal this entrance."
                    }
                }
            },

            shadowTemple: {
                ExcludeFromSpawnList: true,
                Exits: {
                    "Shadow Temple Entrance": {
                        OwExit: OwExits["Graveyard"]["Shadow Temple Entrance"]
                    }
                },

                Entrances: {},
                ItemLocations: {}
            }
        }
    },

    "Death Mountain Trail": {
		Abbreviation: "DMT",
		MapGroup: MapGroups.MOUNTAIN,
		Regions: {
            main: {
                Exits: {
                    upper: {
                        Name: "upper",
                        CustomRequirement: function(age) {
                            let canRideTrailBeanPlant = age === Age.ADULT && Data.itemLocationObtained("Death Mountain Trail", "main", "*Plant Bean by Dodongo's Cavern");
                            let areRocksGone = Data.canBlastOrSmash(age) || Data.itemLocationObtained("Death Mountain Trail", "main", "Break Rocks Blocking Top Path");
                            return canRideTrailBeanPlant || areRocksGone;
                        }
                    },

                    "Kakariko Village": {
                        OwExit: OwExits["Death Mountain Trail"]["Kakariko Village"]
                    },

                    "Goron City": {
                        OwExit: OwExits["Death Mountain Trail"]["Goron City"]
                    },

                    "Dodongo's Cavern Entrance": {
                        OwExit: OwExits["Death Mountain Trail"]["Dodongo's Cavern Entrance"]
                    }
                },

                Entrances: {
                    upper: {},
                    "Kakariko Village": {},
                    "Goron City": {}
                },

                ItemLocations: {
                    "Chest in Wall Near Goron City": {
                        Name: "Chest in Wall Near Goron City",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 212, y: 207 },
                        Age: Age.EITHER,
                        LongDescription: "If you take the left path out of Goron City, the wall to bomb or hammer will be to your right.",
                        NeedToBlastOrSmash: true
                    },
                    "Heart Piece Above Dodongo's Cavern": {
                        Name: "Heart Piece Above Dodongo's Cavern",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 180, y: 146 },
                        Age: Age.EITHER,
                        LongDescription: "You can do a slight angled backflip near the Bomb Flower above the cavern to get to this. Alternatively, you can plant a bean and ride it up."
                    },
                    "Song of Storms Grotto by Goron City": {
                        Name: "Song of Storms Grotto by Goron City",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 228, y: 172 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms in the center of the circle of rocks by Goron City to reveal a grotto with a chest.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Skulltula in Soil": {
                        Name: "Skulltula in Soil",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 179, y: 168 },
                        Age: Age.CHILD,
                        LongDescription: "After removing the boilder by Dodongo's Cavern, the soft soil to plant the bug in is revealed. If you need a weapon to kill it, use the bomb flower from above.",
                        OverrideItemGroupCondition: true,
                        NeedsExplosivesOrBombFlower: true,
                        NeedsBottle: true
                    },
                    "Red Rock by Goron City": {
                        Name: "Red Rock by Goron City",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 215, y: 167 },
                        Age: Age.ADULT,
                        LongDescription: "At night, leave Goron City. Follow the right wall until you reach a red rock. Break it with your hammer to reveal the skulltula.",
                        NeedsNighttime: true,
                        CustomRequirement: function(age) {
                            let canSkipHammer = Settings.GlitchesToAllow.dmtSkullsWithoutHammer && Items.HOOKSHOT.playerHas;
                            return canSkipHammer || Data.canUseHammer(age);
                        }
                    },
                    "In Wall by Kakariko": {
                        Name: "In Wall by Kakariko",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 151, y: 235 },
                        Age: Age.EITHER,
                        LongDescription: "From the Kakariko entrance, follow the right wall until you get to the discolored wall. Bomb or hammer it to reveal the skulltula. Child can Deku Stick jumpslash, Bomb, Bombchu, Slingshot, or Boomerang it. Adult can jumpslash it. You can climb the wall to collect the token.",
                        NeedToBlastOrSmash: true // Well, it has the same requirements
                    },
                    "*Plant Bean by Dodongo's Cavern":  {
                        Name: "*Plant Bean by Dodongo's Cavern",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 179, y: 168 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot in the entrance to Dodongo's Cavern. You must first destroy the rock to get to it. It can be used to skip blowing up the rocks to get to the top part of the mountain.",
                        NeedsExplosivesOrBombFlower: true,
                    },
                    "Break Rocks Blocking Top Path":  {
                        Name: "Break Rocks Blocking Top Path",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 202, y: 201 },
                        Age: Age.EITHER,
                        LongDescription: "Used for co-op. These are the rocks blocking the path to Death Mountain Crater.",
                        NeedToBlastOrSmash: true,
                        CoOpOnly: true
                    },
                    "Gossip Stone in Grotto by Goron City": {
                        Name: "Gossip Stone in Grotto by Goron City",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 228, y: 172 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms in the center of the circle of rocks by Goron City to reveal a grotto with this stone.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },

                    // Entrances
                    "Song of Storms Grotto near Goron City": {
                        Name: "Song of Storms Grotto near Goron City",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 228, y: 172 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms in the center of the circle of rocks by Goron City to reveal this grotto",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    }
                }
            },

            upper: {
                Exits: {
                    main: {
                        Name: "main"
                    },

                    "Death Mountain Crater": {
                        OwExit: OwExits["Death Mountain Trail"]["Death Mountain Crater"]
                    },

                    "Owl": {
                        OwExit: OwExits["Death Mountain Trail"]["Owl"]
                    }
                },

                Entrances: {
                    main: {},
                    "Death Mountain Crater": {}
                },

                ItemLocations: {
                    "Turn in Claim Check": {
                        Name: "Turn in Claim Check",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 238, y: 28 },
                        Age: Age.ADULT,
                        LongDescription: "When you have the Claim Check, head up to the top of Death Mountain. Give it to Biggoron for your item.",
                        RequiredItems: [Items.CLAIM_CHECK],
                    },
                    "Great Fairy Fountain": {
                        Name: "Great Fairy Fountain",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 220, y: 19 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is behind a wall you can destroy on the top of the mountain. Play Zelda's Lullaby at the triforce to receive an item.",
                        NeedToBlastOrSmash: true,
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY);
                        }
                    },
                    "Cow Grotto Before Volcano Path": {
                        Name: "Cow Grotto Before Volcano Path",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 200, y: 186 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This is under the yellow rock on the ledge right after you bomb the rocks to reach the upper part of the mountain.",
                        NeedToBlastOrSmash: true,
                    },
                    "Red Rock on Upper Path": {
                        Name: "Red Rock on Upper Path",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 217, y: 96 },
                        Age: Age.ADULT,
                        LongDescription: "At night, take the upper path of the mountain - the one that causes the volcano to erupt. The red rock has a skulltula in it - break it with your hammer.",
                        NeedsNighttime: true,
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.dmtSkullsWithoutHammer || Items.MEGATON_HAMMER.playerHas;
                        }
                    },
                    "Gossip Stone on Climbable Wall Ledge": {
                        Name: "Gossip Stone on Climbable Wall Ledge",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 225, y: 52 },
                        Age: Age.EITHER,
                        LongDescription: "On your way up the mountain, this gossip stone is on one of the ledges you pass by when you climb up the wall."
                    },
                    
                    // Entrances
                    "Great Fairy Fountain Entrance": {
                        Name: "Great Fairy Fountain Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Death Mountain Trail",
                        Region: "upper",
                        MapInfo: { x: 220, y: 19 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "This is behind a wall you can destroy on the top of the mountain.",
                        NeedToBlastOrSmash: true
                    },
                    "Cow Grotto": {
                        Name: "Cow Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 200, y: 186 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This is under the yellow rock on the ledge right after you bomb the rocks to reach the upper part of the mountain.",
                        NeedToBlastOrSmash: true
                    }
                }
            }
		}
    },
    	
	"Death Mountain Crater": {
		Abbreviation: "DMC",
		MapGroup: MapGroups.MOUNTAIN,
		Regions: {
            top: {
                Exits: {
                    middle: {
                        Name: "middle",
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || (age === Age.ADULT  && Equipment.HOVER_BOOTS.playerHas);
                        }
                    },

                    bottom: {
                        Name: "bottom",
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age);
                        }
                    },

                    "Mountain Top": {
                        OwExit: OwExits["Death Mountain Crater"]["Mountain Top"]
                    }
                },

                Entrances: {
                    middle: {},
                    "Mountain Top": {}
                },

                ItemLocations: {
                    "Grotto by Top Rocks": {
                        Name: "Grotto by Top Rocks",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 167, y: 260 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "At the top of the crater, bomb or hammer the middle of the circle of rocks to spawn a grotto containing a chest.",
                        NeedToBlastOrSmash: true
                    },
                    "Heart Piece in Wall": {
                        Name: "Heart Piece in Wall",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 186, y: 191 },
                        Age: Age.EITHER,
                        LongDescription: "At the top of the crater, you can climb down the wall that's facing the Fire Temple to receive this item - you'll start climbing if you backwalk off it."
                    },
                    "Skulltula in Crate": {
                        Name: "Skulltula in Crate",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 87, y: 250 },
                        Age: Age.CHILD,
                        LongDescription: "Enter from the top of Death Mountain Trail. Roll into the nearby crate to spawn this skulltula."
                    },
                    "Scrub by Ladder as Child": {
                        Name: "Scrub by Ladder as Child",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 85, y: 195 },
                        Age: Age.CHILD,
                        LongDescription: "When you enter the crater, follow the left wall. The scrub is on the bottom of the ladder you'll run into."
                    },
                    "Gossip Stone in Grotto by Top Rocks": {
                        Name: "Gossip Stone in Grotto by Top Rocks",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 172, y: 260 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the generic grotto on the top that is blocked by the yellow rock.",
                        NeedToBlastOrSmash: true
                    },
                    "Gossip Stone Behind Bombable Wall": {
                        Name: "Gossip Stone Behind Bombable Wall",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 284, y: 248 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is behind a bombable wall across a wooden bridge in the top area of the crater.",
                        NeedsExplosives: true
                    },

                    // Entrances
                    "Grotto in Center of Top Rocks": {
                        Name: "Grotto in Center of Top Rocks",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 172, y: 260 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "At the top of the crater, bomb or hammer the middle of the circle of rocks to reveal the grotto.",
                        Region: "top",
                        NeedToBlastOrSmash: true
                    }
                }
            },

            middle: {
                Exits: {
                    top: {
                        Name: "top"
                    },

                    bottom: {
                        Name: "bottom",
                        CustomRequirement: function(age) {
                            if (Data.canMegaFlip(age)) {
                                return true;
                            }
                            
                            return age === Age.ADULT && (Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas);
                        }
                    },

                    volcano: {
                        Name: "volcano",
                        CustomRequirement: function(age) {
                            return Data.canMegaFlip(age) || (Settings.GlitchesToAllow.hoverToVolcanoHP && age === Age.ADULT && Equipment.HOVER_BOOTS.playerHas);
                        }
                    },

                    "Goron City": {
                        OwExit: OwExits["Death Mountain Crater"]["Goron City"]
                    }
                },

                Entrances: {
                    top: {},
                    bottom: {},
                    "Goron City": {}
                },

                ItemLocations: {
                    "Great Fairy Fountain": {
                        Name: "Great Fairy Fountain",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 65, y: 170 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.childDoubleMagicFairy && !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "Hammer the silver rocks that are to the left of the Goron City entrance (if you face the entrance). Play Zelda's Lullaby inside to get the item.",
                        RequiredAdultItems: [Items.MEGATON_HAMMER],
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Data.canUseHammer(age) || Settings.GlitchesToAllow.childDoubleMagicFairy;
                        },
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY);
                        }
                    },
                    "Left Scrub in Grotto by Goron": {
                        Name: "Left Scrub in Grotto by Goron",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 60, y: 60 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Hammer the silver rock near the entrance to Goron City to access these scrubs.",
                        RequiredItems: [Items.MEGATON_HAMMER]
                    },
                    "Middle Scrub in Grotto by Goron": {
                        Name: "Middle Scrub in Grotto by Goron",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 64, y: 60 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Hammer the silver rock near the entrance to Goron City to access these scrubs.",
                        RequiredItems: [Items.MEGATON_HAMMER]
                    },
                    "Right Scrub in Grotto by Goron": {
                        Name: "Right Scrub in Grotto by Goron",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 68, y: 60 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Hammer the silver rock near the entrance to Goron City to access these scrubs.",
                        RequiredItems: [Items.MEGATON_HAMMER]
                    },

                    // Entrances
                    "Great Fairy Fountain Entrance": {
                        Name: "Great Fairy Fountain Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Death Mountain Crater",
                        Region: "middle",
                        MapInfo: { x: 65, y: 170 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.childDoubleMagicFairy && !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "Hammer the silver rocks that are to the left of the Goron City entrance (if you face the entrance) to uncover the entrance.",
                        RequiredAdultItems: [Items.MEGATON_HAMMER],
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) { return true; }
                            return Data.canUseHammer(age) || Settings.GlitchesToAllow.childDoubleMagicFairy;
                        }
                    },
                    "Grotto in Silver Rock by Goron": {
                        Name: "Grotto in Silver Rock by Goron",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 64, y: 60 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.childDoubleMagicFairy && !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "Hammer the silver rock near the entrance to Goron City to access this grotto.",
                        RequiredItems: [Items.MEGATON_HAMMER]
                    }
                }
            },

            bottom: {
                Exits: {
                    middle: {
                        Name: "middle",
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            let beanPlanted = Data.itemLocationObtained("Death Mountain Crater", "bottom", "*Plant Bean by Bolero Warp Point");
                            return beanPlanted || Items.HOOKSHOT.playerHas || Equipment.HOVER_BOOTS.playerHas; 
                        }
                    },

                    volcano: {
                        Name: "volcano",
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Death Mountain Crater", "bottom", "*Plant Bean by Bolero Warp Point");
                        }
                    },

                    "Fire Temple Entrance": {
                        OwExit: OwExits["Death Mountain Crater"]["Fire Temple Entrance"]
                    },

                    "Bolero Teleport Pad": {
                        OwExit: OwExits["Death Mountain Crater"]["Bolero Teleport Pad"]
                    }
                },

                Entrances: {
                    top: {},
                    middle: {},
                    "Bolero Teleport Pad": {}
                },

                ItemLocations: {
                    "Skulltula in Soil": {
                        Name: "Skulltula in Soil",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 177, y: 95 },
                        Age: Age.CHILD,
                        LongDescription: "Use the Bolero of fire to get here as a child. Drop bugs in the nearby soft soil to spawn the skulltula.",
                        Region: "bottom",
                        NeedsBottle: true
                    },
                    "Bolero of Fire": {
                        Name: "Bolero of Fire",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 161, y: 84 },
                        Age: Age.ADULT,
                        LongDescription: "You will get this item as adult when you reach the part of the broken bridge that touches the land.",
                        Region: "bottom"
                    },
                    "*Plant Bean by Bolero Warp Point": {
                        Name: "*Plant Bean by Bolero Warp Point",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 177, y: 95 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the Bolero of Fire warp point. It helps you get to the heart piece on the volcano.",
                        Region: "bottom"
                    }
                }
            },

            volcano: {
                ExcludeFromSpawnList: true,

                // This region is just for the one item check, no need to list exits and entrances
                Exits: {},
                Entrances: {},

                ItemLocations: {
                    "Heart Piece on Volcano": {
                        Name: "Heart Piece on Volcano",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 134, y: 78 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.megaFlip; },
                        LongDescription: "Plant a bean in the soft soil by the Bolero warp point then ride it up to the volcano. You can also use hover boots near the entrance to Goron City to get it."
                    }
                }
            }
		}
    },
    
    "Goron City": {
		Abbreviation: "GORO",
		MapGroup: MapGroups.MOUNTAIN,
		Regions: {
            main: {
                Exits: {
                    darunia: {
                        Name: "darunia",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return Data.canPlaySong(Songs.ZELDAS_LULLABY); }
				            return Data.hasExplosivesOrStrength() || Items.FAIRY_BOW.playerHas;
                        }
                    },

                    lostWoodsRocks: {
                        Name: "lostWoodsRocks",
                        CustomRequirement: function(age) {
                            if (Data.itemLocationObtained("Goron City", "lostWoodsRocks", "Rocks Blocking Lost Woods")) {
                                return true;
                            }

                            let canLightBombFlower = age === Age.CHILD && Data.canUseFireItem(age) && Items.DEKU_STICK.playerHas;
                            return canLightBombFlower || Data.hasExplosivesOrStrength();
                        }
                    },

                    spinningUrn: {
                        Name: "spinningUrn",
                        Age: Age.CHILD,
                        NeedsFire: true
                    },

                    shop: {
                        Name: "shop",
                        CustomRequirement: function(age) {
                            if (Data.hasExplosivesOrStrength() || (age === Age.ADULT && Items.FAIRY_BOW.playerHas)) { return true; }
                            return age === Age.CHILD && Items.DEKU_STICK.playerHas && Data.canUseFireItem(age);
                        }
                    },

                    "Death Mountain Trail": {
                        OwExit: OwExits["Goron City"]["Death Mountain Trail"]
                    }
                },

                Entrances: {
                    darunia: {},
                    lostWoodsRocks: {},
                    "Death Mountain Trail": {}
                },

                ItemLocations: {
                    "Stop Rolling Goron as Child": {
                        Name: "Stop Rolling Goron as Child",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 165, y: 67 },
                        Age: Age.CHILD,
                        LongDescription: "Blow up the rolling goron while he's in the tunnel and talk to him to get the item.",
                        NeedsExplosives: true
                    },
                    "Stop Rolling Goron as Adult": {
                        Name: "Stop Rolling Goron as Adult",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 139, y: 97 },
                        Age: Age.ADULT,
                        LongDescription: "Stop the rolling goron with a bomb, bombchu or bomb flower and talk to him to get the item. You can also shoot the bomb flowers with an arrow with the right timing to stop him.",
                        CustomRequirement: function(age) {
                            return Data.hasExplosivesOrStrength() || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "Item From Medigoron": {
                        Name: "Item From Medigoron",
                        ItemGroup: ItemGroups.GIFT,
                        RequiredToAppear: function() { return Settings.RandomizerSettings.shuffleCarpetAndMedigoron; },
                        MapInfo: { x: 127, y: 136 },
                        Age: Age.ADULT,
                        LongDescription: "Blow up/hammer the weak walls on the western side of the middle floor. Pay Medigoron 200 rupees for this item.",
                        RequiredItems: [{item: Equipment.WALLET, upgradeString: "1"}],
                        CustomRequirement: function(age) {
                            return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
                        }
                    },
                    "Leftmost Maze Chest": {
                        Name: "Leftmost Maze Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 71, y: 24 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.equipSwap; },
                        LongDescription: "Make your way to the topmost northwest corner of the city. Use your hammer and break the line of red rocks to get to this lone chest at the back left corner of the maze.<br /><br />You can also pick up the silver rocks if you have the silver or golden gauntlets.",
                        CustomRequirement: function(age) {
                            return Data.canUseHammer(age) || (age === Age.ADULT && Equipment.STRENGTH.currentUpgrade > 1);
                        }
                    },
                    "Left Maze Chest": {
                        Name: "Left Maze Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 78, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this chest.",
                        CustomRequirement: function(age) {
                            if (Data.canBlastOrSmash(age)) { return true; }
                            if (age === Age.CHILD) { return false; }
                            return Equipment.STRENGTH.currentUpgrade > 1; // Silver gaunts+
                        }
                    },
                    "Right Maze Chest": {
                        Name: "Right Maze Chest",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 86, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this chest.",
                        CustomRequirement: function(age) {
                            if (Data.canBlastOrSmash(age)) { return true; }
                            if (age === Age.CHILD) { return false; }
                            return Equipment.STRENGTH.currentUpgrade > 1; // Silver gaunts+
                        }
                    },
                    "Skulltula in Maze Crate": {
                        Name: "Skulltula in Maze Crate",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 91, y: 25 },
                        Age: Age.CHILD,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb or hammer the rocks to get to the back right corner of the maze. Roll into the crate the get this skulltula.",
                        NeedToBlastOrSmash: true
                    },
                    "Skulltula on Center Platform": {
                        Name: "Skulltula on Center Platform",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 180, y: 137 },
                        Age: Age.ADULT,
                        LongDescription: "There's a skulltula on the back side of the center platform. You may have to jump for it from the ropes if you don't have a hookshot."
                    },
                    "Left Scrub in Lava Room Grotto": {
                        Name: "Left Scrub in Lava Room Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 274, y: 21 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Head to the east side of the middle floor and enter the hallway. You should see a lava room to your left. There is a grotto there with the scrubs. There are a few ways to get across.<br/><br/>One way is to run across the lava to the other side, play the song of time, and then climb onto the block to reach the other side.<br/><br/>Another way is to equip the Goron Tunic, run across the lava for distance and then quickly hookshot the target before the damage cancels you out of your hookshot.<br/><br/>Finally, if you have the longshot and the song of time, play the song at the start of the lava room. Stand on the block and longshot the target to get across.",
                        CustomRequirement: function(age) {
                            let canHookshotUp = Equipment.GORON_TUNIC.playerHas && Items.HOOKSHOT.playerHas;
                            return canHookshotUp || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },
                    "Middle Scrub in Lava Room Grotto": {
                        Name: "Middle Scrub in Lava Room Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 278, y: 21 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Head to the east side of the middle floor and enter the hallway. You should see a lava room to your left. There is a grotto there with the scrubs. There are a few ways to get across.<br/><br/>One way is to run across the lava to the other side, play the song of time, and then climb onto the block to reach the other side.<br/><br/>Another way is to equip the Goron Tunic, run across the lava for distance and then quickly hookshot the target before the damage cancels you out of your hookshot.<br/><br/>Finally, if you have the longshot and the song of time, play the song at the start of the lava room. Stand on the block and longshot the target to get across.",
                        CustomRequirement: function(age) {
                            let canHookshotUp = Equipment.GORON_TUNIC.playerHas && Items.HOOKSHOT.playerHas;
                            return canHookshotUp || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },
                    "Right Scrub in Lava Room Grotto": {
                        Name: "Right Scrub in Lava Room Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 282, y: 21 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Head to the east side of the middle floor and enter the hallway. You should see a lava room to your left. There is a grotto there with the scrubs. There are a few ways to get across.<br/><br/>One way is to run across the lava to the other side, play the song of time, and then climb onto the block to reach the other side.<br/><br/>Another way is to equip the Goron Tunic, run across the lava for distance and then quickly hookshot the target before the damage cancels you out of your hookshot.<br/><br/>Finally, if you have the longshot and the song of time, play the song at the start of the lava room. Stand on the block and longshot the target to get across.",
                        CustomRequirement: function(age) {
                            let canHookshotUp = Equipment.GORON_TUNIC.playerHas && Items.HOOKSHOT.playerHas;
                            return canHookshotUp || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    },
                    "Gossip Stone in Maze": {
                        Name: "Gossip Stone in Maze",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 82, y: 26 },
                        Age: Age.EITHER,
                        LongDescription: "Make your way to the topmost northwest corner of the city. Bomb, hammer, or pick up (only silvers) the rocks to get to the back right corner of the maze for this stone.",
                        CustomRequirement: function(age) {
                            if (Data.canBlastOrSmash(age)) { return true; }
                            return age === Age.ADULT && Equipment.STRENGTH.currentUpgrade > 1; // Silver gaunts+
                        }
                    },
                    "Gossip Stone By Medigoron": {
                        Name: "Gossip Stone By Medigoron",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 115, y: 275 },
                        Age: Age.EITHER,
                        LongDescription: "In the southern area of the middle floor, blow up the walls that has bombflowers near it. Eventually, you'll make it to Medigoron, where the stone is.",
                        CustomRequirement: function(age) {
                            return Data.hasExplosivesOrStrength() || Data.canUseHammer(age);
                        }
                    },
                    
                    // Entrances
                    "Lava Room Grotto": {
                        Name: "Lava Room Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 278, y: 21 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Head to the east side of the middle floor and enter the hallway. You should see a lava room to your left. There is a grotto there with the scrubs. There are a few ways to get across.<br/><br/>One way is to run across the lava to the other side, play the song of time, and then climb onto the block to reach the other side.<br/><br/>Another way is to equip the Goron Tunic, run across the lava for distance and then quickly hookshot the target before the damage cancels you out of your hookshot.<br/><br/>Finally, if you have the longshot and the song of time, play the song at the start of the lava room. Stand on the block and longshot the target to get across.",
                        CustomRequirement: function(age) {
                            let canHookshotUp = Equipment.GORON_TUNIC.playerHas && Items.HOOKSHOT.playerHas;
                            return canHookshotUp || Data.canPlaySong(Songs.SONG_OF_TIME);
                        }
                    }
                }
            },

            darunia: {
                Exits: {
                    main: {
                        Name: "main"
                    },

                    spinningUrn: {
                        Name: "spinningUrn",
                        RequiredItems: [Items.DEKU_STICK]
                    },

                    lostWoodsRocks: {
                        Name: "lostWoodsRocks",
                        RequiredItems: [Items.DEKU_STICK]
                    },

                    shop: {
                        Name: "shop",
                        Age: Age.CHILD,
                        CustomRequirement: function(age) {
                            return Items.DEKU_STICK.playerHas;
                        }
                    },

                    "Death Mountain Crater": {
                        OwExit: OwExits["Goron City"]["Death Mountain Crater"]
                    }
                },

                Entrances: {
                    main: {},
                    "Death Mountain Crater": {}
                },

                ItemLocations: {
                    "Darunia's Joy": {
                        Name: "Darunia's Joy",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 187, y: 30 },
                        Age: Age.CHILD,
                        LongDescription: "At the bottom of Goron City on the fancy carpet, play Zelda's Lullaby. If you can manage to get to the Goron City entrance from the crater, that workstoo. Inside, play Saria's Song by Darunia get an item.",
                        RequiredSongs: [Songs.SARIAS_SONG]
                    }
                }
            },

            lostWoods: {
                Exits: {
                    lostWoodsRocks: {
                        Name: "lostWoodsRocks",
                        CustomRequirement: function(age) {
                            return Data.hasExplosives() || Data.itemLocationObtained("Goron City", "lostWoodsRocks", "Rocks Blocking Lost Woods");
                        }
                    },

                    "Lost Woods": {
                        OwExit: OwExits["Goron City"]["Lost Woods"]
                    }
                },

                Entrances: {
                    lostWoodsRocks: {},
                    "Lost Woods": {}
                },

                ItemLocations: {}
            },

            lostWoodsRocks: {
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {
                        Name: "main"
                    },

                    lostWoods: {
                        Name: "lostWoods"
                    }
                },

                Entrances: {
                    main: {},
                    lostWoods: {}
                },

                ItemLocations: {
                    "Rocks Blocking Lost Woods": {
                        Name: "Rocks Blocking Lost Woods",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 212, y: 178 },
                        Age: Age.EITHER,
                        LongDescription: "These are the rocks blocking the Lost Woods entrance. Either blow them up, or use a deku stick lit on fire to activate the nearby bomb flowers.",
                        IsPostWalkCheck: true,
                        CustomRequirement: function(age) {
                            if (Data.hasExplosives()) { return true; }

                            let canGetToMain = Data.canAccessMap(age, "Goron City", "main");
                            let canLightBombFlower = age === Age.CHILD && Items.DEKU_STICK.playerHas && Data.canAccessMap(age, "Goron City", "darunia");
                            return canGetToMain && (canLightBombFlower || Equipment.STRENGTH.currentUpgrade > 1);
                        }
                    }
                }
            },

            spinningUrn: {
                ExcludeFromSpawnList: true,

                // Only used for the one item check, so no need to mark exits and entrances
                Exits: {},
                Entrances: {},

                ItemLocations: {
                    "Spinning Urn Heart Piece": {
                        Name: "Spinning Urn Heart Piece",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 189, y: 126 },
                        Age: Age.CHILD,
                        LongDescription: "First, light the torches at the bottom of the city. You can either use the lit torch in Darunia's room, or Din's Fire. After that, throw a Bomb or Bomb Flower so that the urn stops on the happiest face to get the item.",
                        RequiredChoiceOfItems: [Items.BOMB, Equipment.STRENGTH]
                    }
                }
            },

            shop: {
                Exits: {
                    main: {
                        Name: "main"
                    }
                },
                Entrances: {
                    main: {},
                },

                ItemLocations: {
                    "Shop": {
                        Name: "Shop",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: { x: 159, y: 132 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "The shop is at the bottom of the city - the entrance is in the middle of two Bomb Flowers on the wall.<br/><br/>As child, either light one on fire with a Deku Stick, or simply blow up the wall with an explosive. If you don't have your own, use the bomb flowers on the level with the rolling goron.<br/><br/>As an adult, you must stop the rolling goron and he will open it for you. Note that you can arrow the bomb flowers to do this.",
                        OneWayInteriorSpawnEntrance: true
                    },
                    "Shop Entrance": {
                        Name: "Shop Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Goron City",
                        Region: "shop",
                        MapInfo: { x: 159, y: 132 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "The shop is at the bottom of the city - the entrance is in the middle of two Bomb Flowers on the wall. As child, either light one on fire with a Deku Stick, or simply blow up the wall with an explosive. As an adult, you must stop the rolling goron and he will open it for you."
                    }
                }
            }
		}
    },
    
	"Zora's River": {
		Abbreviation: "RIVR",
		MapGroup: MapGroups.WATER,
		Regions: {
            downstream: {
                Exits: {
                    upstream: {
                        Name: "upstream",
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || 
                                Data.canBlastOrSmash(age) ||
                                Data.itemLocationObtained("Zora's River", "downstream", "Break Rocks Blocking Path");
                        }
                    },

                    "Hyrule Field": {
                        OwExit: OwExits["Zora's River"]["Hyrule Field"]
                    }
                },

                Entrances: {
                    upstream: {},
                    "Hyrule Field": {}
                },

                ItemLocations: {
                    "Skulltula in Tree": {
                        Name: "Skulltula in Tree",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 9, y: 177 },
                        Age: Age.CHILD,
                        LongDescription: "Enter the river from Hyrule Field. The skulltula will appear if you roll into the tree that's straight ahead."
                    },
                    "Break Rocks Blocking Path": {
                        Name: "Break Rocks Blocking Path",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 23, y: 169 },
                        Age: Age.CHILD,
                        LongDescription: "Used for co-op. These are the rocks blocking the entrance to Zora's River.",
                        NeedToBlastOrSmash: true,
                        CoOpOnly: true
                    }
                }
            },

            upstream: {
                Exits: {
                    downstream: {
                        Name: "downstream"
                    },

                    inWaterfall: {
                        Name: "inWaterfall",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT && Settings.GlitchesToAllow.hoversToZorasDomain && Equipment.HOVER_BOOTS.playerHas) {
                                return true; // Hover in
                            } else if (age === Age.CHILD && Settings.GlitchesToAllow.cuccoToZorasDomain) {
                                return true; // Flying cucco
                            }
                            
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY) || Data.canMegaFlip(age);
                        }
                    },

                    "Lost Woods": {
                        OwExit: OwExits["Zora's River"]["Lost Woods"]
                    }
                },

                Entrances: {
                    downstream: {},
                    inWaterfall: {},
                    "Lost Woods": {}
                },

                ItemLocations: {
                    "Open Grotto on Cliff": {
                        Name: "Open Grotto on Cliff",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 132, y: 217 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Go up the ladder closest to Hyrule Field. Jump to the cliff behind you and enter the grotto to find this chest."
                    },
                    "Heart Piece on River Platform": {
                        Name: "Heart Piece on River Platform",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 125, y: 94 },
                        Age: Age.EITHER,
                        LongDescription: "In the middle of the map, there's a heart piece on a high up platform. You can get this as a child using cuccos to fly to the platform. As adult, you can use hover boots from the cliff that you take a ladder to get up.",
                        RequiredAdultItems: [Equipment.HOVER_BOOTS]
                    },
                    "Heart Piece by Waterfall": {
                        Name: "Heart Piece by Waterfall",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 266, y: 56 },
                        Age: Age.EITHER,
                        LongDescription: "At the end of the river, there's a heart piece on a platform. As child, you can jump there with a cucco or nab it with a Boomerang. As adult, you must use the Hover Boots.",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            if (Equipment.HOVER_BOOTS.playerHas || Settings.GlitchesToAllow.adultWaterfallHPJump) { return true; }
                            return Items.BOMBCHU.playerHas && Data.canMegaFlip(age);
                        }
                    },
                    "Bean Guy": {
                        Name: "Bean Guy",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 72, y: 139 },
                        Age: Age.CHILD,
                        LongDescription: "This is the guy who sells beans near the Hyrule Field entrance."
                    },
                    "Frog Song of Storms": {
                        Name: "Frog Song of Storms",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 156, y: 99 },
                        Age: Age.CHILD,
                        LongDescription: "Play the Song of Storms for the frogs near the middle of the map to receive this item.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Frog Bug Minigame": {
                        Name: "Frog Bug Minigame",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 161, y: 99 },
                        Age: Age.CHILD,
                        LongDescription: "Play all the non-warp songs for the frogs to play the bug minigame. The notes are as follows: A < > v < > v A v A v > < A",
                        RequiredSongs: [Songs.ZELDAS_LULLABY, Songs.EPONAS_SONG, Songs.SARIAS_SONG, Songs.SUNS_SONG, Songs.SONG_OF_STORMS, Songs.SONG_OF_TIME]
                    },
                    "Song of Storms Grotto Front Scrub": {
                        Name: "Song of Storms Grotto Front Scrub",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 15, y: 145 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms in the center of the rocks near the cucco spawn to reveal the scrub grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Song of Storms Grotto Back Scrub": {
                        Name: "Song of Storms Grotto Back Scrub",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 15 , y: 140 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms in the center of the rocks near the cucco spawn to reveal the scrub grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Skulltula on Ladder": {
                        Name: "Skulltula on Ladder",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 281, y: 142 },
                        Age: Age.CHILD,
                        LongDescription: "At night, make your way to the end of the river. You'll find the skulltula on the ladder leading up out of the water.",
                        NeedsNighttime: true
                    },
                    "Skulltula by Bridge": {
                        Name: "Skulltula by Bridge",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 249, y: 62 },
                        Age: Age.ADULT,
                        LongDescription: "At night, a little after the wooden bridge leading to Zora's Domain, you'll find a skulltula high up on the wall. You can get it with the hookshot if you stand on the fence.",
                        IsAtShortDistance: true,
                        NeedsNighttime: true
                    },
                    "Skulltula on Cliff": {
                        Name: "Skulltula on Cliff",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 132, y: 153 },
                        Age: Age.ADULT,
                        LongDescription: "At night, go up the ladder closest to Hyrule Field. Jump to the cliff behind you to find the skulltula.",
                        IsAtShortDistance: true,
                        NeedsNighttime: true
                    },
                    "Plant Bean by Bean Guy": {
                        Name: "Plant Bean by Bean Guy",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 72, y: 142 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the guy who sells beans. It's only used for convenience sake."
                    },
                    "Gossip Stone in Open Grotto on Cliff": {
                        Name: "Gossip Stone in Open Grotto on Cliff",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 132, y: 217 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        IsGrotto: true,
                        LongDescription: "Go up the ladder closest to Hyrule Field. Jump to the cliff behind you and enter the grotto to find the stone."
                    },
                    "Gossip Stone on Cliff": {
                        Name: "Gossip Stone on Cliff",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 155, y: 176 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "Go up the ladder closest to Hyrule Field. The stone is across the tiny bridge."
                    },
                    "Gossip Stone by Waterfall": {
                        Name: "Gossip Stone by Waterfall",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 300, y: 145 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on one of the platforms in the water by the Zora's Domain entrance."
                    },
                    
                    // Entrances
                    "Song of Storms Grotto": {
                        Name: "Song of Storms Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 15, y: 145 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Play the Song of Storms in the center of the rocks near the cucco spawn to reveal the grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    },
                    "Open Grotto on Upper Cliff": {
                        Name: "Open Grotto on Upper Cliff",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 132, y: 217 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Go up the ladder closest to Hyrule Field. Jump to the cliff behind you and enter the grotto."
                    },
                    "Grotto Under Rock on Upper Cliff": {
                        Name: "Grotto Under Rock on Upper Cliff",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 159, y: 206 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Go up the ladder closest to Hyrule Field. This grotto is under the yellow rock at the top.",
                        NeedToBlastOrSmash: true
                    }
                }
            },

            inWaterfall: {
                Exits: {
                    upstream: {
                        Name: "upstream"
                    },

                    "Zora's Domain": {
                        OwExit: OwExits["Zora's River"]["Zora's Domain"]
                    },
                },

                Entrances: {
                    upstream: {},
                    "Zora's Domain": {}
                },
                
                ItemLocations: {}
            }
		}
	},

	"Zora's Domain": {
		Abbreviation: "DOMN",
		MapGroup: MapGroups.WATER,
		Regions: {
            main: {
                Exits: {
                    behindKing: {
                        Name: "behindKing",
                        CustomRequirement: function(age) {
                            // Already moved, or can move now
                            if (Data.itemLocationObtained("Zora's Domain", "main", "Move King Zora")) { return true; }
                            if (age === Age.CHILD && Items.RUTOS_LETTER.playerHas) { return true; }

                            // Open Zora's Fountain settings
                            switch (Settings.RandomizerSettings.openZorasFountain) {
                                case OpenZorasFountainSettings.ADULT:
                                    if (age === Age.ADULT) { return true; }
                                    break;
                                case OpenZorasFountainSettings.ALL:
                                    return true;
				            }
                
                            // Glitch past him
                            let canSkipAsChild = age === Age.CHILD && 
                                Settings.GlitchesToAllow.chuZoraSkip && 
                                Equipment.DEKU_SHIELD.playerHas &&
                                Items.BOMBCHU.playerHas &&
                                Data.hasSwordWeapon(age);

                            let canSkipAsAdult = age === Age.ADULT && Settings.GlitchesToAllow.clipZoraSkip;

                            return canSkipAsChild || canSkipAsAdult;
                        }
                    },

                    "Zora's River": {
                        OwExit: OwExits["Zora's Domain"]["Zora's River"]
                    },

                    "Lake Hylia": {
                        OwExit: OwExits["Zora's Domain"]["Lake Hylia"]
                    }
                },

                Entrances: {
                    behindKing: {},
                    "Zora's River": {},
                    "Lake Hylia": {}
                },

                ItemLocations: {
                    "Torch Run": {
                        Name: "Torch Run",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 154, y: 132 },
                        Age: Age.CHILD,
                        LongDescription: "Start at King Zora. Light a Deku Stick on one of the torches and make your way down the stairs. Light the next torch. Follow the left wall, lighting the torches as you go. Once you light the ones in the waterfall, a chest will spawn.",
                        RequiredItems: [Items.DEKU_STICK]
                    },
                    "Diving Minigame": {
                        Name: "Diving Minigame",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 158, y: 75 },
                        Age: Age.CHILD,
                        LongDescription: "At the top of the Domain, pay 20 rupees to play the diving minigame. Talk to the Zora after you win to get your prize."
                    },
                    "Unfreeze King Zora": {
                        Name: "Unfreeze King Zora",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 233, y: 46 },
                        Age: Age.ADULT,
                        LongDescription: "Dump Blue Fire on the frozen King Zora to thaw him. Talk to him from the platform in front of him and he will give you an item.",
                        RequiredItems: [Items.BLUE_FIRE]
                        //TODO: add the thaw glitch
                    },
                    "Skulltula on Top of Waterfall": {
                        Name: "Skulltula on Top of Waterfall",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 168, y: 68 },
                        Age: Age.ADULT,
                        LongDescription: "At night, make your way up to where the Diving Game start was. On the side of the wall by the waterfall, you'll find a skulltula. If you have no hookshot, you can kill it with a bow or Din's fire and get it with an angled jump. If you fall without getting it, it will respawn.",
                        CustomRequirement: function(age) {
                            return Data.canUseFireItem(age) || Items.HOOKSHOT.playerHas || Items.FAIRY_BOW.playerHas;
                        }
                    },
                    "Shop": {
                        Name: "Shop",
                        ItemGroup: ItemGroups.SHOP,
                        MapInfo: { x: 236, y: 254 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the shop. As an adult, you can either use Blue Fire, or perform the shop skip to get inside.",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Items.BLUE_FIRE.playerHas || Settings.GlitchesToAllow.blueFireShopSkip;
                        },
                        OneWayInteriorSpawnEntrance: true
                    },
                    "Gossip Stone by King": {
                        Name: "Gossip Stone by King",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 239, y: 63 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the water in front of the king."
                    },
                    "Move King Zora": {
                        Name: "Move King Zora",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: {x: 233, y: 46},
                        RequiredItems: [Items.RUTOS_LETTER],
                        Age: Age.CHILD,
                        LongDescription: "Show Ruto's letter to the king."
                    },
                    
                    // Entrances
                    "Shop Entrance": {
                        Name: "Shop Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Zora's Domain",
                        Region: "main",
                        MapInfo: { x: 236, y: 254 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the shop. As an adult, you can either use Blue Fire, or perform the shop skip to get inside.",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            return Items.BLUE_FIRE.playerHas || (Settings.GlitchesToAllow.blueFireShopSkip && Data.hasShield(age));
                        }
                    },
                    "Song of Storms Grotto": {
                        Name: "Song of Storms Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 118, y: 162 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "When you first enter, jump off the cliff to your left. Stand on the little island and play the Song of Storms to reveal this grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    }
                }
            },

            behindKing: {
                Exits: {
                    main: {
                        Name: "main",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Zora's Domain", "main", "Move King Zora");
                        }
                    },

                    "Zora's Fountain": {
                        OwExit: OwExits["Zora's Domain"]["Zora's Fountain"]
                    }
                },

                Entrances: {
                    main: {},
                    "Zora's Fountain": {}
                },

                ItemLocations: {}
            }
		}
	},

	"Zora's Fountain": {
		Abbreviation: "FNTN",
		MapGroup: MapGroups.WATER,
		Regions: {
            main: {
                Exits: {
                    "Zora's Domain": {
                        OwExit: OwExits["Zora's Fountain"]["Zora's Domain"]
                    },

                    "Jabu Jabu's Belly Entrance": {
                        OwExit: OwExits["Zora's Fountain"]["Jabu Jabu's Belly Entrance"]
                    },

                    "Ice Cavern Entrance": {
                        OwExit: OwExits["Zora's Fountain"]["Ice Cavern Entrance"]
                    }
                },

                Entrances: {
                    "Zora's Domain": {}
                },

                ItemLocations: {
                    "Great Fairy Fountain": {
                        Name: "Great Fairy Fountain",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 266, y: 269 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Go to the southeast corner of the map. Bomb or hammer the wall by the rocks. Play Zelda's Lullaby inside to get an item.",
                        NeedsExplosives: true,
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY);
                        }
                    },
                    "Heart Piece on Iceberg": {
                        Name: "Heart Piece on Iceberg",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 257, y: 111 },
                        Age: Age.ADULT,
                        LongDescription: "This heart piece is on an ice berg in the middle of the lake. You can get it without jumping to it if you climb one of the sides, then spam B to jumpslash onto it. Just make sure you're on a side where you aren't being attacked!"
                    },
                    "Heart Piece in Lake": {
                        Name: "Heart Piece in Lake",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 209, y: 137 },
                        Age: Age.ADULT,
                        LongDescription: "Use your iron boots to sink to the middle of the lake. Note that walking down is faster than sinking down! Same applies for going back up.",
                        RequiredItems: [Equipment.IRON_BOOTS]
                    },
                    "Skulltula in Tree": {
                        Name: "Skulltula in Tree",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 257, y: 234 },
                        Age: Age.CHILD,
                        LongDescription: "Go to the southeast corner of the map. Roll into the tree to find this skulltula."
                    },
                    "Skulltula on Wall": {
                        Name: "Skulltula on Wall",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 81, y: 177 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you'll find this skulltula on the wall by the giant log.",
                        IsAtShortDistance: true,
                        NeedsNighttime: true
                    },
                    "Skulltula in Hidden Tunnel": {
                        Name: "Skulltula in Hidden Tunnel",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 312, y: 154 },
                        Age: Age.ADULT,
                        LongDescription: "At night, go to the southeast corner of the map. Pick up the silver rock and go down the path. Beware of invisible giant skulltulas! You'll find the skulltula you want after you climb the wall.",
                        IsAtShortDistance: true,
                        NeedToBlastOrSmash: true,
                        RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
                    },
                    "Gossip Stone Left of Jabu Platform": {
                        Name: "Gossip Stone Left of Jabu Platform",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 122, y: 51 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This stone is to the left of the Jabu Jabu platform."
                    },
                    "Gossip Stone by Fairy Fountain": {
                        Name: "Gossip Stone by Fairy Fountain",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 283, y: 232 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the land near the fairy fountain entrance."
                    },
                    
                    // Entrances
                    "Great Fairy Fountain Entrance": {
                        Name: "Great Fairy Fountain Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Zora's Fountain",
                        Region: "main",
                        MapInfo: { x: 266, y: 269 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "Go to the southeast corner of the map. Bomb the wall by the rocks to reveal this entrance.",
                        NeedsExplosives: true
                    }
                }
            }
		}
	},
	
	"Lake Hylia": {
		Abbreviation: "LAKE",
		MapGroup: MapGroups.WATER,
		Regions: {
			main: {
                Exits: {
                    "Hyrule Field": {
                        OwExit: OwExits["Lake Hylia"]["Hyrule Field"]
                    },

                    "Zora's Domain": {
                        OwExit: OwExits["Lake Hylia"]["Zora's Domain"]
                    },

                    "Owl": {
                        OwExit: OwExits["Lake Hylia"]["Owl"]
                    },

                    "Water Temple Entrance": {
                        OwExit: OwExits["Lake Hylia"]["Water Temple Entrance"]
                    },

                    "Serenade Teleport Pad": {
                        OwExit: OwExits["Lake Hylia"]["Serenade Teleport Pad"]
                    }
                },

                Entrances: {
                    "Hyrule Field": {},
                    "Zora's Domain": {},
                    "Owl": {},
                    "Serenade Teleport Pad": {},
                    "From Gerudo Valley": OwExits["Gerudo Valley"]["To Lake Hylia"]
                },

                ItemLocations: {
                    "Ruto's Letter": {
                        Name: "Ruto's Letter",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 170, y: 106 },
                        Age: Age.CHILD,
                        LongDescription: "You'll find this item in the water near the entrance to Zora's Domain. Navi will fly to it when you're close.",
                        CustomRequirement: function(age) {
                            if (Equipment.SCALE.playerHas) { return true; }
                            if (!Settings.RandomizerSettings.shuffleDungeonEntrances) { return false; }
                            
                            let defeatedMorpha = Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
                            return defeatedMorpha && Data.hasDamagingItem(age);
                        }
                    },
                    "Fishing Child": {
                        Name: "Fishing Child",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 247, y: 81 },
                        IsInterior: true,
                        Age: Age.CHILD,
                        LongDescription: "Pay 20 rupees and catch a big fish to get the item."
                    },
                    "Fishing Adult": {
                        Name: "Fishing Adult",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 252, y: 81 },
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "Either beat Morpha, ride the bean plant, or play Scarecrow's Song and use your hookshot to get up to the fishing platform. Pay 20 rupees and catch a big fish to get the item.",
                        CustomRequirement: function(age) {
                            let canHookshotUp = Data.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.playerHas;
                            let canRideUp = Data.itemLocationObtained("Lake Hylia", "main", "*Plant Bean by Lab");
                            return canHookshotUp || canRideUp || Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
                        },
                        OneWayInteriorSpawnEntrance: true
                    },
                    "Heart Piece on Lab": {
                        Name: "Heart Piece on Lab",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 111, y: 67 },
                        Age: Age.ADULT,
                        LongDescription: "The goal here is to get to the top of the Lakeside Lab. Either ride the bean plant up, or play Scarecrow's Song and hookshot it. Afterward, climb the ladder to get to the item. Watch out for the Guays!",
                        CustomRequirement: function(age) {
                            let canHookshotUp = Data.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.playerHas;
                            let canRideUp = Data.itemLocationObtained("Lake Hylia", "main", "*Plant Bean by Lab");
                            return canHookshotUp || canRideUp;
                        }
                    },
                    "Heart Piece in Lab": {
                        Name: "Heart Piece in Lab",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 111, y: 89 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "Enter lakeside lab and dive all the way to the bottom of the water. Talk to the professor to get this item. Alternatively, you can use iron boots to sink to the bottom. Next, hookshot the crate and pause just before your feet touch the ground again. If you unequip your iron boots at this point, you should hear a jingle and should be able to get the item.",
                        CustomRequirement: function(age) {
                            let hasGoldScale = Equipment.SCALE.currentUpgrade === 2;
                            if (age === Age.CHILD) { return hasGoldScale; }
                            
                            let canGetWithoutScale = Settings.GlitchesToAllow.labHPWithoutGoldenScale && Items.HOOKSHOT.playerHas && Equipment.IRON_BOOTS.playerHas;
                            return hasGoldScale || canGetWithoutScale;
                        }
                    },
                    "Fire Arrows": {
                        Name: "Fire Arrows",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 247, y: 236 },
                        Age: Age.ADULT,
                        LongDescription: "First, get to the platform in the center of the lake - the one with the tree. When the sun is just coming up, stand on the sign and shoot an arrow at it. The item should then spawn. You can get over there either by beating Morpha and swimming there, or by playing Scarecrow's Song and longshotting it.",
                        CustomRequirement: function(age) {
                            if (!Items.FAIRY_BOW.playerHas) { return false; }
                            let canHookshotUp = Data.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.currentUpgrade === 2;
                            return canHookshotUp || Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
                        }
                    },
                    "Skulltula in Soil": {
                        Name: "Skulltula in Soil",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 106, y: 71 },
                        Age: Age.CHILD,
                        LongDescription: "Plant bugs in the soil by the Lakeside Lab to spawn this skulltula.",
                        NeedsBottle: true
                    },
                    "Skulltula on Lab": {
                        Name: "Skulltula on Lab",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 104, y: 89 },
                        Age: Age.CHILD,
                        LongDescription: "At night, you can find this skulltula on the side of the Lakeside Lab that's nearest the bridge. You can actually jumpslash to the token from the bridge if you don't have the boomerang.",
                        CustomRequirement: function(age) {
                            return Items.BOOMERANG.playerHas || Data.hasSwordWeapon(age);
                        }
                    },
                    "Skulltula on Island": {
                        Name: "Skulltula on Island",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 252, y: 232 },
                        Age: Age.CHILD,
                        LongDescription: "At night, proceed to the far island in the lake. This is the one even passed the one with the tree. You should see the skulltula on one of the pillars.",
                        NeedsNighttime: true
                    },
                    "Skulltula in Lab Water": {
                        Name: "Skulltula in Lab Water",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 107, y: 99 },
                        IsInterior: true,
                        Age: Age.ADULT,
                        LongDescription: "Enter the Lakeside Lab. Equip your iron boots in the water to sink to the bottom. The skulltula is in a crate - roll into it. Use your hookshot to kill it and collect its item.",
                        RequiredItems: [Items.HOOKSHOT, Equipment.IRON_BOOTS]
                    },
                    "Skulltula on Middle Tree": {
                        Name: "Skulltula on Middle Tree",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 198, y: 213 },
                        Age: Age.ADULT,
                        LongDescription: "At night, longshot all the way up the tree on the middle island. You'll find the skulltula on top.",
                        RequiredItems: [{item: Items.HOOKSHOT, upgradeString: "2"}],
                        NeedsNighttime: true
                    },
                    "Left Scrub Under Gravestone": {
                        Name: "Left Scrub Under Gravestone",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 89, y: 181 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Pull the gravestone in the middle of the bridge and enter the grotto to find these scrubs."
                    },
                    "Middle Scrub Under Gravestone": {
                        Name: "Middle Scrub Under Gravestone",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 93, y: 181 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Pull the gravestone in the middle of the bridge and enter the grotto to find these scrubs."
                    },
                    "Right Scrub Under Gravestone": {
                        Name: "Right Scrub Under Gravestone",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 97, y: 181 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Pull the gravestone in the middle of the bridge and enter the grotto to find these scrubs."
                    },
                    "*Plant Bean by Lab": {
                        Name: "*Plant Bean by Lab",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 106, y: 71 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean patch by the lab. It can be used to get to the top of the house and to the fishing pond."
                    },
                    "Gossip Stone by Lab and Waterfall": {
                        Name: "Gossip Stone by Lab and Waterfall",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 74, y: 74 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This stone is across the little bridge near the lab."
                    },
                    "Southwest Gossip Stone": {
                        Name: "Southwest Gossip Stone",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 100, y: 237 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the wall in the southwest corner of the lake."
                    },
                    "Southeast Gossip Stone": {
                        Name: "Southeast Gossip Stone",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        MapInfo: { x: 289, y: 231 },
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the wall in the southeast corner of the lake."
                    },
                    
                    // Entrances
                    "Fishing Pond": {
                        Name: "Fishing Pond",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Lake Hylia",
                        Region: "main",
                        MapInfo: { x: 247, y: 81 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.EITHER,
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD) { return true; }
                            
                            let canHookshotUp = Data.canPlaySong(Songs.SCARECROWS_SONG) && Items.HOOKSHOT.playerHas;
                            let canRideUp = Data.itemLocationObtained("Lake Hylia", "main", "*Plant Bean by Lab");
                            return canHookshotUp || canRideUp || Data.itemLocationObtained("Water Temple", "bossRoom", "Blue Warp");
                        },
                        LongDescription: "This building is in the building across the water to the northeast."
                    },
                    "Grotto Under Grave": {
                        Name: "Grotto Under Grave",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 93, y: 181 },
                        IsGrotto: true,
                        Age: Age.EITHER,
                        LongDescription: "Pull the gravestone in the middle of the bridge to reveal this grotto."
                    },
                    "Lakeside Lab": {
                        Name: "Lakeside Lab",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Lake Hylia",
                        Region: "main",
                        MapInfo: { x: 118, y: 86 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "This is the building near the bridge by the lake."
                    }
                }
            }
		}
    },
    
	"Gerudo Valley": {
		Abbreviation: "GVAL",
		MapGroup: MapGroups.DESERT,
		Regions: {
            main: {
                Exits: {
                    acrossBridge: {
                        Name: "acrossBridge",
                        CustomRequirement: function(age) {
                            if (age === Age.ADULT) {
                                return Data.itemLocationObtained("Gerudo Fortress", "main", "Item From Gerudo") || 
                                    Data.canRideEpona(age) || 
                                    Items.HOOKSHOT.currentUpgrade === 2;
                            }
                            return Settings.GlitchesToAllow.cuccoJump && Data.hasSwordWeapon(age);
                        }
                    },

                    chasmCrateLedge: {
                        Name: "chasmCrateLedge",
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || Items.HOOKSHOT.currentUpgrade === 2;
                        }
                    },
                    
                    chasm: {
                        Name: "chasm"
                    },

                    "Hyrule Field": {
                        OwExit: OwExits["Gerudo Valley"]["Hyrule Field"]
                    }
                },

                Entrances: {
                    acrossBridge: {},
                    "Hyrule Field": {}
                },

                ItemLocations: {
                    "Skulltula by Tiny Waterfall": {
                        Name: "Skulltula by Tiny Waterfall",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 264, y: 56 },
                        Age: Age.CHILD,
                        LongDescription: "At night, look to the right of the first tiny bridge by the tiny waterfall. The skulltula is by the water source.",
                        IsAtShortDistance: true,
                        NeedsNighttime: true
                    },

                    // Entrances
                    "Grotto Under Silver Rock": {
                        Name: "Grotto Under Silver Rock",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 220, y: 182 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "From the side closest to Hyrule Field, look to your left. The grotto is under the silver rock. Lift it up with your silver gauntlets to reveal it.",
                        RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
                    }
                }
            },

            acrossBridge: {
                Exits: {
                    main: {
                        Name: "main",
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || 
                                Data.itemLocationObtained("Gerudo Fortress", "main", "Item From Gerudo") || 
                                Data.canRideEpona(age) || 
                                Items.HOOKSHOT.currentUpgrade === 2;
                        }
                    },

                    chasmCrateLedge: {
                        Name: "crateChasmLedge",
                        CustomRequirement: function(age) {
                            return Items.HOOKSHOT.currentUpgrade === 2 || Data.canMegaFlip(age);
                        }
                    },

                    chasm: {
                        name: "chasm"
                    },

                    "Gerudo Fortress": {
                        OwExit: OwExits["Gerudo Valley"]["Gerudo Fortress"]
                    }
                },

                Entrances: {
                    main: {},
                    "Gerudo Fortress": {}
                },

                ItemLocations: {
                    "Chest Behind Rocks": {
                        Name: "Chest Behind Rocks",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 131, y: 120 },
                        Age: Age.ADULT,
                        LongDescription: "Across the bridge, there are some rocks to the right. Use your hammer on them to reveal the chest.",
                        RequiredItems: [Items.MEGATON_HAMMER]
                    },
                    "Skulltula on Pillar": {
                        Name: "Skulltula on Pillar",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 144, y: 103 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula high up on the pillar near the rocks to the left side of the area across the bridge.",
                        IsAtShortDistance: true,
                        NeedsNighttime: true
                    },
                    "Skulltula Behind Tent": {
                        Name: "Skulltula Behind Tent",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 144, y: 46 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula on the wall behind the tent.",
                        IsAtShortDistance: true,
                        NeedsNighttime: true
                    },
                    "Front Scrub in SoS Grotto Behind Tent": {
                        Name: "Front Scrub in SoS Grotto Behind Tent",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 140, y: 56 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Play the Song of Storms behind the tent to spawn a grotto with these scrubs.",
                        RequiredSongs: [Songs.SONG_OF_STORMS],
                    },
                    "Back Scrub in SoS Grotto Behind Tent": {
                        Name: "Back Scrub in SoS Grotto Behind Tent",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 137, y: 56 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Play the Song of Storms behind the tent to spawn a grotto with these scrubs.",
                        RequiredSongs: [Songs.SONG_OF_STORMS],
                    },

                    // Entrances
                    "Song of Storms Grotto Behind Tent": {
                        Name: "Song of Storms Grotto Behind Tent",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 140, y: 56 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Play the Song of Storms behind the tent to spawn this grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS],
                    },
                    "Tent Entrance": {
                        Name: "Tent Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Gerudo Valley",
                        Region: "acrossBridge",
                        MapInfo: { x: 141, y: 78 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                                return false;
                            }

                            return !Settings.GlitchesToAllow.cuccoJump;
                        },
                        LongDescription: "This is the tent on the west side of the bridge as adult. Also, the loading zone is actually there as child."
                    }
                }
            },

            chasmCrateLedge: {
                ExcludeFromSpawnList: true,
                Exits: {
                    chasm: {
                        Name: "chasm"
                    }
                },

                Entrances: {
                    main: {},
                    acrossBridge: {}
                },

                ItemLocations: {
                    "Heart Piece in Crate": {
                        Name: "Heart Piece in Crate",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 172, y: 173 },
                        Age: Age.EITHER,
                        LongDescription: "The crate is on a ledge on the left side of the ravine. Grab a cucco and jump across to the crate. If you're fast, you can grab the cucco after you get the item and use it to get the waterfall item as well.<br /><br />As an adult, you can longshot to the crate from the ledge on the other side."
                    }
                }
            },

            chasm: {
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {
                        Name: "main",
                        CustomRequirement: function(age) {
                            return false;
                        }
                    },

                    accrossBridge: {
                        Name: "accrossBridge",
                        CustomRequirement: function(age) {
                            return false;
                        }
                    },

                    "To Lake Hylia": {
                        OwExit: OwExits["Gerudo Valley"]["To Lake Hylia"]
                    }
                },

                Entrances: {
                    main: {},
                    acrossBridge: {},
                    chasmCrateLedge: {}
                },

                ItemLocations: {
                    "Plant Bean by Cow on Bottom": {
                        Name: "Plant Bean by Cow on Bottom",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 183, y: 191 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean patch on the platform at the bottom of the ravine. It's not used to get any items."
                    },
                    "Heart Piece in Waterfall": {
                        Name: "Heart Piece in Waterfall",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 200, y: 111 },
                        Age: Age.EITHER,
                        LongDescription: "The Heart Piece is in a room in the waterfall to the left in the ravine. There's a ladder leading up to it."
                    },
                    "Cow on Bottom by Waterfall": {
                        Name: "Cow on Bottom by Waterfall",
                        ItemGroup: ItemGroups.COW,
                        MapInfo: { x: 183, y: 185 },
                        Age: Age.CHILD,
                        LongDescription: "Navigate to the platform on the bottom of the ravine to find this cow."
                    },
                    "Skulltula in Soil": {
                        Name: "Skulltula in Soil",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 183, y: 191 },
                        Age: Age.CHILD,
                        LongDescription: "Navigate to the platform on the bottom of the ravine. Plant bugs in the soft soil to spawn the skulltula.",
                        NeedsBottle: true
                    },
                    "Gossip Stone by Waterfall": {
                        Name: "Gossip Stone by Waterfall",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 185, y: 146 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is in the chasm near the waterfall. It's on the same platform as the cow and soft soil patch."
                    }
                }
            }
        }
    },

	"Gerudo Fortress": {
		Abbreviation: "FORT",
		MapGroup: MapGroups.DESERT,
		Regions: {
            main: {
                Exits: {
                    backArea: {
                        Name: "backArea",
                        CustomRequirement: function(age) {
                            return age === Age.CHILD || Data.areGerudoGuardsTame() 
                        }
                    },

                    wastelandEntrance: {
                        Name: "wastelandEntrance",
                        CustomRequirement: function(age) {
                            if (age === Age.CHILD || Data.areGerudoGuardsTame()) { return true; }
                            return Settings.GlitchesToAllow.gerudoGateSkipAsAdult &&
                                Items.HOOKSHOT.playerHas &&
                                Equipment.HOVER_BOOTS.playerHas;
                        }
                    },

                    "Gerudo Valley": {
                        OwExit: OwExits["Gerudo Fortress"]["Gerudo Valley"]
                    },

                    "Training Grounds Entrance": {
                        OwExit: OwExits["Gerudo Fortress"]["Training Grounds Entrance"]
                    }
                },

                Entrances: {
                    backArea: {},
                    wastelandEntrance: {},
                    "Gerudo Valley": {}
                },

                ItemLocations: {
                    "Chest on the Top": {
                        Name: "Chest on the Top",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 176, y: 101 },
                        Age: Age.ADULT,
                        LongDescription: "Start from jail 3. Face the jail - now turn left and take that exit. Enter the other door to your right. Now either hookshot the wooden horizontal beam, use your hover boots to get across, or take out the guards with your bow to get across to the path directly in front of you. Face the camera to your back and turn left. Climb up the wall and walk to the end. Jump across to the next platform. Climb up the vines to your left.<br /><br />You should be able to either longshot to the chest, or roll across with your hover boots.",
                        CustomRequirement: function(age) {
                            if (Items.HOOKSHOT.currentUpgrade === 2 || Equipment.HOVER_BOOTS.playerHas) { return true; }
                            return Data.canHookScarecrow(age) || Data.canMegaFlip(age);
                        }
                    },
                    "Jail 1 Guard Key": {
                        Name: "Jail 1 Guard Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 132, y: 126 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                                return false;
                            }
                            return !Settings.GlitchesToAllow.cuccoJump;
                        },
                        NeedsSwordWeapon: true,
                        LongDescription: "Enter the leftmost bottom exit to get to the first jail. Take out the guard to get the item."
                    },
                    "Jail 2 Guard Key": {
                        Name: "Jail 2 Guard Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 133, y: 179 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                                return false;
                            }
                            return !Settings.GlitchesToAllow.cuccoJump;
                        },
                        NeedsSwordWeapon: true,
                        LongDescription: "Start from jail 1. Face the jail - now turn right and take that exit. Go straight to the other side. The next jail is in the next hole if you hug this wall around the right corner - be careful of guards. Take out the guard to get the item."
                    },
                    "Jail 3 Guard Key": {
                        Name: "Jail 3 Guard Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 163, y: 168 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                                return false;
                            }
                            return !Settings.GlitchesToAllow.cuccoJump;
                        },
                        NeedsSwordWeapon: true,
                        LongDescription: "Start from jail 2. Face the jail - now turn left and take that exit. Climb the vines straight ahead and take the exit straight in front of you for the next jail. Take out the guard to get the item."
                    },
                    "Jail 4 Guard Key": {
                        Name: "Jail 4 Guard Key",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 174, y: 133 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { 
                            if (Settings.RandomizerSettings.shuffleOverworldEntrances) {
                                return false;
                            }
                            return !Settings.GlitchesToAllow.cuccoJump;
                        },
                        NeedsSwordWeapon: true,
                        LongDescription: "Start from jail 3. Face the jail - now turn left and take that exit. Face the entrnace you just left. As Child, you must enter the door to your left and navigate across to the other side of the room. As Adult, you can jump up to the ledge to your right with a slight angled jump. Climb up the vines and navigate to the door near where the skulltula on the wall would be at night.<br/><br/>Once inside, wait for a bit first for the guard and knock her out or sprint past her before following the path to your right. Eventually you'll reach the jail. Take out the guard to get the item.",
                        CustomRequirement: function(age) {
                            return age === Age.ADULT || Data.areGerudoGuardsTame() || Data.canMegaFlip(age);
                        }
                    },
                    "Item From Gerudo": {
                        Name: "Item From Gerudo",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 159, y: 51 },
                        Age: Age.EITHER,
                        LongDescription: "You'll get this from the Gerudo after using all 4 keys on all the jail doors and talking to the prisoners.",
                        CustomRequirement: function(age) {
                            if (getKeyCount("Gerudo Fortress") < 4) { return false; }
                            return age === Age.ADULT || Data.areGerudoGuardsTame();
                        }
                    },
                    "Skulltula on Back Fortress Wall": {
                        Name: "Skulltula on Back Fortress Wall",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 203, y: 129 },
                        Age: Age.ADULT,
                        LongDescription: "Nighttime required. The skulltula is located on the wall near the entrance to jail 4 - see those instructions for how to get there.<br/><br/>If you don't have a long range way to kill it, you'll need to jumpslash it from the top and then circle back around and jump to claim the item.",
                        NeedsNighttime: true
                    },
                    "Opened Gate": {
                        Name: "Opened Gate",
                        ItemGroup: ItemGroups.NON_ITEM,
                        MapInfo: { x: 81, y: 98 },
                        Age: Age.ADULT,
                        Region: "main",
                        LongDescription: "Talk to the gerudo guard at the top of the ladder to open the gate.",
                        CustomRequirement: function() {
                            return Data.areGerudoGuardsTame();
                        }
                    },
                    
                    // Entrances
                    "Song of Storms Grotto": {
                        Name: "Song of Storms Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 137, y: 172 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Play the song of storms in the center of the crates near the fortress to reveal this grotto.",
                        RequiredSongs: [Songs.SONG_OF_STORMS]
                    }
                }
            },

            backArea: {
                ExcludeFromSpawnList: true,
                Exits: {
                    main: {
                        Name: "main"
                    }
                },

                Entrances: {
                    main: {}
                },

                ItemLocations: {
                    "Archery Minigame 1000 Points": {
                        Name: "Archery Minigame 1000 Points",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 246, y: 220 },
                        Age: Age.ADULT,
                        LongDescription: "Ride Epona to the back section of the map during the day. Talk to the Gerudo there to play the archery minigame. Score 1000 points to claim your prize.",
                        RequiredItems: [Items.FAIRY_BOW],
                        CustomRequirement: function(age) { 
                            return Data.canRideEpona(age);
                        }
                    },
                    "Archery Minigame 1500 Points": {
                        Name: "Archery Minigame 1500 Points",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 246, y: 225 },
                        Age: Age.ADULT,
                        LongDescription: "Ride Epona to the back section of the map during the day. Talk to the Gerudo there to play the archery minigame. Score 1500 points to claim your prize.",
                        RequiredItems: [Items.FAIRY_BOW],
                        CustomRequirement: function(age) { 
                            return Data.canRideEpona(age); 
                        }
                    },
                    "Skulltula on Target": {
                        Name: "Skulltula on Target",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 244, y: 40 },
                        Age: Age.ADULT,
                        LongDescription: "At night, navigate to the back part of the map. Head to the target on the left side to find this skulltula.",
                        IsAtShortDistance: true
                    }
                }
            },

            wastelandEntrance: {
                Exits: {
                    main: {
                        Name: "main",
                        CustomRequirement(age) {
                            return age === Age.ADULT || Data.itemLocationObtained("Gerudo Fortress", "main", "Opened Gate");
                        }
                    },

                    "Haunted Wasteland": {
                        OwExit: OwExits["Gerudo Fortress"]["Haunted Wasteland"]
                    }
                },

                Entrances: {
                    main: {},
                    "Haunted Wasteland": {}
                },

                ItemLocations: {}
            }
		}
    },
    
	"Haunted Wasteland": {
		Abbreviation: "HW",
		MapGroup: MapGroups.DESERT,
		Regions: {
            entrance: {
                Exits: {
                    outpost: {
                        Name: "outpost",
                        CustomRequirement: function(age) {
                            if (Settings.GlitchesToAllow.itemlessSandPit) { return true; }
                            return age === Age.ADULT && (Equipment.HOVER_BOOTS.playerHas || Items.HOOKSHOT.currentUpgrade === 2);
                        }
                    },

                    "Gerudo Fortress": {
                        OwExit: OwExits["Haunted Wasteland"]["Gerudo Fortress"]
                    }
                },

                Entrances: {
                    outpost: {},
                    "Gerudo Fortress": {}
                },

                ItemLocations: {}
            },

            outpost: {
                ExcludeFromSpawnList: true,
                Exits: {
                    entrance: {
                        Name: "entrance",
                        Age: Age.ADULT,
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.backwardsWasteland && Equipment.HOVER_BOOTS.playerHas;
                        }
                    },

                    exit: {
                        Name : "exit",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.wastelandNoLens ||
                                (Equipment.MAGIC.playerHas && Items.LENS_OF_TRUTH.playerHas);
                        }
                    }
                },

                Entrances: {
                    entrance: {},
                    exit: {}
                },

                ItemLocations: {
                    "Chest at Outpost": {
                        Name: "Chest at Outpost",
                        ItemGroup: ItemGroups.CHEST,
                        MapInfo: { x: 208, y: 93 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.backwardsWasteland && !Settings.GlitchesToAllow.childHauntedWasteland; },
                        LongDescription: "In the outpost in the center of the desert, light the two torches to spawn a chest.",
                        NeedsFire: true
                    },
                    "Carpet Shop": {
                        Name: "Carpet Shop",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 239, y: 292 },
                        Age: Age.EITHER,
                        LongDescription: "After you cross the sand pit, the shop is along the path to your left. There is a sign by one of the flags that points to it. If you don't have hover boots, you can rolljump, then jumpslash to the corner of the carpet.<br/><br/>If this and medigoron aren't shuffled, this shop will ALWAYS sell bombchus.",
                        NeedsSwordWeapon: true,
                        RequiredItems: [{item: Equipment.WALLET, upgradeString: "1"}]
                    },
                    "Skulltula at Outpost": {
                        Name: "Skulltula at Outpost",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 208, y: 85 },
                        Age: Age.EITHER,
                        UseAdultAge: function() { return !Settings.GlitchesToAllow.backwardsWasteland && !Settings.GlitchesToAllow.childHauntedWasteland; },
                        LongDescription: "The skulltula is in the outpost in the center of the desert.",
                        IsAtShortDistance: true
                    }
                }
            },

            exit: {
                Exits: {
                    outpost: {
                        Name: "outpost",
                        CustomRequirement: function(age) {
                            return Settings.GlitchesToAllow.backwardsWasteland;
                        }
                    },

                    "Desert Colossus": {
                        OwExit: OwExits["Haunted Wasteland"]["Desert Colossus"]
                    }
                },

                Entrances: {
                    outpost: {},
                    "Desert Colossus": {}
                },

                ItemLocations: {}
            }
		}
	},
    	
	"Desert Colossus": {
		Abbreviation: "DCOL",
		MapGroup: MapGroups.DESERT,
		Regions: {
            main: {
                Exits: {
                    "Haunted Wasteland": {
                        OwExit: OwExits["Desert Colossus"]["Haunted Wasteland"]
                    },

                    "Spirit Temple Entrance": {
                        OwExit: OwExits["Desert Colossus"]["Spirit Temple Entrance"]
                    },

                    "Spirit Temple Hands": {
                        OwExit: OwExits["Desert Colossus"]["Spirit Temple Hands"]
                    },

                    "Requiem Teleport Pad": {
                        OwExit: OwExits["Desert Colossus"]["Requiem Teleport Pad"]
                    }
                },

                Entrances: {
                    "Haunted Wasteland": {},
                    "Spirit Temple Hands": {},
                    "Requiem Teleport Pad": {}
                },

                ItemLocations: {
                    "Great Fairy Fountain": {
                        Name: "Great Fairy Fountain",
                        ItemGroup: ItemGroups.GIFT,
                        MapInfo: { x: 231, y: 51 },
                        IsInterior: true,
                        Age: Age.EITHER,
                        LongDescription: "There's a crack in the wall in the north middle of the map. Bomb or hammer it to get inside. Play Zelda's Lullaby to get an item.",
                        NeedsExplosives: true,
                        RequiredSongs: [Songs.ZELDAS_LULLABY],
                        OneWayInteriorSpawnEntrance: true,
                        PostSpawnRequirements: function(age) {
                            return Data.canPlaySong(Songs.ZELDAS_LULLABY);
                        }
                    },
                    "Heart Piece on Platform": {
                        Name: "Heart Piece on Platform",
                        ItemGroup: ItemGroups.FREESTANDING,
                        MapInfo: { x: 87, y: 135 },
                        Age: Age.ADULT,
                        LongDescription: "Plant a magic bean in the soil by the Spirit Temple. Come back as an adult and ride it to the heart piece on the giant arch.",
                        CustomRequirement: function(age) {
                            return Data.itemLocationObtained("Desert Colossus", "main", "*Plant Bean by Spirit Temple");
                        }
                    },
                    "Skulltula in Soil": {
                        Name: "Skulltula in Soil",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 63, y: 165 },
                        Age: Age.CHILD,
                        LongDescription: "Drop bugs in the soft soil by the Spirit Temple to spawn this skulltula.",
                        NeedsBottle: true
                    },
                    "Skulltula on Tree by Oasis": {
                        Name: "Skulltula on Tree by Oasis",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 180, y: 245 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there's a skulltula in one of the trees by an oasis at the south middle part of the map.",
                        IsAtShortDistance: true,
                        NeedsNighttime: true
                    },
                    "Skulltula on Cliff": {
                        Name: "Skulltula on Cliff",
                        ItemGroup: ItemGroups.SKULLTULA,
                        MapInfo: { x: 213, y: 91 },
                        Age: Age.ADULT,
                        LongDescription: "At night, there is a skulltula on a small cliff near the north middle edge of the map. You can hookshot it if the Levers leave you alone long enough. An easier solution is to ride the bean platform and jump off of it so that you're on top.",
                        NeedsNighttime: true,
                        CustomRequirement: function(age) {
                            let canRideUp = Data.itemLocationObtained("Desert Colossus", "main", "*Plant Bean by Spirit Temple");
                            return canRideUp || Items.HOOKSHOT.playerHas;
                        }
                    },
                    "Front Scrub in Silver Rock Grotto": {
                        Name: "Front Scrub in Silver Rock Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 117, y: 81 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Lift the silver rock by the warp song location to reveal the grotto with these scrubs.",
                        RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
                    },
                    "Back Scrub in Silver Rock Grotto": {
                        Name: "Back Scrub in Silver Rock Grotto",
                        ItemGroup: ItemGroups.SCRUB,
                        MapInfo: { x: 121, y: 81 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Lift the silver rock by the warp song location to reveal the grotto with these scrubs.",
                        RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
                    },
                    "Requiem of Spirit": {
                        Name: "Requiem of Spirit",
                        ItemGroup: ItemGroups.SONG,
                        MapInfo: { x: 63, y: 149 },
                        Age: Age.EITHER,
                        LongDescription: "Enter and exit the Spirit Temple to receive this item."
                    },
                    "*Plant Bean by Spirit Temple": {
                        Name: "*Plant Bean by Spirit Temple",
                        ItemGroup: ItemGroups.NON_ITEM,
                        IsBean: true,
                        MapInfo: { x: 63, y: 165 },
                        Age: Age.CHILD,
                        LongDescription: "This is the bean spot by the Spirit Temple. This is used to more easily get to a skulltula, and to get the heart piece above."
                    },
                    "Gossip Stone by Spirit Temple": {
                        Name: "Gossip Stone by Spirit Temple",
                        ItemGroup: ItemGroups.GOSSIP_STONE,
                        UseChildAge: function() { return Settings.RandomizerSettings.gossipStoneSetting === GossipStoneSettings.MASK_OF_TRUTH; },
                        MapInfo: { x: 54, y: 194 },
                        Age: Age.EITHER,
                        LongDescription: "This stone is on the left side of the Spirit Temple."
                    },
                    
                    // Entrances
                    "Great Fairy Fountain Entrance": {
                        Name: "Great Fairy Fountain Entrance",
                        ItemGroup: ItemGroups.ENTRANCE,
                        Map: "Desert Colossus",
                        Region: "main",
                        MapInfo: { x: 231, y: 51 },
                        IsInterior: true,
                        OneWayInteriorSpawnEntrance: true,
                        Age: Age.EITHER,
                        LongDescription: "There's a crack in the wall in the north middle of the map. Bomb it to get inside.",
                        NeedsExplosives: true
                    },
                    "Silver Rock Grotto": {
                        Name: "Silver Rock Grotto",
                        ItemGroup: ItemGroups.ENTRANCE,
                        MapInfo: { x: 117, y: 81 },
                        IsGrotto: true,
                        Age: Age.ADULT,
                        LongDescription: "Lift the silver rock by the warp song location to reveal this grotto.",
                        RequiredItems: [{item: Equipment.STRENGTH, upgradeString: "2"}]
                    }
                }
            }
		}
	}
};
