/**
 * A list of all the game's items
 */
let Items = {
	DEKU_STICK: { name: "Deku Stick" },
	DEKU_NUT: { name: "Deku Nut" },
	BOMB: { name: "Bomb"},
	FAIRY_BOW: { name: "Fairy Bow" },
	FIRE_ARROW: { name: "Fire Arrow" },
	DINS_FIRE: { name: "Din's Fire" },
	
	FAIRY_SLINGSHOT: { name: "Fairy Slingshot" },
	OCARINA: { name: "Ocarina" },
	BOMBCHU: { name: "Bombchu" },
	HOOKSHOT: { 
		name: "Hookshot", 
		upgrades: [ "No Hookshot", "Hookshot", "Longshot" ],
		useUpgradeAsDisplay: true
	},
	ICE_ARROW: { name: "Ice Arrow" },
	FARORES_WIND: { name: "Farore's Wind" },
	
	BOOMERANG: { name: "Boomerang" },
	LENS_OF_TRUTH: { name: "Lens of Truth" },
	MAGIC_BEAN: { name: "Magic Bean" },
	MEGATON_HAMMER: { name: "Megaton Hammer" },
	LIGHT_ARROW: { name: "Light Arrow" },
	NAYRUS_LOVE: { name: "Nayru's Love" },
	
	EMPTY_BOTTLES: { 
		name: "Empty Bottles", 
		playerHas: true, 
		count: 0,
		tooltip: "Increment for every bottle in the inventory, no matter what's in it."
	},

	// There are okay to select if you can only receive them
	BUGS: { name: "Bugs", cssClass: "filled-bottle", tooltip: "Enable if you CAN get this, or you already have one." },
	FISH: { name: "Fish", cssClass: "filled-bottle", tooltip: "Enable if you CAN get this, or you already have one." },
	BLUE_FIRE: { name: "Blue Fire", cssClass: "filled-bottle", tooltip: "Enable if you CAN get this, or you already have one." },

	// Only select these if you have them in your inventory currently
	// DESELECT IF YOU DO NOT HAVE THEM!
	BIG_POE: { name: "Big Poe", cssClass: "filled-bottle", tooltip: "Enable ONLY if you currently have one - disable when it's turned in!" },
	RUTOS_LETTER: { name: "Ruto's Letter", cssClass: "filled-bottle", tooltip: "Enable ONLY if you currently have this - disable when it's used!"}
};

/**
 * A list of the child trade items
 */
let ChildTradeItems = {
	WEIRD_EGG: { 
		name: "Weird Egg", 
		upgrades: [ "Nothing", "Weird Egg", "Chicken" ],
		useUpgradeAsDisplay: true
	},
	ZELDAS_LETTER: { name: "Zelda's Letter" },
	KEATON_MASK: { name: "Keaton Mask" },
	SKULL_MASK: { name: "Skull Mask" },
	SPOOKY_MASK: { name: "Spooky Mask" },
	BUNNY_HOOD: { name: "Bunny Hood" },
	MASK_OF_TRUTH: { name: "Mask of Truth" },
	COSMETIC_MASKS: { name: "Cosmetic Masks", cssClass: "cosmetic-masks" }
};

/**
 * A list of the adult trade items
 */
let AdultTradeItems = {
	POCKET_EGG: { 
		name: "Pocket Egg", 
		upgrades: [ "Nothing", "Pocket Egg", "Pocket Cucco" ],
		useUpgradeAsDisplay: true
	},
	COJIRO: { name: "Cojiro"},
	ODD_MUSHROOM: { name: "Odd Mushroom"},
	ODD_POTION: { name: "Odd Potion"},
	POACHERS_SAW: { name: "Poacher's Saw" }, 
	BROKEN_GORONS_SWORD: { name: "Broken Goron's Sword"},
	PRESCRIPTION: { name: "Prescription"},
	EYEBALL_FROG: { name: "Eyeball Frog"},
	EYEDROPS: { name: "Eyedrops"},
	CLAIM_CHECK: { name: "Claim Check"},
};

/**
 * All songs
 * Note that the "songNotes" value gets added when these are modified
 */
let Songs = {
	ZELDAS_LULLABY: { name: "Zelda's Lullaby", defaultNotes: "<^><^>", divGroup: 1 },
	EPONAS_SONG: { name: "Epona's Song", defaultNotes: "^<>^<>", divGroup: 1 },
	SARIAS_SONG: { name: "Saria's Song", defaultNotes: "v><v><", divGroup: 1 },
	SUNS_SONG: { name: "Sun's Song", defaultNotes: ">v^>v^", divGroup: 1 },
	SONG_OF_TIME: { name: "Song of Time", defaultNotes: ">Av>Av", divGroup: 1 },
	SONG_OF_STORMS: { name: "Song of Storms", defaultNotes: "Av^Av^", divGroup: 1 },
	SCARECROWS_SONG: {name: "Scarecrow's Song", defaultNotes: "", divGroup: 3 },
	
	MINUET_OF_FOREST: { name: "Minuet of Forest", defaultNotes: "A^<><>", divGroup: 2 },
	BOLERO_OF_FIRE: { name: "Bolero of Fire", defaultNotes: "vAvA>v>v", divGroup: 2 },
	SERENADE_OF_WATER: { name: "Serenade of Water", defaultNotes: "Av>><", divGroup: 2 },
	REQUIEM_OF_SPIRIT: { name: "Requiem of Spirit", defaultNotes: "AvA<>v", divGroup: 2 },
	NOCTURNE_OF_SHADOW: { name: "Nocturne of Shadow", defaultNotes: "<>>A<>v", divGroup: 2 },
	PRELUDE_OF_LIGHT: { name: "Prelude of Light", defaultNotes: "^>^><^", divGroup: 2 }
};

/**
 * A list of the ocarina buttons, used when the setting is on that shuffles them
 */
let OcarinaButtons = {
	C_UP_BUTTON: { name: "C Up Button" },
	C_LEFT_BUTTON: { name: "C Left Button" },
	C_RIGHT_BUTTON: { name: "C Right Button" },
	C_DOWN_BUTTON: { name: "C Down Button" },
	A_BUTTON: { name: "A Button" }
};

/**
 * A list of all the player's equipment (swords, tunics, boots, wallet, scale)
 */
let Equipment = {
	MASTER_SWORD: { name: "Master Sword", playerHas: true, hide: true },
	KOKIRI_SWORD: { name: "Kokiri Sword" },
	BIGGORONS_SWORD: { name: "Biggoron's Sword" },
	DEKU_SHIELD: { name: "Deku Shield" },
	STRENGTH: { 
		name: "Strength", 
		upgrades: [ "No Upgrade", "Goron's Bracelet", "Silver Gauntlets", "Golden Gauntlets" ],
		useUpgradeAsDisplay: true
	},
	
	GORON_TUNIC: { name: "Goron Tunic" },
	ZORA_TUNIC: { name: "Zora Tunic" },
	HYLIAN_SHIELD: { name: "Hylian Shield" },
	SCALE: {
		name: "Scale",
		upgrades: ["No Scale", "Silver Scale", "Golden Scale"],
		useUpgradeAsDisplay: true
	},
	
	IRON_BOOTS: { name: "Iron Boots" },
	HOVER_BOOTS: { name: "Hover Boots" },
	MIRROR_SHIELD: { name: "Mirror Shield" },
	WALLET: { 
		name: "Wallet",
		upgrades: ["Normal Wallet", "Adult's Wallet", "Giant's Wallet or Better" ],
		useUpgradeAsDisplay: true
	},
	
	GERUDO_MEMBERSHIP_CARD: { name: "Gerudo Membership Card" },
	MAGIC: { name: "Magic" },
	TRIFORCE_SHARDS: { name: "Triforce Shards", playerHas: true, count: 0 },
	SKULLTULA_TOKENS: { name: "Skulltula Tokens", icon: "Skulltula", playerHas: true, count: 0 },

	STONE_OF_AGONY: { name: "Stone of Agony" },
};

/**
 * A list of upgraded items for ease of use
 * These can be used in any of the canUse functions
 */
let UpgradedItems = {
	LONGSHOT: {
		item: Items.HOOKSHOT,
		upgrade: 2
	},
	SILVER_SCALE: {
		item: Equipment.SCALE,
		upgrade: 1
	},
	GOLDEN_SCALE: {
		item: Equipment.SCALE,
		upgrade: 2
	},
	SILVER_GAUNTLETS: {
		item: Equipment.STRENGTH,
		upgrade: 2
	},
	GOLDEN_GAUNTLETS: {
		item: Equipment.STRENGTH,
		upgrade: 3
	},
	ADULTS_WALLET: {
		item: Equipment.WALLET,
		upgrade: 1
	},
	GIANTS_WALLET: {
		item: Equipment.WALLET,
		upgrade: 2
	}
};

/**
 * All medallions and spiritual stones
 */
let Medallions = {
	FOREST_MEDALLION: { name: "Forest Medallion" },
	FIRE_MEDALLION: { name: "Fire Medallion" },
	WATER_MEDALLION: { name: "Water Medallion" },
	SHADOW_MEDALLION: { name: "Shadow Medallion" },
	SPIRIT_MEDALLION: { name: "Spirit Medallion" },
	LIGHT_MEDALLION: { name: "Light Medallion" },
	
	KOKIRIS_EMERALD: { name: "Kokiri's Emerald" },
	GORONS_RUBY: { name: "Goron's Ruby" },
	ZORAS_SAPPHIRE: { name: "Zora's Sapphire" }
};

/**
 * All keys
 * The number of keys the player has will be set to keyCount
 * If the player has the boss key, playerHas will be set to true
 */
let Keys = {
	FOREST_TEMPLE: { 
		name: "Forest Temple", 
		minimumKeys: function() {
			let minKeys = 5;

			// Skips the lobby door to the block room
			if (Tricks.forestMegaJumpToLedge.enabled) {
				minKeys--;
			}

			// Skips the two locked doors leading to the carousel room
			// - Includes the green poe early trick, using bombs and hover boots and...
			// - The megaflip from the well switch ledge
			// If pots are shuffled, then you still need use use these keys
			if ((Tricks.forestGreenPoeEarly.enabled || Tricks.megaFlip.enabled) &&
					(Settings.RandomizerSettings.potSetting === ShuffleLocationSettings.OFF ||
					(Settings.RandomizerSettings.potSetting === ShuffleLocationSettings.OW_ONLY))
			) {
				minKeys -= 2;
			}

			return minKeys;
		}, 
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return 6; },
		mqTotalKeys: function() { return 6; }
	}, 
	FIRE_TEMPLE: { 
		name: "Fire Temple", 
		minimumKeys: function() {
			let minKeys = 8;
			if (Settings.RandomizerSettings.smallKeySetting !== SmallKeySettings.SMALL_KEY_SANITY) { minKeys--; }
			if (Tricks.fireEscapeMapEnclosure.enabled) { minKeys--; }
			if (Tricks.fireBlockClip.enabled) { minKeys--;}
			if (Tricks.fireWallSkip.enabled) { minKeys--; }
			return minKeys;
		}, 
		totalKeys: function() {
			return Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.SMALL_KEY_SANITY ? 8 : 7;
		},
		
		mqMinimumKeys: function() { return 5; },
		mqTotalKeys: function() { return 5; }
	},
	WATER_TEMPLE: { 
		name: "Water Temple", 
		minimumKeys: function() { return 4; }, // The mid water door is optional
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return 1; }, // One key is actually optional
		mqTotalKeys: function() { return 2; }
	},
	SHADOW_TEMPLE: { 
		name: "Shadow Temple",
		minimumKeys: function() { 
			let min = SettingSets.SHADOW_GATE_CLIP() ? 4 : 5;
			if (Tricks.shadowClipToBossAntechamber.enabled) {
				min--;
			}
			return min;
		},
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return SettingSets.SHADOW_GATE_CLIP() ? 5 : 6; },
		mqTotalKeys: function() { return 6; }
	},
	SPIRIT_TEMPLE: { 
		name: "Spirit Temple", 
		minimumKeys: function() { 
			// There's a child door that's optional, so 4 is the default
			return Tricks.spiritSuperslideToMirrorShield.enabled ? 3 : 4;
		},
		totalKeys: function() { return 5; },
		
		mqMinimumKeys: function() { return 6; }, // You can always longshot across to skip the silver gaunts key door
		mqTotalKeys: function() { return 7; }
	},
	GANONS_CASTLE: { 
		name: "Ganon's Castle",
		totalKeys: function() { return 2; },
		
		mqMinimumKeys: function() { return 3; },
		mqTotalKeys: function() { return 3; }
	},
	
	BOTTOM_OF_THE_WELL: { 
		name: "Bottom of the Well", 
		totalKeys: function() { return 3; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() { return 2; },
		mqTotalKeys: function() { return 2; }
	},
	THIEVES_HIDEOUT: { 
		name: "Thieves' Hideout", 
		_getTotalKeys: function() {
			switch(Settings.RandomizerSettings.openGerudosFortress) {
				case OpenGerudosFortressSettings.VANILLA:
					return 4;
				case OpenGerudosFortressSettings.ONE_CARPENTER:
					return 1;
				default: // OpenGerudoFortressSettings.OPEN
					return 0;
			}
		},
		totalKeys: function() { return this._getTotalKeys(); }, 
		noBossKey: true,
		
		mqMinimumKeys: function() { return this._getTotalKeys(); }, 
		mqTotalKeys: function() { return this._getTotalKeys(); }, 
	},
	GERUDO_TRAINING_GROUNDS: { 
		name: "Training Grounds", 
		minimumKeys: function() { 
			let canChildAccess = Settings.RandomizerSettings.shuffleDungeonEntrances || Tricks.gfUnloadLowerAreaWithAntigrav.enabled;
			let canChildSkipKeys = Tricks.gtgChildVineClips.enabled && canChildAccess;
			let canSkipKeys = canChildSkipKeys || Tricks.weirdShot.enabled;
			return canSkipKeys ? 0 : 7;
		}, 
		totalKeys: function() { return 9; }, 
		noBossKey: true,
		
		mqMinimumKeys: function() {
			let canChildAccess = Settings.RandomizerSettings.shuffleDungeonEntrances || Tricks.gfUnloadLowerAreaWithAntigrav.enabled;
			let canChildSkipKeys = Tricks.gtgChildVineClips.enabled && canChildAccess;
			let canSkipKeys = canChildSkipKeys || Tricks.weirdShot.enabled;
			return canSkipKeys ? 0 : 3;
		},
		mqTotalKeys: function() { return 3; }
	},
	TREASURE_CHEST_MINIGAME: {
		name: "Treasure Chest Minigame",
		totalKeys: function() { return 6; },
		mqMinimumKeys: function() { return 6; },
		mqTotalKeys: function() { return 6; },
		noBossKey: true
	}
};

/**
 * Contains data in the following format (different data for MQ and standard):
 * - #: { { name: "Rupee Set Name", total: #, color: "colorName"}, ... }
 * 
 * On the object, will contain a property as follows (this way, we can have uneven
 * sets to rupee counts and still have this work):
 * - collectedRupees: { "Rupee Set Index": # }
 */
let SilverRupees = {
	ICE_CAVERN: {
		name: "Ice Cavern",
		standardRupeeData: {
			0: {
				name: "Ice Scythe Room",
				total: 5,
				color: "cyan"
			},
			1: {
				name: "Ice Block Push Room",
				total: 5,
				color: "blue"
			}
		},
		mqRupeeData: {}
	},
	SHADOW_TEMPLE: {
		name: "Shadow Temple",
		standardRupeeData: {
			0: {
				name: "Shadow Scythe Room",
				total: 5,
				color: "green"
			},
			1: {
				name: "Shadow Pit Room",
				total: 5,
				max: 10,
				color: "yellow"
			},
			2: {
				name: "Shadow Invisible Spikes Room",
				total: 5,
				color: "pink"
			}
		},
		mqRupeeData: {
			0: {
				name: "Shadow Scythe Room",
				total: 5,
				color: "green"
			},
			1: {
				name: "Shadow Invisible Scythe Room",
				total: 10,
				color: "cyan"
			},
			2: {
				name: "Shadow Pit Room",
				total: 5,
				color: "yellow"
			},
			3: {
				name: "Shadow Invisible Spikes Room",
				total: 10,
				color: "pink"
			}
		}
	},
	SPIRIT_TEMPLE: {
		name: "Spirit Temple",
		standardRupeeData: {
			0: {
				name: "Spirit Child Side",
				total: 5,
				color: "red"
			},
			1: {
				name: "Spirit Sun Block Room",
				total: 5,
				color: "yellow"
			},
			2: {
				name: "Spirit Adult Boulder Room",
				total: 5,
				color: "green"
			}
		},
		mqRupeeData: {
			0: {
				name: "Spirit Lobby",
				total: 5,
				color: "cyan"
			},
			1: {
				name: "Spirit Moving Wall Room",
				total: 5,
				color: "blue"
			}
		}
	},
	GANONS_CASTLE: {
		name: "Ganon's Castle",
		standardRupeeData: {
			0: {
				name: "Ganon Spirit Trial",
				total: 5,
				color: "yellow"
			},
			1: {
				name: "Ganon Light Trial",
				total: 5,
				color: "cyan"
			},
			2: {
				name: "Ganon Fire Trial",
				total: 5,
				color: "red"
			},
			3: {
				name: "Ganon Forest Trial",
				total: 5,
				color: "green"
			}
		},
		mqRupeeData: {
			0: {
				name: "Ganon Fire Trial",
				total: 5,
				color: "red"
			},
			1: {
				name: "Ganon Shadow Trial",
				total: 5,
				color: "pink"
			},
			2: {
				name: "Ganon Water Trial",
				total: 5,
				color: "blue"
			}
		}
	},
	BOTTOM_OF_THE_WELL: {
		name: "Bottom of the Well",
		standardRupeeData: {
			0: {
				name: "Well Basement",
				total: 5,
				color: "white"
			}
		},
		mqRupeeData: {}
	},
	DODONGOS_CAVERN: {
		name: "Dodongo's Cavern",
		standardRupeeData: {},
		mqRupeeData: {
			0: {
				name: "Dondongo Staircase",
				total: 5,
				color: "white"
			}
		}
	},
	TRAINING_GROUNDS: {
		name: "Training Grounds",
		standardRupeeData: {
			0: {
				name: "GTG Slopes Room",
				total: 5,
				color: "yellow"
			},
			1: {
				name: "GTG Lava Room",
				total: 5,
				max: 6,
				color: "red"
			},
			2: {
				name: "GTG Water Room",
				total: 5,
				color: "blue"
			}
		},
		mqRupeeData: {
			0: {
				name: "GTG Slopes Room",
				total: 5,
				color: "yellow"
			},
			1: {
				name: "GTG Lava Room",
				total: 6,
				color: "red"
			},
			2: {
				name: "GTG Water Room",
				total: 3,
				max: 5,
				color: "blue"
			}
		}
	}
};

/**
 * Used to group the item functions so that we don't flood the global space
 */
let ItemData = {
	/**
	 * Gets whether the player can use the given item/upgrade at the given age
	 * This includes equip swap
	 * 
	 * Accepts arrays of items, which will calulate based on the SetType (the first element of the array)
	 * - SetType.AND (or no set set type): check if ALL of the items in the set can be used
	 * - SetType.OR: checks if ANY of the items in the set can be used
	 * 
	 * If we need to improve performance in the future:
	 * - We can cache this logic and store it in each item one time per change
	 * - For instance, we'd have: Items.FIRE_ARROW.canUse[age] available
	 * @param age - The age to check
	 * @param item - The item to check
	 *  > Format: { item: item, upgrade: Number } OR just the item directly
	 *  > The upgrade is assuemd to be the lowest number required
	 */
	canUse: function(age, itemInput) {
		// Item inputs that are functions are custom item sets
		// that have their own function to run
		if (typeof itemInput === "function") {
			return itemInput(age);
		}

		// If it's an array, we must determine whether we should run it as AND or OR
		if (Array.isArray(itemInput)) {
			let firstItem = itemInput[0];
			if (firstItem === SetType.OR || firstItem === SetType.AND) {
				itemInput = itemInput.slice(1);
			}
			return firstItem === SetType.OR
				? itemInput.some(item => this.canUse(age, item))
				: itemInput.every(item => this.canUse(age, item));
		}

		if (typeof itemInput === "string") {
			return itemInput === age;
		}

		// The lowest upgrade to include (ex 2 would be silver/gold gaunts, but not goron bracelet)
		let lowestUpgrade = itemInput.upgrade;
		let item = itemInput.item || itemInput;

		// If the item has default notes, it's a song
		if (item.defaultNotes !== undefined) {
			return Data.canPlaySong(item);
		}

		// You can't use an item you don't have!
		if (!this.playerHasItem(item, lowestUpgrade)) { return false; }

		switch(item) {
			// Child Only
			case ChildTradeItems.KEATON_MASK:
			case ChildTradeItems.SPOOKY_MASK:
			case ChildTradeItems.BUNNY_HOOD:
			case ChildTradeItems.COSMETIC_MASKS:
			case Equipment.KOKIRI_SWORD:
			case Equipment.DEKU_SHIELD:
				return age === Age.CHILD;

			// Adult Only
			case Items.FAIRY_BOW:
			case Items.HOOKSHOT:
			case Equipment.MASTER_SWORD:
			case Equipment.BIGGORONS_SWORD:
			case Equipment.HYLIAN_SHIELD:
			case Equipment.MIRROR_SHIELD:
			case Equipment.IRON_BOOTS:
			case Equipment.HOVER_BOOTS:
			case Equipment.GORON_TUNIC:
			case Equipment.ZORA_TUNIC:
			case AdultTradeItems.POCKET_EGG:
			case AdultTradeItems.COJIRO:
			case AdultTradeItems.ODD_POTION:
			case AdultTradeItems.BROKEN_GORONS_SWORD:
			case AdultTradeItems.PRESCRIPTION:
			case AdultTradeItems.EYEDROPS:
			case AdultTradeItems.CLAIM_CHECK:
				return age === Age.ADULT;
			case Items.FIRE_ARROW:
			case Items.LIGHT_ARROW:
				return age === Age.ADULT && 
					Items.FAIRY_BOW.playerHas && 
					Equipment.MAGIC.playerHas;
			case Items.ICE_ARROW: // Ice arrows don't do anything special unless they act as blue fire
				return age === Age.ADULT && 
					Settings.RandomizerSettings.iceArrowsActAsBlueFire &&
					Items.FAIRY_BOW.playerHas && 
					Equipment.MAGIC.playerHas;

			// Shared items that need logic
			case Items.DINS_FIRE:
			case Items.FARORES_WIND:
			case Items.NAYRUS_LOVE:
			case Items.LENS_OF_TRUTH:
				return Equipment.MAGIC.playerHas;
			case Equipment.STRENGTH:
				return lowestUpgrade > 0 ? age === Age.ADULT : true;

			// Equip swappable
			case Items.DEKU_STICK:
				return age === Age.CHILD || 
					Tricks.forceAdultDekuStickEquip.enabled ||
					Data.canEquipSwap(age);
			case Items.FAIRY_SLINGSHOT:
				return age === Age.CHILD || 
					// Adult can shoot slingshot-type ammo with the bow, but uses arrows as ammo
					Items.FAIRY_BOW.playerHas && (
						Tricks.forceAdultSlingshotEquip.enabled ||
						Data.canEquipSwap(age)
					);
			case Items.BOOMERANG:
				return age === Age.CHILD || 
					Tricks.forceAdultBoomerangEquip.enabled ||
					Data.canEquipSwap(age);
			case Items.MAGIC_BEAN:
			case ChildTradeItems.WEIRD_EGG:
			case ChildTradeItems.ZELDAS_LETTER:
			case ChildTradeItems.SKULL_MASK:
			case ChildTradeItems.MASK_OF_TRUTH:
				// For thawing King Zora
				// TODO: maybe make a setting for force child trade item/magic bean equipped - may be overkill though
				return age === Age.CHILD || Data.canEquipSwap(age);
			case Items.MEGATON_HAMMER:
			case AdultTradeItems.ODD_MUSHROOM:
			case AdultTradeItems.POACHERS_SAW:
			case AdultTradeItems.EYEBALL_FROG:
				// The other trade items have no use as Child
				return age === Age.ADULT || Data.canEquipSwap(age);

		}

		// Shared items
		return true;
	},

	/**
	 * Checks that the player has the given item at the given upgrade
	 * @param item - The item to check
	 * @param {Number} upgrade - The upgrade string to check (pass a false value to skip this check)
	 * @param {Boolean} exactUpgrade - True if we care about the exact upgrade number
	 */
	playerHasItem: function(item, upgrade, exactUpgrade) {
		if (!item.playerHas) { return false; }
		if (upgrade !== 0 && !upgrade) { return true; }
		return exactUpgrade
			? item.currentUpgrade === upgrade
			: item.currentUpgrade >= upgrade;
	},

	/**
	 * Gets whether the age can anyone of the given items
	 * @param age - The age to check
	 * @param items - An array of items
	 */
	canUseAny(age, items) {
		return items.some(item => this.canUse(age, item));
	},

	/**
	 * Gets the key count from the current map name
	 */
	getKeyCount: function(mapName) {
		if (mapName !== "Thieves' Hideout" &&
			mapName !== "Treasure Chest Minigame" &&
			Settings.RandomizerSettings.smallKeySetting === SmallKeySettings.KEYSY) {
			return 99;
		}

		switch(mapName) {
			case "Forest Temple":
				return Keys.FOREST_TEMPLE.keyCount || 0;
			case "Fire Temple":
				return Keys.FIRE_TEMPLE.keyCount || 0;
			case "Water Temple":
				return Keys.WATER_TEMPLE.keyCount || 0;
			case "Shadow Temple":
				return Keys.SHADOW_TEMPLE.keyCount || 0;
			case "Spirit Temple":
				return Keys.SPIRIT_TEMPLE.keyCount || 0;
			case "Ganon's Castle":
				return Keys.GANONS_CASTLE.keyCount || 0;
				
			case "Bottom of the Well":
				return Keys.BOTTOM_OF_THE_WELL.keyCount || 0;
			case "Thieves' Hideout":
				return Keys.THIEVES_HIDEOUT.keyCount || 0;
			case "Training Grounds":
				return Keys.GERUDO_TRAINING_GROUNDS.keyCount || 0;

			case "Treasure Chest Minigame":
				if (Settings.RandomizerSettings.chestMinigameSmallKeySetting === SmallKeySettings.KEYSY) {
					return 99;
				}
				return Keys.TREASURE_CHEST_MINIGAME.keyCount || 0;
			
			default: return 0;
		}
	},

	/**
	 * Checks whether you have the boss key
	 */
	hasBossKey: function(mapName) {
		switch(mapName) {
			case "Forest Temple":
				return Keys.FOREST_TEMPLE.playerHas;
			case "Fire Temple":
				return Keys.FIRE_TEMPLE.playerHas;
			case "Water Temple":
				return Keys.WATER_TEMPLE.playerHas;
			case "Shadow Temple":
				return Keys.SHADOW_TEMPLE.playerHas;
			case "Spirit Temple":
				return Keys.SPIRIT_TEMPLE.playerHas;
			case "Ganon's Castle":
				return Keys.GANONS_CASTLE.playerHas;
			default: return false;
		}
	},

	/**
	 * Gets the song notes string out of the given song
	 * @param {any} song - the song
	 */
	getSongNotes: function(song) {
		let isNullOrUndefined = song.songNotes === null || song.songNotes === undefined;
		return isNullOrUndefined
			? song.defaultNotes
			: song.songNotes;
	},

	/**
	 * Checks that the given string of notes is valid
	 * @param {String} songNotes - the song notes to validate
	 * @return A boolean indicating whether the notes were valid
	 */
	validateSongNotes: function(songNotes) {
		return /^[\^u>l<rdva]*$/.test(songNotes.toLowerCase().trim());
	},

	/**
	 * Converts the song note string into an array of OcarinaButtons
	 * @param {String} songNotes - the song notes to convert
	 */
	convertSongNotesString: function(songNotes) {
		if (!this.validateSongNotes(songNotes)) { return null; }

		let convertedNotes = [];
		let error = false;
		[...songNotes.toLowerCase().trim()].forEach(character => {
			let convertedNote = this._convertSongNoteToOcarinaButton(character);
			if (!convertedNote) {
				console.log(`ERROR: Tried to convert a \"${character}\" to an OcarinaButton!`);
				error = true;
			}
			convertedNotes.push(convertedNote);
		});

		if (error) { return null; }
		return convertedNotes;
	},

	/**
	 * Converts the given song note into an OcarinaButton
	 * @param {String} songNote - The note to update - assumed to be lowercase
	 * @return The matching OcarinaButton, or null if not found
	 */
	_convertSongNoteToOcarinaButton: function(songNote) {
		switch(songNote) {
			case "^":
			case "u":
				return OcarinaButtons.C_UP_BUTTON;
			case "<":
			case "l":
				return OcarinaButtons.C_LEFT_BUTTON;
			case ">":
			case "r":
				return OcarinaButtons.C_RIGHT_BUTTON;
			case "v":
			case "d":
				return OcarinaButtons.C_DOWN_BUTTON;
			case "a":
				return OcarinaButtons.A_BUTTON;
			default:
				return null;
		}
	},

	/**
	 * Given an ocarina song, checks if the player has all the song notes to play it
	 * @param {any} song - the song to check 
	 */
	hasAllSongNotes: function(song) {
		if (!Settings.RandomizerSettings.shuffleOcarinaButtons) {
			// If the setting is off, we always have all the notes!
			return true;
		}

		let notes = this.getSongNotes(song);
		let ocarinaNotes = this.convertSongNotesString(notes);
		if (!ocarinaNotes) {
			return false; // The notes were invalid...
		}

		// Songs of length 0 are invalid, unless it's Scarecrow's Song
		if (ocarinaNotes.length === 0 && song !== Songs.SCARECROWS_SONG) {
			return false;
		}
		return ocarinaNotes.every(ocarinaNote => ocarinaNote.playerHas);
	},

	/**
	 * Get the number of ocarina buttons the player has
	 */
	getNumberOfOcarinaButtons: function() {
		var ocarinaButtons = Object.values(OcarinaButtons);
		return Settings.RandomizerSettings.shuffleOcarinaButtons
			? ocarinaButtons.filter(button => button.playerHas).length
			: ocarinaButtons.length;
	},

	/**
	 * Checks that the player has enough silver rupees of the given index
	 * @param mapName - the name of the map to check
	 * @param index - the silver rupee index
	 * @returns the appropriate ItemObtainability value
	 */
	checkSilverRupeeRequirement: function(mapName, index) {
		let rupeeObject = this._getSilverRupeeData(mapName);
		if (!rupeeObject) { return ItemObtainability.YES; }

		let currentRupeeCount = this.getSilverRupeeCount(rupeeObject, index);

		let isMasterQuest = MapLocations[mapName].IsMasterQuest;
		let rupeeData = isMasterQuest
			? rupeeObject.mqRupeeData
			: rupeeObject.standardRupeeData;
		if (!rupeeData[index]) { return ItemObtainability.NO; }

		let totalRupeesRequired = rupeeData[index].total;
		if (currentRupeeCount >= totalRupeesRequired) {
			return ItemObtainability.YES;
		}
		return ItemObtainability.NO;
	},

	/**
	 * Returns the silver rupee count at the given location and index
	 * @param rupeeObject - the SilverRupee location object
	 * @param index - the index to look at
	 * @returns The count, or 0 if not found
	 */
	getSilverRupeeCount: function(rupeeObject, index) {
		let collectedRupeeObject = rupeeObject.collectedRupees;
		if (!collectedRupeeObject) {
			return 0;
		}

		return collectedRupeeObject[index] || 0;
	},

	/**
	 * Gets the silver rupee data for the given map name
	 * @param mapName - the map name
	 * @returns The silver rupee data
	 */
	_getSilverRupeeData: function(mapName) {
		switch(mapName) {
			case "Ice Cavern":
				return SilverRupees.ICE_CAVERN;

			case "Shadow Temple":
				return SilverRupees.SHADOW_TEMPLE;
			case "Spirit Temple":
				return SilverRupees.SPIRIT_TEMPLE;
			case "Ganon's Castle":
				return SilverRupees.GANONS_CASTLE;
				
			case "Dodongo's Cavern":
				return SilverRupees.DODONGOS_CAVERN;
			case "Bottom of the Well":
				return SilverRupees.BOTTOM_OF_THE_WELL;
			case "Training Grounds":
				return SilverRupees.TRAINING_GROUNDS;
			
			default: 
				console.log(`ERROR: Attempted to get silver rupee data for ${mapName}!`);
				return null;
		}
	},

	/**
	 * Gets the number of empty bottles the player has
	 * @param {boolean} excludeLetterAndPoe - whether to exclude ruto's letter and the big poe from the counts
	 */
	getEmptyBottleCount: function(excludeLetterAndPoe) {
		let count = Items.EMPTY_BOTTLES.count;

		if (excludeLetterAndPoe) {
			if (Items.RUTOS_LETTER.playerHas) {
				count--;
			}
			if (Items.BIG_POE.playerHas) {
				count--;
			}
		}

		return Math.max(count, 0);
	},

	/**
	 * Whether the child trade item slot is filled - used for equip swap checks!
	 */
	hasChildTradeItem: function() {
		return ChildTradeItems.COSMETIC_MASKS.playerHas ||
			ChildTradeItems.WEIRD_EGG.playerHas ||
			ChildTradeItems.ZELDAS_LETTER.playerHas ||
			ChildTradeItems.KEATON_MASK.playerHas ||
			ChildTradeItems.SKULL_MASK.playerHas ||
			ChildTradeItems.SPOOKY_MASK.playerHas ||
			ChildTradeItems.BUNNY_HOOD.playerHas ||
			ChildTradeItems.MASK_OF_TRUTH.playerHas;
	},

	/**
	 * Whether you have a cutscene item in the child trade slot
	 * This is any item except for the masks
	 */
	hasChildCutsceneTradeItem: function() {
		return ChildTradeItems.WEIRD_EGG.playerHas ||
			ChildTradeItems.ZELDAS_LETTER.playerHas;
	},

	/**
	 * Whether the adult trade item slot is filled - used for equip swap checks!
	 */
	hasAdultTradeItem: function() {
		return AdultTradeItems.POCKET_EGG.playerHas ||
			AdultTradeItems.COJIRO.playerHas ||
			AdultTradeItems.ODD_MUSHROOM.playerHas ||
			AdultTradeItems.ODD_POTION.playerHas ||
			AdultTradeItems.POACHERS_SAW.playerHas ||
			AdultTradeItems.BROKEN_GORONS_SWORD.playerHas ||
			AdultTradeItems.PRESCRIPTION.playerHas ||
			AdultTradeItems.EYEBALL_FROG.playerHas ||
			AdultTradeItems.EYEDROPS.playerHas ||
			AdultTradeItems.CLAIM_CHECK.playerHas;
	}
}